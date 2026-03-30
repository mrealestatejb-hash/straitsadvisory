#!/usr/bin/env python3
"""
Migrate projects from Wix CMS CSV export to Straits Advisory site.
Downloads images & brochures, extracts tour URLs & coordinates,
generates TypeScript entries for properties.ts / property-detail-data.ts / properties-data.ts.
"""

import csv
import json
import re
import os
import sys
import urllib.request
import urllib.error
import time

sys.stdout.reconfigure(encoding='utf-8')

CSV_PATH = r"C:\Users\Dell\Downloads\Projects.csv"
PROJECT_ROOT = r"C:\Users\Dell\Desktop\Projects\Landing Pages\Straits Advisory Landing Page"
IMG_DIR = os.path.join(PROJECT_ROOT, "public", "images", "properties")
BROCHURE_DIR = os.path.join(PROJECT_ROOT, "public", "brochures")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "scripts", "migration-output")

# Slugs already fully set up in properties.ts — skip these
SKIP_SLUGS = {
    'rf-princess-cove-overview',
    'rf-princess-cove-phase-1',
    'rf-princess-cove-phase-2',
    'rf-princess-cove-phase-3',
    'rnf-princess-cove-phase-3',
    'r&f-princess-cove---phase-2',
    'ctc-skyone-bukit-chagar',
}

# Area/district mapping from slug keywords
AREA_MAP = {
    'bukit-chagar': ('Bukit Chagar', 'Johor Bahru City'),
    'bukit-senyum': ('Bukit Senyum', 'Johor Bahru City'),
    'danga-bay': ('Danga Bay', 'Johor Bahru Waterfront'),
    'taman-pelangi': ('Taman Pelangi', 'Johor Bahru City'),
    'taman-suria': ('Taman Suria', 'Johor Bahru City'),
    'taman-sentosa': ('Taman Sentosa', 'Johor Bahru City'),
    'iskandar-puteri': ('Iskandar Puteri', 'Iskandar Puteri'),
    'medini': ('Medini', 'Iskandar Puteri'),
    'puteri-harbour': ('Puteri Harbour', 'Iskandar Puteri'),
    'forest-city': ('Forest City', 'Iskandar Puteri'),
    'permas': ('Permas Jaya', 'Johor Bahru East'),
    'southkey': ('Southkey', 'Johor Bahru City'),
    'senibong': ('Senibong Cove', 'Johor Bahru East'),
    'leisure-farm': ('Leisure Farm', 'Gelang Patah'),
    'gelang-patah': ('Gelang Patah', 'Gelang Patah'),
    'eco-tropics': ('Eco Tropics', 'Pasir Gudang'),
    'nusajaya': ('Nusajaya', 'Iskandar Puteri'),
    'bayu-puteri': ('Bayu Puteri', 'Johor Bahru East'),
    'taman-daya': ('Taman Daya', 'Johor Bahru East'),
    'taman-kempas': ('Taman Kempas Indah', 'Johor Bahru North'),
    'lido': ('Lido Waterfront', 'Johor Bahru City'),
    'crest-austin': ('Austin', 'Johor Bahru North'),
    'abdul-samad': ('Jalan Abdul Samad', 'Johor Bahru City'),
    'mbw-city': ('MBW City', 'Johor Bahru City'),
    'country-garden': ('Country Garden', 'Danga Bay'),
    'yahya-awal': ('Jalan Yahya Awal', 'Johor Bahru City'),
}


def slugify(wix_path: str) -> str:
    """Convert Wix path to clean slug."""
    if not wix_path:
        return ''
    s = wix_path.strip('/').split('/')[-1]
    s = urllib.request.unquote(s)
    s = s.replace('&', 'and').replace(',', '').replace('(', '').replace(')', '')
    s = re.sub(r'[^a-z0-9-]', '-', s.lower())
    s = re.sub(r'-+', '-', s).strip('-')
    return s


def wix_image_to_url(wix_uri: str) -> str:
    if not wix_uri or not wix_uri.startswith('wix:image://'):
        return ''
    match = re.match(r'wix:image://v1/([^/]+)/.*', wix_uri)
    if match:
        return f'https://static.wixstatic.com/media/{match.group(1)}'
    return ''


def wix_doc_to_url(wix_uri: str) -> str:
    if not wix_uri or not wix_uri.startswith('wix:document://'):
        return ''
    match = re.match(r'wix:document://v1/(ugd/[^/]+\.pdf)', wix_uri)
    if match:
        return f'https://docs.wixstatic.com/{match.group(1)}'
    return ''


