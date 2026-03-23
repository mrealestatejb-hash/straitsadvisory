"""
Extract all property card data from buy.html into a TypeScript data file.
Parses data attributes, card content, and image URLs from the HTML.
"""
import re
import json
import html

INPUT = 'C:/Users/Dell/Desktop/Projects/Landing Pages/Straits Advisory Landing Page/public/buy.html'
OUTPUT = 'C:/Users/Dell/Desktop/Projects/Landing Pages/Straits Advisory Landing Page/lib/properties-data.ts'

with open(INPUT, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all property cards (handles both href="properties/..." and href="#")
card_pattern = re.compile(
    r'<a\s+href="([^"]+)"\s+class="property-card"\s+'
    r'data-city="([^"]+)"\s+data-area="([^"]+)"\s+data-status="([^"]+)"\s+'
    r'data-tenure="([^"]+)"\s+data-name="([^"]+)"[^>]*>'
    r'.*?'
    r"background:url\('([^']+)'\)"
    r'.*?'
    r'<h3 class="card-title">([^<]+)</h3>'
    r'.*?'
    r'<p class="card-location">([^<]+)</p>'
    r'.*?'
    r'<p class="card-price">([^<]+)</p>'
    r'.*?'
    r'<span class="card-distance">([^<]*)</span>'
    r'.*?'
    r'<span class="card-feature">([^<]*)</span>',
    re.DOTALL
)

properties = []
for m in card_pattern.finditer(content):
    href = m.group(1)
    # Extract slug from href
    if href.startswith('properties/'):
        slug = href.replace('properties/', '').replace('.html', '')
    else:
        # KL/Penang cards use href="#" — generate slug from name
        slug = m.group(6).replace('&amp;', 'and').replace(' ', '-').lower()
    city = m.group(2)
    area = m.group(3)
    status = m.group(4)
    tenure = m.group(5)
    name_raw = m.group(6)
    image = m.group(7)
    title = html.unescape(m.group(8))
    location = m.group(9)
    price = m.group(10)
    distance_raw = m.group(11).strip()
    feature_raw = m.group(12).strip()

    # Clean up emoji prefix from distance/feature
    distance = re.sub(r'^[📍\s]+', '', distance_raw).strip()
    feature = re.sub(r'^[✦\s]+', '', feature_raw).strip()

    # Extract badges from the card
    badge_section = content[m.start():m.end()]
    badges = re.findall(r'<span class="badge[^"]*">([^<]+)</span>', badge_section)

    properties.append({
        'slug': slug,
        'city': city,
        'area': area,
        'status': status,
        'tenure': tenure,
        'name': title,
        'image': image,
        'location': location,
        'price': price,
        'distance': distance,
        'feature': feature,
        'badges': badges,
    })

print(f'Extracted {len(properties)} properties')

# Group by city
jb = [p for p in properties if p['city'] == 'johor-bahru']
kl = [p for p in properties if p['city'] == 'kuala-lumpur']
pg = [p for p in properties if p['city'] == 'penang']
print(f'  JB: {len(jb)}, KL: {len(kl)}, Penang: {len(pg)}')

# Generate TypeScript
ts_lines = []
ts_lines.append("// Auto-generated from buy.html — do not edit manually")
ts_lines.append("// Run: python scripts/extract-properties.py")
ts_lines.append("")
ts_lines.append("export interface PropertyListing {")
ts_lines.append("  slug: string")
ts_lines.append("  name: string")
ts_lines.append("  city: 'johor-bahru' | 'kuala-lumpur' | 'penang'")
ts_lines.append("  area: string")
ts_lines.append("  status: string")
ts_lines.append("  tenure: string")
ts_lines.append("  image: string")
ts_lines.append("  location: string")
ts_lines.append("  price: string")
ts_lines.append("  distance: string")
ts_lines.append("  feature: string")
ts_lines.append("  badges: string[]")
ts_lines.append("  hidden?: boolean")
ts_lines.append("}")
ts_lines.append("")
ts_lines.append("export const propertyListings: PropertyListing[] = [")

for p in properties:
    # Determine if hidden (not in whitelist)
    is_hidden = p['slug'] not in ['rf-princess-cove', 'randf-princess-cove-phase-3']

    ts_lines.append("  {")
    ts_lines.append(f"    slug: '{p['slug']}',")
    ts_lines.append(f"    name: {json.dumps(p['name'])},")
    ts_lines.append(f"    city: '{p['city']}',")
    ts_lines.append(f"    area: '{p['area']}',")
    ts_lines.append(f"    status: '{p['status']}',")
    ts_lines.append(f"    tenure: '{p['tenure']}',")
    ts_lines.append(f"    image: {json.dumps(p['image'])},")
    ts_lines.append(f"    location: {json.dumps(p['location'])},")
    ts_lines.append(f"    price: {json.dumps(p['price'])},")
    ts_lines.append(f"    distance: {json.dumps(p['distance'])},")
    ts_lines.append(f"    feature: {json.dumps(p['feature'])},")
    ts_lines.append(f"    badges: {json.dumps(p['badges'])},")
    if is_hidden:
        ts_lines.append(f"    hidden: true,")
    ts_lines.append("  },")

ts_lines.append("]")
ts_lines.append("")
ts_lines.append("// ─── Query helpers ───")
ts_lines.append("")
ts_lines.append("export function getVisibleListings() {")
ts_lines.append("  return propertyListings.filter(p => !p.hidden)")
ts_lines.append("}")
ts_lines.append("")
ts_lines.append("export function getListingsByCity(city: string) {")
ts_lines.append("  return getVisibleListings().filter(p => p.city === city)")
ts_lines.append("}")
ts_lines.append("")
ts_lines.append("export function getListingBySlug(slug: string) {")
ts_lines.append("  return propertyListings.find(p => p.slug === slug)")
ts_lines.append("}")
ts_lines.append("")
ts_lines.append("export function searchListings(query: string) {")
ts_lines.append("  const q = query.toLowerCase()")
ts_lines.append("  return getVisibleListings().filter(p => p.name.toLowerCase().includes(q))")
ts_lines.append("}")
ts_lines.append("")
ts_lines.append("export const areas: Record<string, { value: string; label: string }[]> = {")

# Extract areas by city
areas_by_city: dict[str, set[tuple[str, str]]] = {}
for p in properties:
    if p['city'] not in areas_by_city:
        areas_by_city[p['city']] = set()
    # Format area label from slug
    label = p['area'].replace('-', ' ').title()
    areas_by_city[p['city']].add((p['area'], label))

for city, areas in sorted(areas_by_city.items()):
    ts_lines.append(f"  '{city}': [")
    for value, label in sorted(areas):
        ts_lines.append(f"    {{ value: '{value}', label: '{label}' }},")
    ts_lines.append("  ],")
ts_lines.append("}")
ts_lines.append("")

output = '\n'.join(ts_lines)

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(output)

print(f'Written to {OUTPUT}')
