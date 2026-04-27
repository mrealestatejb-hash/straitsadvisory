#!/usr/bin/env python3
"""Update existing project entries from Project Info.xlsx — does NOT create R&F entries."""

import pandas as pd
import re
import json
import urllib.request
import urllib.error
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

XLSX = r"C:\Users\Dell\Downloads\Project Info.xlsx"
PROJECT_ROOT = r"C:\Users\Dell\Desktop\Projects\Landing Pages\Straits Advisory Landing Page"

# Map XLSX project name -> existing slug. None = skip (R&F phases).
NAME_TO_SLUG = {
    "R&F Princess Cove - Seion Region (Phase 2)": None,  # Skip
    "R&F Princess Cove - New Casa Suites (Phase 3)": None,  # Skip
    "Summer Suites": "summer-suites-bukit-chagar",
    "CTC Skyone": "ctc-skyone-bukit-chagar",
    "Majestic Gensphere": "majestic-gensphere-bukit-chagar",
    "Exsim Causewayz": "exsim",
    "The Astaka": "the-astaka-one-bukit-senyum",
    "The Arden": "the-arden-one-bukit-senyum",
    "Maxim The Address": "maxim-the-address-taman-pelangi",
    "Mah Sing M Grand Minori": "m-grand-minori-taman-pelangi",
    "Skyline One Sentosa": "skyline-one-sentosa-taman-sentosa",
    "Sunway Majestic Ara SOHO": "sunway-majestic-ara-soho",  # NEW
    "Paragon Signature Suite": "paragon-signature-suites-jalan-abdul-samad",
    "Paragon Gateway": "paragon-gateway-taman-suria",
    "Nadi Residence Southkey": "nadi-residence-southkey",
    "Marina Residence": "marina-residence-bayu-puteri",
    "Skypark Kepler Lido Boulevard": "skypark-kepler-lido-waterfront-boulevard",
    "Country Garden Danga Bay": "country-garden-danga-bay",
    "MBW Bay": "mbw-bay-danga-bay",
    "Calia Residences by PGB": "paragon-calia-danga-bay",
    "Macrolink Medini": "the-m-macrolink-medini",
    "Elysia Park Medini": "elysia-park-medini",
    "Puteri Cove Residences": "puteri-cove-residences-puteri-harbour",
    "Southern Marina Puteri Harbour": "southern-marina-puteri-harbour",
    "Suria Hill Iskandar Puteri": "suria-hill",
    "Ascent Park Iskandar Puteri": "ascent-park-iskandar-puteri",
    "Bee Development Nusajaya": "bee-development-nusajaya",
    "The KEWS": "senibong-kews",
    "Bayou Residences Leisure Farm": "bayou-residences-leisure-farm",
    "Nigella Park Forest City (SFZ)": "nigella-park-forest-city-sfz",
    "Golf Villa Forest City (SFZ)": "golf-villa-forest-city-sfz",
    "Carnelian Tower Forest City (SFZ)": "carnelian-tower-forest-city-sfz",
    "Fraser Heights Gelang Patah": "fraser-heights-gelang-patah",
    "Central Park Country Garden": "central-park-country-garden",  # NEW
    "Ponderosa Regency": "ponderosa-regency",
    "Richmond Mayor Mount Austin": "richmond-mayor-mount-austin",  # NEW
    "Topaz Crest Austin": "topaz-crest-austin",
    "Daya 1 Residences Taman Daya": "daya-1-residences-taman-daya",
    "Parkland By The River": "parkland-by-the-river-permas",
    "The Straits View DUOs": "the-straits-duo-permas",
    "Senibong Cove": "isola-coast-senibong-cove",
    "Meridin East": "meridin-east",
    "Eco Tropics": "eco-tropics",  # NEW
    "D Secret Garden 2 Taman Kempas Indah": "d-secret-garden-2-taman-kempas-indah",
}