def extract_from_description(desc_json: str):
    """Parse Wix rich text JSON. Returns (paragraphs, highlights, coordinates, tour_url)."""
    if not desc_json:
        return [], [], None, None

    try:
        data = json.loads(desc_json)
    except json.JSONDecodeError:
        return [], [], None, None

    paragraphs = []
    highlights = []
    coords = None
    tour_url = None

    for node in data.get('nodes', []):
        ntype = node.get('type', '')

        if ntype == 'HTML':
            html = node.get('htmlData', {}).get('html', '')
            # Extract Google Maps coordinates
            m = re.search(r'!2d([\d.]+)!3d([\d.]+)', html)
            if m:
                coords = [round(float(m.group(1)), 4), round(float(m.group(2)), 4)]
            # Extract tour iframe URL
            tour_match = re.search(r'<iframe[^>]+src="([^"]+)"', html)
            if tour_match:
                url = tour_match.group(1)
                if 'google.com/maps' not in url:
                    tour_url = url

        elif ntype == 'PARAGRAPH':
            parts = []
            for c in node.get('nodes', []):
                t = c.get('textData', {}).get('text', '').strip()
                if t and t not in ('', ' ', '\u200b', '\u200b\u200b'):
                    parts.append(t)
                # Check for tour links in decorations
                for d in c.get('textData', {}).get('decorations', []):
                    if d.get('type') == 'LINK':
                        url = d.get('linkData', {}).get('link', {}).get('url', '')
                        if url and any(kw in url.lower() for kw in ['vr.', '3d66', 'tour', 'matterport', 'kuula', 'actsugi', 'goprop', '360']):
                            tour_url = url
            text = ' '.join(parts)
            if text:
                if text.startswith('\u2705'):
                    highlights.append(text.replace('\u2705 ', '').replace('\u2705', '').strip())
                elif not text.startswith('\U0001f4e5') and not text.startswith('\U0001f3e0') and len(text) > 10:
                    paragraphs.append(text)

    return paragraphs, highlights, coords, tour_url


def detect_area(slug: str, name: str) -> tuple:
    """Detect area and district from slug/name."""
    combined = f'{slug} {name}'.lower()
    for keyword, (area, district) in AREA_MAP.items():
        if keyword in combined:
            return area, district
    return 'Johor Bahru', 'Johor Bahru'


def download_file(url: str, dest: str, retries: int = 2) -> bool:
    """Download a file from URL to dest path."""
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        return True  # Already downloaded
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                with open(dest, 'wb') as f:
                    f.write(resp.read())
            if os.path.getsize(dest) > 500:
                return True
        except Exception as e:
            if attempt < retries:
                time.sleep(1)
            else:
                print(f"  WARN: Failed to download {url}: {e}")
    return False


def parse_myr_price(price_str: str) -> int:
    """Parse 'RM500K' or 'RM1mil' to integer."""
    if not price_str:
        return 0
    s = price_str.strip().upper().replace(',', '')
    m = re.search(r'RM?\s*([\d.]+)\s*(MIL|M|K)?', s, re.IGNORECASE)
    if not m:
        return 0
    num = float(m.group(1))
    suffix = (m.group(2) or '').upper()
    if suffix in ('MIL', 'M'):
        return int(num * 1_000_000)
    elif suffix == 'K':
        return int(num * 1_000)
    elif num > 10000:
        return int(num)
    return int(num * 1_000)  # Assume thousands if no suffix


def myr_to_sgd(myr: int) -> int:
    """Rough MYR to SGD conversion."""
    return int(myr / 3.35)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(BROCHURE_DIR, exist_ok=True)

    properties_entries = []
    detail_entries = []
    listings_updates = []
    stats = {'total': 0, 'skipped': 0, 'full': 0, 'stub': 0, 'images': 0, 'brochures': 0, 'tours': 0}

    with open(CSV_PATH, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Processing {len(rows)} projects from Wix CSV...\n")

    for row in rows:
        stats['total'] += 1
        name = row['Project Name'].strip()
        slug = slugify(row.get('Projects (Item)', ''))

        if not slug:
            print(f"  SKIP: {name} — no slug")
            stats['skipped'] += 1
            continue

        if slug in SKIP_SLUGS or any(skip in slug for skip in ['princess-cove', 'ctc-skyone']):
            print(f"  SKIP: {name} — already exists ({slug})")
            stats['skipped'] += 1
            continue

        tenure = row.get('Land Tenure', '').strip() or 'Freehold'
        foreign_min = row.get('Foreigner minumum purchase price', '').strip()
        completion = row.get('Completion Year', '').strip()
        short_desc = row.get('Short Project Description', '').strip()
        main_img_wix = row.get('Main Project Image', '')
        main_img_url = wix_image_to_url(main_img_wix)
        brochure_wix = row.get('E-Brochure', '')
        brochure_url = wix_doc_to_url(brochure_wix)
        long_desc_raw = row.get('Long Project Description', '')
        density = row.get('Density (unit per acre)', '').strip()
        total_units = row.get('Total Unit', '').strip()

        # Parse long description
        paragraphs, highlights, coords, tour_url = extract_from_description(long_desc_raw)

        # Gallery images
        gallery_urls = []
        gallery_raw = row.get('Gallery', '')
        if gallery_raw:
            try:
                items = json.loads(gallery_raw)
                for item in items:
                    url = wix_image_to_url(item.get('src', ''))
                    if url:
                        gallery_urls.append(url)
            except json.JSONDecodeError:
                pass

        area, district = detect_area(slug, name)
        has_full_data = bool(tenure and foreign_min and completion and long_desc_raw)

        print(f"  {'FULL' if has_full_data else 'STUB'}: {name} ({slug})")

        # ── Download hero image ──
        img_dir = os.path.join(IMG_DIR, slug)
        os.makedirs(img_dir, exist_ok=True)
        hero_path = f"/images/properties/{slug}/hero.jpg"
        hero_local = os.path.join(img_dir, "hero.jpg")

        if main_img_url:
            if download_file(main_img_url, hero_local):
                stats['images'] += 1
            else:
                hero_path = ""

        # Download gallery images
        local_gallery = [hero_path] if hero_path else []
        for gi, gurl in enumerate(gallery_urls[:5]):  # Max 5 gallery images
            gpath = os.path.join(img_dir, f"gallery-{gi+1}.jpg")
            local_gpath = f"/images/properties/{slug}/gallery-{gi+1}.jpg"
            if download_file(gurl, gpath):
                if local_gpath not in local_gallery:
                    local_gallery.append(local_gpath)

        # ── Download brochure ──
        brochure_local = ''
        if brochure_url:
            brochure_file = os.path.join(BROCHURE_DIR, f"{slug}.pdf")
            brochure_local_path = f"/brochures/{slug}.pdf"
            if download_file(brochure_url, brochure_file):
                brochure_local = brochure_local_path
                stats['brochures'] += 1

        if tour_url:
            stats['tours'] += 1

        # ── Build description ──
        description = ''
        for p in paragraphs:
            cleaned = re.sub(r'[\U0001f300-\U0001f9ff\u2705\u2764\u2b50]', '', p).strip()
            if len(cleaned) > 40:
                description = cleaned
                break
        if not description:
            description = short_desc or f"{name} is a {tenure.lower()} development in {area}, Johor Bahru."

        # ── Parse price ──
        myr_price = parse_myr_price(foreign_min)
        sgd_price = myr_to_sgd(myr_price) if myr_price else 0

        # ── Determine status ──
        if completion:
            year_match = re.search(r'20(\d{2})', completion)
            if year_match:
                year = int('20' + year_match.group(1))
                status = 'available' if year >= 2026 else 'available'
            else:
                status = 'available'
        else:
            status = 'coming-soon'

        # ── Generate property entry (full data projects) ──
        if has_full_data:
            stats['full'] += 1
            prop_entry = {
                'slug': slug,
                'name': name,
                'area': area,
                'district': district,
                'tenure': tenure,
                'completion': completion,
                'price_myr': myr_price,
                'price_sgd': sgd_price,
                'foreign_min': foreign_min,
                'description': description,
                'highlights': highlights[:6],
                'hero_path': hero_path,
                'gallery': local_gallery,
                'coords': coords or [0, 0],
                'status': status,
                'tour_url': tour_url,
                'density': density,
                'total_units': total_units,
            }
            properties_entries.append(prop_entry)

            # Detail data entry
            detail = {
                'slug': slug,
                'brochure_url': brochure_local,
                'tour_url': tour_url,
                'highlights': highlights,
            }
            detail_entries.append(detail)
        else:
            stats['stub'] += 1

        # ── Listings data update ──
        listings_updates.append({
            'slug': slug,
            'name': name,
            'area': area.lower().replace(' ', '-'),
            'tenure': tenure.lower() if tenure else 'freehold',
            'image': hero_path or f"https://static.wixstatic.com/media/{main_img_wix.split('/')[3].split('~')[0] if '/' in main_img_wix else 'placeholder'}",
            'location': area,
            'price': f"From {foreign_min}" if foreign_min else 'Enquire',
            'feature': short_desc[:40] if short_desc else name,
            'status': status,
            'completion': completion,
            'has_full_data': has_full_data,
        })

    # ── Generate TypeScript output ──
    print(f"\n{'='*60}")
    print(f"Migration Summary:")
    print(f"  Total: {stats['total']}")
    print(f"  Skipped (existing): {stats['skipped']}")
    print(f"  Full data: {stats['full']}")
    print(f"  Stub (minimal): {stats['stub']}")
    print(f"  Images downloaded: {stats['images']}")
    print(f"  Brochures downloaded: {stats['brochures']}")
    print(f"  Tour URLs found: {stats['tours']}")
    print(f"{'='*60}\n")

    # Write properties.ts entries
    with open(os.path.join(OUTPUT_DIR, 'properties-entries.ts'), 'w', encoding='utf-8') as f:
        f.write("// Auto-generated from Wix CSV migration\n")
        f.write("// Paste these entries into the properties array in lib/properties.ts\n\n")
        for p in properties_entries:
            highlights_str = ',\n      '.join(f'"{h}"' for h in p['highlights'])
            images_str = ',\n      '.join(f'"{img}"' for img in p['gallery'])
            tour_lines = ''
            if p['tour_url']:
                tour_lines = f'\n    tourUrl: "{p["tour_url"]}",\n    tourProvider: "generic" as const,'

            f.write(f"""  {{
    id: "{p['slug']}",
    slug: "{p['slug']}",
    name: "{p['name']}",
    area: "{p['area']}",
    district: "{p['district']}",
    category: "city" as const,
    price: {{ sgd: {p['price_sgd']}, myr: {p['price_myr']} }},
    priceRange: "{p['foreign_min']}+",
    specs: {{ beds: "1-3", baths: "1-2", size: "450 - 1,200" }},
    yield: 6.0,
    rtsDistance: "TBD",
    tenure: "{p['tenure']}",
    completionYear: "{p['completion']}",
    status: "{p['status']}" as const,
    description: {json.dumps(p['description'], ensure_ascii=False)},
    highlights: [
      {highlights_str}
    ],
    unitTypes: [],
    image: "{p['hero_path']}",
    images: [
      {images_str}
    ],{tour_lines}
    featured: false,
    type: ["city"],
    coordinates: [{p['coords'][0]}, {p['coords'][1]}] as [number, number],
    developer: "",
    towers: [],
    address: "{p['area']}, Johor Bahru",
  }},
""")

    # Write property-detail-data.ts entries
    with open(os.path.join(OUTPUT_DIR, 'detail-entries.ts'), 'w', encoding='utf-8') as f:
        f.write("// Auto-generated from Wix CSV migration\n")
        f.write("// Paste these entries into the detailDataMap in lib/property-detail-data.ts\n\n")
        for d in detail_entries:
            brochure_line = f"\n    brochureUrl: '{d['brochure_url']}'," if d['brochure_url'] else ''
            f.write(f"""  '{d['slug']}': {{
    whatsappNumber: '60102038001',{brochure_line}
    toSingapore: [
      {{ route: 'RTS Link to Woodlands', time: 'TBD' }},
      {{ route: 'Bus to SG (170/170X)', time: '45-60 min' }},
    ],
    withinJB: [],
  }},

""")

    # Write listings-data updates
    with open(os.path.join(OUTPUT_DIR, 'listings-updates.ts'), 'w', encoding='utf-8') as f:
        f.write("// Auto-generated from Wix CSV migration\n")
        f.write("// These are updates/new entries for properties-data.ts\n\n")
        for l in listings_updates:
            badges = []
            if l['completion']:
                try:
                    year = int(re.search(r'20(\d{2})', l['completion']).group(0))
                    badges.append('Completed' if year <= 2025 else 'New Launch' if year <= 2027 else 'Upcoming')
                except:
                    badges.append('Upcoming')
            if 'freehold' in l['tenure'].lower():
                badges.append('Freehold')
            elif 'lease' in l['tenure'].lower():
                badges.append('Leasehold')
            badges_str = ', '.join(f'"{b}"' for b in badges)

            f.write(f"""  {{
    slug: '{l['slug']}',
    name: "{l['name']}",
    city: 'johor-bahru',
    area: '{l['area']}',
    status: '{l['status']}',
    tenure: '{l['tenure']}',
    image: "{l['image']}",
    location: "{l['location']}",
    price: "{l['price']}",
    distance: "",
    feature: "{l['feature'][:50]}",
    badges: [{badges_str}],
  }},
""")

    print(f"Output files written to {OUTPUT_DIR}/")
    print("  - properties-entries.ts")
    print("  - detail-entries.ts")
    print("  - listings-updates.ts")


if __name__ == '__main__':
    main()