def resolve_maps_url(short_url: str) -> tuple:
    """Follow redirect of maps.app.goo.gl URL and extract coordinates."""
    try:
        req = urllib.request.Request(short_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            final_url = resp.geturl()
            html = resp.read().decode('utf-8', errors='ignore')

        # Try the URL itself first
        m = re.search(r'@(-?[\d.]+),(-?[\d.]+)', final_url)
        if m:
            return (round(float(m.group(2)), 4), round(float(m.group(1)), 4))  # [lng, lat]

        # Try !3d (lat) !4d (lng) pattern
        m = re.search(r'!3d(-?[\d.]+)!4d(-?[\d.]+)', html)
        if m:
            return (round(float(m.group(2)), 4), round(float(m.group(1)), 4))

        # Try !2d (lng) !3d (lat) pattern
        m = re.search(r'!2d(-?[\d.]+)!3d(-?[\d.]+)', html)
        if m:
            return (round(float(m.group(1)), 4), round(float(m.group(2)), 4))

        # Try meta og:image with coordinates
        m = re.search(r'\\u003d(-?[\d.]+)%2C(-?[\d.]+)', html)
        if m:
            return (round(float(m.group(2)), 4), round(float(m.group(1)), 4))

    except Exception as e:
        print(f"  ! Failed to resolve {short_url}: {e}")
    return None


def parse_price_range(price_str: str) -> tuple:
    """Parse 'RM400K to RM800K' or 'RM1mil to RM3mil' to (min_myr, max_myr, formatted)."""
    if not price_str:
        return 0, 0, 'Enquire'

    nums = re.findall(r'RM\s*([\d.]+)\s*(K|mil|MIL|M)?', price_str, re.IGNORECASE)
    parsed = []
    for num, suffix in nums:
        n = float(num)
        s = suffix.lower() if suffix else ''
        if s in ('mil', 'm'):
            parsed.append(int(n * 1_000_000))
        elif s == 'k':
            parsed.append(int(n * 1_000))
        else:
            parsed.append(int(n * 1_000))

    if len(parsed) >= 2:
        return parsed[0], parsed[1], price_str.strip()
    elif len(parsed) == 1:
        return parsed[0], parsed[0], price_str.strip()
    return 0, 0, price_str.strip()


def format_completion(val) -> str:
    """Format completion year value to string."""
    if pd.isna(val):
        return ''
    if isinstance(val, str):
        return val.strip()
    if hasattr(val, 'year'):
        return str(val.year)
    return str(val).strip()


def load_xlsx():
    df = pd.read_excel(XLSX)
    projects = []
    for _, row in df.iterrows():
        name = str(row['Project name']).strip()
        slug = NAME_TO_SLUG.get(name)
        if slug is None:
            continue

        location = str(row['Location']).strip() if pd.notna(row['Location']) else ''
        maps_url = str(row['Maps']).strip() if pd.notna(row['Maps']) else ''
        completion = format_completion(row['Completion Year'])
        tenure = str(row['Land Tenure']).strip() if pd.notna(row['Land Tenure']) else 'Freehold'
        price_range = str(row['Price Range']).strip() if pd.notna(row['Price Range']) else ''
        foreign_eligible = str(row['Foreigner eligible']).strip().upper() == 'YES'
        unit_types = str(row['Unit Types']).strip() if pd.notna(row['Unit Types']) else ''

        min_myr, max_myr, price_formatted = parse_price_range(price_range)

        projects.append({
            'name': name,
            'slug': slug,
            'location': location,
            'maps_url': maps_url,
            'completion': completion,
            'tenure': tenure,
            'price_range': price_formatted,
            'min_myr': min_myr,
            'max_myr': max_myr,
            'foreign_eligible': foreign_eligible,
            'unit_types': unit_types,
        })
    return projects


def update_properties_ts(projects):
    """Update lib/properties.ts entries that already exist."""
    path = os.path.join(PROJECT_ROOT, 'lib', 'properties.ts')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    updated = 0
    for p in projects:
        slug = p['slug']
        # Find the entry block (starts with "id: \"slug\"" or 'slug: "slug"')
        pattern = re.compile(
            rf'(\{{\s*\n\s*id:\s*"{re.escape(slug)}",[\s\S]*?\n\s*\}},)',
            re.MULTILINE
        )
        m = pattern.search(content)
        if not m:
            continue

        block = m.group(1)
        original_block = block

        # Update tenure
        block = re.sub(r'tenure:\s*"[^"]*"', f'tenure: "{p["tenure"]}"', block)
        # Update completionYear
        if p['completion']:
            block = re.sub(r'completionYear:\s*"[^"]*"', f'completionYear: "{p["completion"]}"', block)
        # Update priceRange
        if p['price_range']:
            block = re.sub(r'priceRange:\s*"[^"]*"', f'priceRange: "{p["price_range"]}"', block)
        # Update price.myr
        if p['min_myr'] > 0:
            sgd = int(p['min_myr'] / 3.35)
            block = re.sub(
                r'price:\s*\{\s*sgd:\s*\d+,\s*myr:\s*\d+\s*\}',
                f'price: {{ sgd: {sgd}, myr: {p["min_myr"]} }}',
                block
            )
        # Update coordinates
        if p.get('coords'):
            lng, lat = p['coords']
            block = re.sub(
                r'coordinates:\s*\[[^\]]+\]',
                f'coordinates: [{lng}, {lat}]',
                block
            )

        if block != original_block:
            content = content.replace(original_block, block)
            updated += 1

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  Updated {updated} entries in properties.ts")


def update_properties_data_ts(projects):
    """Update lib/properties-data.ts listing entries."""
    path = os.path.join(PROJECT_ROOT, 'lib', 'properties-data.ts')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    updated = 0
    for p in projects:
        slug = p['slug']
        # Match listing block
        pattern = re.compile(
            rf"(\{{\s*\n\s*slug:\s*'{re.escape(slug)}',[\s\S]*?\n\s*\}},)",
            re.MULTILINE
        )
        m = pattern.search(content)
        if not m:
            continue

        block = m.group(1)
        original_block = block

        # Update tenure
        tenure_lower = p['tenure'].lower()
        block = re.sub(r"tenure:\s*'[^']*'", f"tenure: '{tenure_lower}'", block)

        # Update price
        if p['price_range']:
            block = re.sub(
                r'price:\s*"[^"]*"',
                f'price: "{p["price_range"]}"',
                block
            )

        # Update location
        if p['location']:
            block = re.sub(
                r'location:\s*"[^"]*"',
                f'location: "{p["location"]}"',
                block
            )

        # Update badges - rebuild based on completion/tenure/foreign eligibility
        badges = []
        comp_year_match = re.search(r'(\d{4})', p['completion'])
        if comp_year_match:
            year = int(comp_year_match.group(1))
            if year <= 2025:
                badges.append('Completed')
            elif year <= 2027:
                badges.append('New Launch')
            else:
                badges.append('Upcoming')
        if 'freehold' in tenure_lower:
            badges.append('Freehold')
        elif 'lease' in tenure_lower:
            badges.append('Leasehold')
        if p['foreign_eligible']:
            badges.append('Foreigner Eligible')

        badges_str = ', '.join(f'"{b}"' for b in badges)
        block = re.sub(
            r'badges:\s*\[[^\]]*\]',
            f'badges: [{badges_str}]',
            block
        )

        if block != original_block:
            content = content.replace(original_block, block)
            updated += 1

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  Updated {updated} entries in properties-data.ts")


def main():
    projects = load_xlsx()
    print(f"Loaded {len(projects)} projects from XLSX (R&F phases skipped)")

    # Resolve coordinates
    print("\nResolving Google Maps URLs to coordinates...")
    for p in projects:
        if p['maps_url']:
            coords = resolve_maps_url(p['maps_url'])
            if coords:
                p['coords'] = coords
                print(f"  {p['name'][:40]:40} -> {coords}")
            else:
                print(f"  {p['name'][:40]:40} -> FAILED")

    # Save resolved data for review
    out = os.path.join(PROJECT_ROOT, 'scripts', 'xlsx-resolved.json')
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2, default=str)
    print(f"\nSaved resolved data to {out}")

    # Update files
    print("\nUpdating properties.ts...")
    update_properties_ts(projects)

    print("\nUpdating properties-data.ts...")
    update_properties_data_ts(projects)


if __name__ == '__main__':
    main()
