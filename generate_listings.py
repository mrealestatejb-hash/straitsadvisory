#!/usr/bin/env python3
"""
Generate HTML property listing pages from XLSX data using the template.
Also creates a missing data report XLSX.
"""

import pandas as pd
import numpy as np
import re
import os
import html
import math
from datetime import datetime

# Paths
XLSX_PATH = r"C:\Users\Dell\Downloads\Straits Listings.xlsx"
TEMPLATE_PATH = r"C:\Users\Dell\Desktop\Projects\Landing Pages\Straits Advisory Landing Page\public\properties\rf-princess-cove-ph2-bukit-chagar.html"
OUTPUT_DIR = r"C:\Users\Dell\Desktop\Projects\Landing Pages\Straits Advisory Landing Page\public\properties"
MISSING_DATA_PATH = r"C:\Users\Dell\Downloads\Straits_Listings_Missing_Data.xlsx"

# Read data
df = pd.read_excel(XLSX_PATH)
with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    TEMPLATE = f.read()

def slugify(name):
    """Convert project name to URL-friendly slug."""
    s = name.lower().strip()
    s = s.replace("&", "and")
    s = s.replace("'", "")
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s]+', '-', s)
    s = re.sub(r'-+', '-', s)
    s = s.strip('-')
    return s

def is_nan(val):
    """Check if value is NaN/None/empty."""
    if val is None:
        return True
    if isinstance(val, float) and math.isnan(val):
        return True
    if isinstance(val, str) and val.strip() == "":
        return True
    return False

def safe_str(val, default=""):
    """Convert value to string, returning default for NaN."""
    if is_nan(val):
        return default
    return str(val).strip()

def html_escape(text):
    """HTML-escape text."""
    return html.escape(str(text))

def parse_price_range(price_range_str):
    """Parse price range string to get min and max RM values.
    Examples:
        'RM580,000 - RM2.5mil' -> (580000, 2500000)
        'RM530,000 - RM960,000' -> (530000, 960000)
        'RM650k - RM3mil' -> (650000, 3000000)
    """
    if is_nan(price_range_str):
        return (0, 0)

    s = str(price_range_str).strip()

    # Find all RM values
    # Match patterns like RM580,000 or RM2.5mil or RM650k or RM500k
    parts = re.split(r'\s*[-–—]\s*', s)

    values = []
    for part in parts:
        part = part.strip()
        # Remove RM prefix
        part = re.sub(r'^RM\s*', '', part, flags=re.IGNORECASE)
        # Remove commas
        part = part.replace(',', '')

        if 'mil' in part.lower():
            num = float(re.sub(r'[^0-9.]', '', part))
            values.append(int(num * 1000000))
        elif 'k' in part.lower():
            num = float(re.sub(r'[^0-9.]', '', part))
            values.append(int(num * 1000))
        else:
            try:
                values.append(int(float(re.sub(r'[^0-9.]', '', part))))
            except (ValueError, TypeError):
                pass

    if len(values) >= 2:
        return (min(values), max(values))
    elif len(values) == 1:
        return (values[0], values[0])
    return (0, 0)

def format_rm(value):
    """Format a number as RM currency string."""
    if value >= 1000000:
        if value % 1000000 == 0:
            return f"RM{value // 1000000}mil"
        return f"RM{value / 1000000:.1f}mil"
    return f"RM{value:,.0f}"

def get_completion_status(completion_year):
    """Determine completion status from Completion Year column."""
    if is_nan(completion_year):
        return "TBC"

    val = completion_year

    # Handle datetime objects
    if isinstance(val, datetime):
        if val.year <= 2025:
            return "Completed"
        return str(val.year)

    s = str(val).strip().lower()

    if 'completed' in s or 'complete' in s:
        return "Completed"

    # Extract year
    year_match = re.search(r'(20\d{2})', s)
    if year_match:
        year = int(year_match.group(1))
        if year <= 2025:
            return "Completed"
        # Keep full string like "2030 Q2"
        return str(val).strip()

    return str(val).strip()

def get_developer_name(project_name):
    """Extract likely developer abbreviation from project name."""
    # Take first word or first 2-3 chars as developer logo text
    words = project_name.split()
    if len(words[0]) <= 4:
        return words[0]
    return words[0][:3].upper()

def get_developer_full(project_name):
    """Get developer full name - just use first word(s) as developer."""
    words = project_name.split()
    # Common developer names
    dev_map = {
        'CTC': 'CTC Development',
        'Exsim': 'Exsim Group',
        'R&F': 'R&F Properties',
        'Paragon': 'Paragon Globe',
        'Skypark': 'Skypark Development',
        'Sunway': 'Sunway Property',
        'Country': 'Country Garden',
        'MBW': 'MBW Development',
        'Elysia': 'Elysia Development',
        'Puteri': 'UEM Sunrise',
        'Nadi': 'Nadi Development',
        'Suria': 'Suria Development',
        'Nigella': 'Country Garden',
        'Golf': 'Country Garden',
        'Avenue': 'MBW Development',
        'Veranda': 'MBW Development',
        'Trellis': 'MBW Development',
        'Marina': 'Marina Development',
        'Central': 'Country Garden',
        'Ascent': 'Ascent Development',
        'Carnelian': 'Country Garden',
        'Meridin': 'Mah Sing Group',
        'Senibong': 'Senibong Development',
        'Topaz': 'Topaz Development',
        'Bayou': 'Bayou Development',
        'Daya': 'Daya Development',
        'Lanna': 'Lanna Development',
        'Bee': 'Bee Development',
        'Fraser': 'Fraser Development',
        'Isola': 'Isola Development',
        'Majestic': 'Majestic Development',
        'Summer': 'Summer Development',
        'The': project_name.split()[1] if len(project_name.split()) > 1 else 'Developer',
        'Skyline': 'Skyline Development',
        'Maxim': 'Maxim Development',
        'Parkland': 'Parkland Development',
        'Ponderosa': 'AGB Group',
        'Southern': 'Southern Development',
        'D': 'D Development',
        'M': 'Macrolink Group',
    }
    first_word = words[0]
    return dev_map.get(first_word, first_word + ' Development')

def build_highlights_html(highlights_str):
    """Build checklist HTML from semicolon-separated highlights."""
    if is_nan(highlights_str):
        return ""

    items = [h.strip() for h in str(highlights_str).split(';') if h.strip()]
    check_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>'

    html_items = []
    for item in items:
        html_items.append(f'        <li>\n          {check_svg}\n          {html_escape(item)}\n        </li>')

    return '\n'.join(html_items)

def build_discounts_html(row):
    """Build discount list HTML from Discount 1-8 columns."""
    discounts = []
    for i in range(1, 9):
        col = f'Discount {i}'
        val = row.get(col)
        if not is_nan(val):
            discounts.append(safe_str(val))

    if not discounts:
        return ""

    items = '\n'.join([f'        <li>\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>\n          {html_escape(d)}\n        </li>' for d in discounts])

    return f"""
    <!-- Discounts & Rebates -->
    <div class="section">
      <h2 class="section-title">Discounts &amp; Rebates</h2>
      <ul class="check-list">
{items}
      </ul>
    </div>"""

def build_fees_html(row):
    """Build fees section HTML."""
    fee_fields = [
        ('SPA Legal Fee', 'SPA Legal Fee'),
        ('Loan Legal Fee', 'Loan Legal Fee'),
        ('SPA Stamp Duty (MOT)', 'SPA Stamp Duty (MOT)'),
        ('Loan Stamp Duty', 'Loan Stamp Duty'),
        ('Foreigner State Consent Fee', 'Foreigner State Consent Fee'),
    ]

    fees = []
    for col, label in fee_fields:
        val = row.get(col)
        if not is_nan(val):
            fees.append((label, safe_str(val)))

    if not fees:
        return ""

    rows_html = '\n'.join([f'        <tr><td>{html_escape(label)}</td><td>{html_escape(val)}</td></tr>' for label, val in fees])

    return f"""
    <!-- Fees & Charges -->
    <div class="section">
      <h2 class="section-title">Fees &amp; Charges</h2>
      <table class="details-table">
{rows_html}
      </table>
    </div>"""

def get_similar_properties(current_idx, current_location, all_properties):
    """Get 4 similar properties (same location first, then others)."""
    similar = []

    # First: same location
    for i, row in all_properties.iterrows():
        if i == current_idx:
            continue
        if safe_str(row['Location']) == current_location and len(similar) < 4:
            similar.append(row)

    # Fill remaining with other properties
    if len(similar) < 4:
        for i, row in all_properties.iterrows():
            if i == current_idx:
                continue
            if row['Project Name'] not in [s['Project Name'] for s in similar]:
                similar.append(row)
                if len(similar) >= 4:
                    break

    return similar[:4]

def build_similar_html(similar_properties):
    """Build similar properties grid HTML."""
    gradients = [
        'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
        'linear-gradient(135deg,#1a1a2e 0%,#2b2d42 50%,#4a4e69 100%)',
        'linear-gradient(135deg,#0f3460 0%,#16213e 50%,#1a1a2e 100%)',
        'linear-gradient(135deg,#1a1a2e 0%,#1d3557 50%,#457b9d 100%)',
    ]

    cards = []
    for idx, prop in enumerate(similar_properties):
        name = safe_str(prop['Project Name'])
        location = safe_str(prop['Location'], 'Johor')
        slug = slugify(name)
        price_range = safe_str(prop.get('Price Range'), '')

        if price_range:
            price_min, _ = parse_price_range(price_range)
            if price_min > 0:
                price_display = f"From {format_rm(price_min)}"
            else:
                price_display = "Price on Request"
        else:
            price_display = "Price on Request"

        # Short display name (remove location suffix for card)
        short_name = name
        if location and name.endswith(location):
            short_name = name[:-len(location)].strip()
        if not short_name:
            short_name = name

        grad = gradients[idx % len(gradients)]

        cards.append(f'''    <a href="{slug}.html" class="rel-card">
      <div class="rel-img" style="background:{grad}">\U0001f3e2</div>
      <div class="rel-body"><h4>{html_escape(short_name)}</h4><p class="rel-loc">{html_escape(location)}</p><p class="rel-price">{html_escape(price_display)}</p></div>
    </a>''')

    return '\n'.join(cards)

def generate_property_page(row, idx, df):
    """Generate a complete HTML page for a property."""
    name = safe_str(row['Project Name'])
    name_escaped = html_escape(name)
    location = safe_str(row['Location'], 'Johor')
    location_escaped = html_escape(location)
    title_tenure = safe_str(row['Title'], 'TBC')
    completion = get_completion_status(row.get('Completion Year'))
    foreigner_min = safe_str(row['Foreigner minimum purchase price'], '')
    description = safe_str(row['Description'], '')
    highlights = safe_str(row['Highlights'], '')
    price_range = safe_str(row['Price Range'], '')
    size_range = safe_str(row['Size Range (sqft)'], 'TBC')
    total_units = row.get('Total Units')
    land_area = row.get('Land Area (Acre)')
    living_density = row.get('Living Density\n(unit per acre)')

    # Parse prices
    price_min, price_max = parse_price_range(price_range)
    has_price = price_min > 0

    # Format hero price display
    if has_price:
        if price_min == price_max:
            hero_price_display = format_rm(price_min)
        else:
            hero_price_display = f"{format_rm(price_min)} &mdash; {format_rm(price_max)}"
    else:
        hero_price_display = "Price on Request"

    # Min entry display
    if foreigner_min:
        min_entry = foreigner_min
        foreigner_status = f"Min {foreigner_min}"
    elif has_price:
        min_entry = format_rm(price_min)
        foreigner_status = "Eligible"
    else:
        min_entry = "TBC"
        foreigner_status = "TBC"

    # Developer info
    dev_abbr = get_developer_name(name)
    dev_full = get_developer_full(name)
    dev_abbr_escaped = html_escape(dev_abbr)
    dev_full_escaped = html_escape(dev_full)

    # Slug for filename
    slug = slugify(name)

    # Build WhatsApp URL
    wa_text = f"Hi, I'm interested in {name} at {location}. Could you share more details?"
    wa_encoded = wa_text.replace(' ', '%20').replace("'", '%27').replace('&', '%26').replace(',', '%2C')
    wa_url = f"https://wa.me/60197058001?text={wa_encoded}"

    # Mortgage default price
    if has_price:
        mort_default = f"{price_min:,.0f}"
    else:
        mort_default = "500,000"

    mort_default_num = price_min if has_price else 500000

    # Build highlights
    if highlights:
        highlights_html = build_highlights_html(highlights)
        recommend_section = f"""    <!-- 2. Why We Recommend -->
    <div class="section">
      <h2 class="section-title">Why we recommend {name_escaped}</h2>
      <ul class="check-list">
{highlights_html}
      </ul>
    </div>"""
    else:
        recommend_section = ""

    # Build about section
    if description:
        about_section = f"""    <!-- 3. About This Property -->
    <div class="section">
      <h2 class="section-title">About this property</h2>
      <div class="about-text" id="aboutText">
        <p>{html_escape(description)}</p>
      </div>
      <button class="see-more-btn" id="seeMoreBtn" onclick="toggleAbout()">See more &darr;</button>
    </div>"""
    else:
        about_section = """    <!-- 3. About This Property -->
    <div class="section">
      <h2 class="section-title">About this property</h2>
      <div class="about-text" id="aboutText">
        <p style="color:#9ca3af;font-style:italic">Property description coming soon. Contact us for more details.</p>
      </div>
    </div>"""

    # Build details table
    total_units_str = f"{int(total_units):,}" if not is_nan(total_units) else "TBC"
    land_area_str = f"{land_area:.2f} acres" if not is_nan(land_area) else "TBC"
    density_str = f"{int(living_density)} units/acre" if not is_nan(living_density) else "TBC"
    completion_display = completion

    details_rows = f"""        <tr><td>Property Type</td><td>Condominium for Sale</td></tr>
        <tr><td>Tenure</td><td>{html_escape(title_tenure)}</td></tr>
        <tr><td>Completion</td><td>{html_escape(completion_display)}</td></tr>
        <tr><td>Size Range</td><td>{html_escape(size_range)}</td></tr>
        <tr><td>Total Units</td><td>{html_escape(total_units_str)}</td></tr>
        <tr class="detail-extra" style="display:none"><td>Land Area</td><td>{html_escape(land_area_str)}</td></tr>
        <tr class="detail-extra" style="display:none"><td>Living Density</td><td>{html_escape(density_str)}</td></tr>
        <tr class="detail-extra" style="display:none"><td>District</td><td>{location_escaped}</td></tr>"""

    # Build discounts section
    discounts_html = build_discounts_html(row)

    # Build fees section
    fees_html = build_fees_html(row)

    # Similar properties
    similar = get_similar_properties(idx, location, df)
    similar_html = build_similar_html(similar)

    # Virtual tour section - hide for all generated pages (no tour URLs in data)
    vt_section = ""

    # Currency conversion JS - only if we have price data
    if has_price:
        currency_js = f"""var PROPERTY_PRICE_MIN = {price_min}; // RM
var PROPERTY_PRICE_MAX = {price_max}; // RM"""
        currency_convert = """
// Fetch live rates then detect country
fetch('https://api.exchangerate-api.com/v4/latest/MYR').then(function(r){return r.json()}).then(function(d){
  if(d && d.rates){
    Object.keys(rates).forEach(function(k){ if(d.rates[k]) rates[k] = d.rates[k]; });
  }
}).catch(function(){}).finally(function(){
  fetch('https://ipapi.co/json/').then(function(r){return r.json()}).then(function(d){
    var cc = d.country_code || 'MY';
    var cur = countryToCurrency[cc] || 'MYR';
    convertAndDisplay(cur);
  }).catch(function(){ convertAndDisplay('MYR'); });
});"""
    else:
        currency_js = """var PROPERTY_PRICE_MIN = 0;
var PROPERTY_PRICE_MAX = 0;"""
        currency_convert = "// No price data available - skip currency conversion"

    # Meta description
    if has_price:
        price_desc = format_rm(price_min)
    else:
        price_desc = "Price on Request"
    meta_desc = f"{name} - {price_desc} {title_tenure} in {location}. {completion}. Straits Advisory."

    # Schema.org price
    schema_price = str(price_min) if has_price else "0"

    # Build the full HTML
    page_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name_escaped} | Johor Bahru Property | Straits Advisory</title>
<meta name="description" content="{html_escape(meta_desc)}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'><rect width='28' height='28' rx='6' fill='%23c9a962'/><path d='M7 14h14M14 7v14' stroke='white' stroke-width='2.5' stroke-linecap='round'/></svg>">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
:root{{--navy:#1a1a2e;--gold:#c9a962;--radius:12px;--transition:0.25s cubic-bezier(.4,0,.2,1);--green:#25d366;--sidebar-w:380px;--max-w:1200px}}
html{{scroll-behavior:smooth}}
body{{font-family:Inter,system-ui,-apple-system,sans-serif;color:#1a1a2e;background:#fff;-webkit-font-smoothing:antialiased}}
a{{text-decoration:none;color:inherit}}
img{{display:block;max-width:100%}}

/* NAV */
.nav{{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,5vw,60px);height:64px;background:rgba(255,255,255,0.97);backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,0.06)}}
.nav-logo{{display:flex;align-items:center;gap:10px;font-weight:700;font-size:16px;color:var(--navy)}}.nav-logo svg{{width:28px;height:28px}}
.nav-links{{display:flex;align-items:center;gap:28px;font-size:14px;font-weight:500}}.nav-links a{{color:#555;transition:color var(--transition)}}.nav-links a:hover{{color:var(--navy)}}
.nav-cta{{background:var(--navy);color:#fff!important;padding:8px 20px;border-radius:50px;font-size:13px;transition:all var(--transition)}}.nav-cta:hover{{background:var(--gold)}}

/* GALLERY */
.gallery{{margin-top:64px;display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:220px 220px;gap:4px;position:relative;overflow:hidden;cursor:pointer}}
.gallery .gi{{display:flex;align-items:center;justify-content:center;font-size:56px;position:relative;overflow:hidden;transition:opacity var(--transition)}}
.gallery .gi:hover{{opacity:0.9}}
.gi:first-child{{grid-row:1/3;font-size:72px}}
.gallery .gi-overlay{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:inherit}}
.photo-count{{position:absolute;bottom:16px;right:16px;z-index:5;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);color:#fff;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;border:none;transition:background var(--transition)}}
.photo-count:hover{{background:rgba(0,0,0,0.85)}}
.photo-count svg{{width:16px;height:16px}}

/* BREADCRUMB */
.breadcrumb{{padding:16px clamp(20px,5vw,60px);font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6}}
.breadcrumb a{{color:#6b7280;transition:color var(--transition)}}.breadcrumb a:hover{{color:var(--navy)}}
.breadcrumb span{{margin:0 6px;color:#d1d5db}}

/* HERO SECTION */
.hero{{padding:28px clamp(20px,5vw,60px) 0;max-width:var(--max-w);margin:0 auto}}
.hero h1{{font-size:clamp(26px,4vw,34px);font-weight:800;color:var(--navy);line-height:1.15;margin-bottom:4px}}
.hero .subtitle{{font-size:15px;color:var(--gold);font-weight:500;margin-bottom:10px;font-style:italic}}
.hero .location{{font-size:14px;color:#6b7280;display:flex;align-items:center;gap:6px;margin-bottom:14px}}
.hero .location svg{{width:16px;height:16px;color:#9ca3af}}
.hero-badges{{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}}
.badge{{padding:5px 14px;border-radius:50px;font-size:12px;font-weight:600;letter-spacing:0.3px}}
.badge-green{{background:#ecfdf5;color:#059669;border:1px solid #a7f3d0}}
.badge-outline{{background:#f9fafb;color:#6b7280;border:1px solid #e5e7eb}}
.badge-gold{{background:#fef9ee;color:#92702a;border:1px solid #f5dfa3}}
.hero-price{{margin-bottom:8px}}
.hero-price .price-main{{font-size:30px;font-weight:800;color:var(--navy)}}
.hero-price .price-alt{{font-size:15px;color:#6b7280;margin-left:10px;font-weight:500}}

/* TWO COLUMN LAYOUT */
.two-col{{max-width:var(--max-w);margin:0 auto;padding:0 clamp(20px,5vw,60px);display:grid;grid-template-columns:1fr var(--sidebar-w);gap:40px;align-items:start;padding-top:32px;padding-bottom:60px}}
.main-col{{min-width:0}}

/* SIDEBAR */
.sidebar{{position:sticky;top:80px}}
.sidebar-card{{border:1px solid #e5e7eb;border-radius:var(--radius);padding:24px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.04)}}
.sidebar-dev{{display:flex;align-items:center;gap:14px;margin-bottom:20px}}
.sidebar-dev-logo{{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--navy),#2d2d5e);display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff;font-weight:800;flex-shrink:0}}
.sidebar-dev-info h3{{font-size:16px;font-weight:700;color:var(--navy)}}
.sidebar-dev-info p{{font-size:12px;color:#6b7280;margin-top:2px}}
.sidebar-wa{{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 20px;border-radius:10px;background:var(--green);color:#fff;font-size:15px;font-weight:700;border:none;cursor:pointer;transition:all var(--transition);margin-bottom:10px}}
.sidebar-wa:hover{{background:#1ebe5d;transform:translateY(-1px);box-shadow:0 4px 12px rgba(37,211,102,0.3)}}
.sidebar-wa svg{{width:20px;height:20px;flex-shrink:0}}
.sidebar-register{{display:flex;align-items:center;justify-content:center;width:100%;padding:12px 20px;border-radius:10px;background:#fff;color:var(--navy);font-size:14px;font-weight:600;border:2px solid var(--navy);cursor:pointer;transition:all var(--transition);margin-bottom:16px}}
.sidebar-register:hover{{background:var(--navy);color:#fff}}
.sidebar-contact{{font-size:12px;color:#9ca3af;text-align:center;line-height:1.5}}
.sidebar-contact a{{color:var(--navy);font-weight:600}}

/* SECTION STYLES */
.section{{padding:32px 0;border-bottom:1px solid #f3f4f6}}
.section:last-child{{border:none}}
.section-title{{font-size:20px;font-weight:800;color:var(--navy);margin-bottom:18px}}
.section p{{font-size:15px;color:#374151;line-height:1.7}}

/* KEY INFO ROW */
.key-info{{display:flex;flex-wrap:wrap;gap:0;border:1px solid #e5e7eb;border-radius:var(--radius);overflow:hidden;margin-bottom:8px}}
.key-info-item{{flex:1;min-width:100px;padding:16px 12px;text-align:center;border-right:1px solid #e5e7eb;display:flex;flex-direction:column;align-items:center;gap:4px}}
.key-info-item:last-child{{border-right:none}}
.key-info-item svg{{width:22px;height:22px;color:#6b7280;margin-bottom:2px}}
.key-info-val{{font-size:16px;font-weight:700;color:var(--navy)}}
.key-info-label{{font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.4px}}

/* WHY RECOMMEND */
.recommend-intro{{font-size:15px;color:#374151;line-height:1.6;margin-bottom:16px}}
.check-list{{list-style:none;padding:0;margin:0}}
.check-list li{{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#374151;padding:8px 0;line-height:1.5}}
.check-list li svg{{width:20px;height:20px;flex-shrink:0;color:#059669;margin-top:1px}}

/* ABOUT EXPANDABLE */
.about-text{{max-height:120px;overflow:hidden;transition:max-height 0.4s ease;position:relative}}
.about-text.expanded{{max-height:1000px}}
.about-text::after{{content:'';position:absolute;bottom:0;left:0;right:0;height:60px;background:linear-gradient(transparent,#fff);pointer-events:none;transition:opacity 0.3s}}
.about-text.expanded::after{{opacity:0}}
.see-more-btn{{background:none;border:none;color:var(--gold);font-weight:600;font-size:14px;cursor:pointer;padding:8px 0;font-family:inherit;transition:color var(--transition)}}
.see-more-btn:hover{{color:var(--navy)}}

/* DETAILS TABLE */
.details-table{{width:100%}}
.details-table tr{{border-bottom:1px solid #f3f4f6}}
.details-table td{{padding:12px 0;font-size:14px;vertical-align:top}}
.details-table td:first-child{{color:#6b7280;width:45%;font-weight:500}}
.details-table td:last-child{{color:var(--navy);font-weight:600}}

/* UNIT TABS */
.fac-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}}
.fac-item{{display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 8px;border-radius:10px;background:#f9fafb;border:1px solid #f3f4f6;text-align:center;transition:all var(--transition)}}
.fac-item:hover{{border-color:#e5e7eb;box-shadow:0 2px 8px rgba(0,0,0,0.04)}}
.fac-icon{{font-size:24px}}
.fac-label{{font-size:12px;color:#374151;font-weight:500;line-height:1.3}}

/* NEARBY TABS */
.nearby-tabs{{display:flex;gap:0;overflow-x:auto;margin-bottom:16px;border-bottom:2px solid #e5e7eb;-webkit-overflow-scrolling:touch}}
.nearby-tab{{padding:10px 16px;font-size:13px;font-weight:600;color:#6b7280;cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;margin-bottom:-2px;white-space:nowrap;font-family:inherit;transition:all var(--transition)}}
.nearby-tab:hover{{color:var(--navy)}}
.nearby-tab.active{{color:var(--navy);border-bottom-color:var(--gold)}}
.nearby-panel{{display:none}}
.nearby-panel.active{{display:block}}
.nearby-list{{list-style:none;padding:0}}
.nearby-item{{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f3f4f6}}
.nearby-item:last-child{{border-bottom:none}}
.nearby-item-left{{display:flex;align-items:center;gap:10px}}
.nearby-item-left .ni-icon{{width:36px;height:36px;border-radius:8px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}}
.nearby-item-left .ni-name{{font-size:14px;font-weight:500;color:var(--navy)}}
.nearby-item-left .ni-type{{font-size:12px;color:#9ca3af}}
.nearby-dist{{font-size:13px;font-weight:600;color:#6b7280;white-space:nowrap}}

/* MAP */
.map-container{{width:100%;height:280px;border-radius:var(--radius);overflow:hidden;margin-bottom:16px;border:1px solid #e5e7eb}}

/* MORTGAGE CALCULATOR */
.mortgage-grid{{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}}
.mortgage-field label{{display:block;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:6px}}
.mortgage-field input,.mortgage-field select{{width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-family:inherit;font-size:14px;color:var(--navy);font-weight:500;transition:border-color var(--transition)}}
.mortgage-field input:focus,.mortgage-field select:focus{{outline:none;border-color:var(--gold)}}
.mortgage-result{{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius);padding:20px;text-align:center}}
.mortgage-result .mr-label{{font-size:13px;color:#6b7280;margin-bottom:4px}}
.mortgage-result .mr-amount{{font-size:32px;font-weight:800;color:#059669}}
.mortgage-result .mr-sub{{font-size:12px;color:#9ca3af;margin-top:4px}}
.upfront-costs{{margin-top:16px}}
.upfront-costs h4{{font-size:14px;font-weight:700;color:var(--navy);margin-bottom:10px}}
.upfront-row{{display:flex;justify-content:space-between;padding:8px 0;font-size:13px;border-bottom:1px solid #f3f4f6}}
.upfront-row:last-child{{border-bottom:none;font-weight:700;color:var(--navy);padding-top:12px;border-top:2px solid #e5e7eb}}
.upfront-row .ur-label{{color:#6b7280}}

/* FULL WIDTH SECTIONS */
.full-width-section{{max-width:var(--max-w);margin:0 auto;padding:48px clamp(20px,5vw,60px)}}

/* RELATED */
.related-section{{background:#f9fafb;border-top:1px solid #e5e7eb;padding:48px clamp(20px,5vw,60px)}}
.related-section h2{{font-size:22px;font-weight:800;color:var(--navy);margin-bottom:20px;max-width:var(--max-w);margin-left:auto;margin-right:auto}}
.related-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:var(--max-w);margin:0 auto}}
.rel-card{{border:1px solid #e5e7eb;border-radius:var(--radius);overflow:hidden;transition:all var(--transition);background:#fff}}
.rel-card:hover{{transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,0,0,0.08)}}
.rel-img{{height:140px;display:flex;align-items:center;justify-content:center;font-size:36px;opacity:0.3}}
.rel-body{{padding:14px}}
.rel-body h4{{font-size:14px;font-weight:700;color:var(--navy);margin-bottom:2px}}
.rel-body .rel-loc{{font-size:12px;color:#6b7280;margin-bottom:6px}}
.rel-body .rel-price{{font-size:16px;font-weight:800;color:var(--navy)}}

/* ENQUIRY */
.enquiry{{background:#fff;padding:48px clamp(20px,5vw,60px);text-align:center;border-top:1px solid #e5e7eb}}
.enquiry h2{{font-size:22px;font-weight:800;color:var(--navy);margin-bottom:8px}}
.enquiry>p{{font-size:14px;color:#6b7280;margin-bottom:24px}}

/* FOOTER */
.site-footer{{background:var(--navy);color:rgba(255,255,255,0.5);padding:24px clamp(20px,5vw,60px);text-align:center;font-size:12px}}

/* RESPONSIVE */
@media(max-width:1024px){{
  .two-col{{grid-template-columns:1fr;--sidebar-w:100%}}
  .sidebar{{position:relative;top:0;order:-1}}
  .sidebar-card{{display:flex;flex-wrap:wrap;gap:10px;align-items:center}}
  .sidebar-dev{{flex:1;min-width:200px;margin-bottom:0}}
  .sidebar-wa{{flex:1;min-width:160px;margin-bottom:0}}
  .sidebar-register{{flex:1;min-width:160px;margin-bottom:0}}
  .sidebar-contact{{flex-basis:100%;margin-top:4px}}
}}
@media(max-width:768px){{
  .gallery{{grid-template-columns:1fr;grid-template-rows:280px}}
  .gallery .gi:not(:first-child){{display:none}}
  .nav-links a:not(.nav-cta){{display:none}}
  .hero h1{{font-size:24px}}
  .key-info{{grid-template-columns:repeat(2,1fr)}}
  .key-info-item{{border-bottom:1px solid #e5e7eb}}
  .fac-grid{{grid-template-columns:repeat(3,1fr)}}
  .mortgage-grid{{grid-template-columns:1fr}}
  .related-grid{{grid-template-columns:repeat(2,1fr)}}
  .nearby-tabs{{gap:0}}
  .sidebar-card{{flex-direction:column}}
  .sidebar-dev{{min-width:100%}}
  .sidebar-wa,.sidebar-register{{min-width:100%}}
}}
@media(max-width:480px){{
  .fac-grid{{grid-template-columns:repeat(2,1fr)}}
  .related-grid{{grid-template-columns:1fr}}
  .key-info{{flex-direction:column}}
  .key-info-item{{border-right:none}}
}}
</style>
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"RealEstateListing","name":"{name_escaped}","description":"{html_escape(description[:200] if description else f'Property in {location}, Johor')}","url":"https://straitsadvisory.group/properties/{slug}.html","address":{{"@type":"PostalAddress","addressLocality":"{location_escaped}","addressRegion":"Johor","addressCountry":"MY"}},"offers":{{"@type":"Offer","price":"{schema_price}","priceCurrency":"MYR"}}}}</script>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <a href="../index.html" class="nav-logo"><svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#c9a962"/><path d="M7 14h14M14 7v14" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg> Straits Advisory</a>
  <div class="nav-links">
    <a href="../buy.html">Buy</a><a href="../sell.html">Sell</a><a href="../rent.html">Rent</a><a href="../services.html">Services</a><a href="../why-work-with-us.html">About</a>
    <a href="https://wa.me/60197058001" class="nav-cta" target="_blank">WhatsApp Us</a>
  </div>
</nav>

<!-- IMAGE GALLERY -->
<div class="gallery">
  <div class="gi" style="background:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop') center/cover"></div>
  <div class="gi" style="background:url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop') center/cover"></div>
  <div class="gi" style="background:url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop') center/cover"></div>
  <div class="gi" style="background:url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop') center/cover"></div>
  <div class="gi" style="background:url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop') center/cover"></div>
  <button class="photo-count">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
    5 Photos
  </button>
</div>

<!-- BREADCRUMB -->
<div class="breadcrumb">
  <a href="../index.html">Straits Advisory</a>
  <span>&rsaquo;</span>
  <a href="../buy.html">Buy</a>
  <span>&rsaquo;</span>
  <a href="../buy.html">{location_escaped}</a>
  <span>&rsaquo;</span>
  {name_escaped}
</div>

<!-- HERO SECTION -->
<div class="hero">
  <h1>{name_escaped}</h1>
  <p class="location">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    {location_escaped}, Johor
  </p>
  <div class="hero-price">
    <span class="price-main" id="heroPrice">{hero_price_display}</span>
  </div>
</div>

<!-- TWO COLUMN LAYOUT -->
<div class="two-col">

  <!-- LEFT COLUMN (Main Content) -->
  <div class="main-col">

    <!-- 1. Key Info Icons Row -->
    <div class="section" style="padding-top:0">
      <div class="key-info">
        <div class="key-info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          <span class="key-info-val">{html_escape(title_tenure)}</span>
          <span class="key-info-label">Lease Title</span>
        </div>
        <div class="key-info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="key-info-val">{html_escape(completion)}</span>
          <span class="key-info-label">Status</span>
        </div>
        <div class="key-info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.777.514-3.431 1.4-4.825"/></svg>
          <span class="key-info-val">{html_escape(foreigner_status)}</span>
          <span class="key-info-label">Foreigners</span>
        </div>
        <div class="key-info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="key-info-val">{html_escape(min_entry)}</span>
          <span class="key-info-label">Min. Entry</span>
        </div>
      </div>
    </div>

{recommend_section}

{about_section}

    <!-- 4. Property Details Table -->
    <div class="section">
      <h2 class="section-title">Property details</h2>
      <table class="details-table" id="detailsTable">
{details_rows}
      </table>
      <button class="see-more-btn" id="detailsBtn" onclick="toggleDetails()">See all details &darr;</button>
    </div>

    <!-- 5. Available Layouts -->
    <div class="section">
      <h2 class="section-title">Available Layouts</h2>
      <div class="fac-grid">
        <div class="fac-item"><span class="fac-icon">\U0001f6cf\ufe0f</span><span class="fac-label">Studio</span></div>
        <div class="fac-item"><span class="fac-icon">\U0001f3e0</span><span class="fac-label">1 Bedroom</span></div>
        <div class="fac-item"><span class="fac-icon">\U0001f3e1</span><span class="fac-label">2 Bedroom</span></div>
        <div class="fac-item"><span class="fac-icon">\U0001f3d8\ufe0f</span><span class="fac-label">3 Bedroom</span></div>
      </div>
    </div>
{discounts_html}
{fees_html}

    <!-- 8. What's Nearby -->
    <div class="section">
      <h2 class="section-title">What's nearby</h2>
      <div id="nearbyMap" class="map-container"></div>
      <link href="https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css" rel="stylesheet">
      <script src="https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.js"></script>
      <style>.map-marker{{font-size:22px;cursor:pointer;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));transition:transform 0.2s;line-height:1}}.map-marker:hover{{transform:scale(1.4)}}</style>
      <div class="nearby-tabs">
        <button class="nearby-tab active" onclick="filterNearby('transit',this)">Transit</button>
        <button class="nearby-tab" onclick="filterNearby('bus',this)">Bus</button>
        <button class="nearby-tab" onclick="filterNearby('schools',this)">Schools</button>
        <button class="nearby-tab" onclick="filterNearby('clinics',this)">Clinics</button>
        <button class="nearby-tab" onclick="filterNearby('shopping',this)">Shopping</button>
      </div>
      <div id="nearbyList"></div>
    </div>

    <!-- 9. Estimated Mortgage -->
    <div class="section">
      <h2 class="section-title">Estimated Mortgage</h2>
      <div class="mortgage-grid">
        <div class="mortgage-field">
          <label>Property Price (RM)</label>
          <input type="text" id="mortPrice" value="{mort_default}" oninput="calcMortgage()">
        </div>
        <div class="mortgage-field">
          <label>Down Payment (%)</label>
          <input type="number" id="mortDown" value="10" min="0" max="50" oninput="calcMortgage()">
        </div>
        <div class="mortgage-field">
          <label>Loan Tenure (Years)</label>
          <select id="mortTenure" onchange="calcMortgage()">
            <option value="25">25 years</option>
            <option value="30" selected>30 years</option>
            <option value="35">35 years</option>
          </select>
        </div>
        <div class="mortgage-field">
          <label>Interest Rate (%)</label>
          <input type="number" id="mortRate" value="4.5" min="1" max="15" step="0.1" oninput="calcMortgage()">
        </div>
      </div>
      <div class="mortgage-result">
        <div class="mr-label">Estimated Monthly Payment</div>
        <div class="mr-amount" id="mortResult">RM 0</div>
        <div class="mr-sub">Based on <span id="mortLoanAmt">RM 0</span> loan at <span id="mortRateDisp">4.5</span>% over <span id="mortTenureDisp">30</span> years</div>
      </div>
      <div class="upfront-costs">
        <h4>Upfront Costs Estimate</h4>
        <div class="upfront-row"><span class="ur-label">Down Payment (10%)</span><span id="upfrontDown">RM 0</span></div>
        <div class="upfront-row"><span class="ur-label">Stamp Duty</span><span id="upfrontStamp">RM 0</span></div>
        <div class="upfront-row"><span class="ur-label">Legal Fees (est.)</span><span id="upfrontLegal">RM 0</span></div>
        <div class="upfront-row"><span class="ur-label">Total Upfront</span><span id="upfrontTotal">RM 0</span></div>
      </div>
    </div>

  </div><!-- /main-col -->

  <!-- RIGHT COLUMN (Sticky Sidebar) -->
  <div class="sidebar">
    <div class="sidebar-card">
      <div class="sidebar-dev">
        <div class="sidebar-dev-logo">{dev_abbr_escaped}</div>
        <div class="sidebar-dev-info">
          <h3>{dev_full_escaped}</h3>
          <p>Licensed Developer</p>
        </div>
      </div>
      <a href="{wa_url}" target="_blank" class="sidebar-register" style="border-color:#c41230;color:#c41230;font-weight:700;font-size:15px;text-align:center">Enquire Now</a>
      <p style="font-size:11px;color:#9ca3af;line-height:1.5;margin-top:12px;text-align:center">I confirm that I have read the <a href="#" style="color:var(--navy);text-decoration:underline">privacy policy</a> and allow my information to be shared with this developer who may contact me later.</p>
    </div>
  </div><!-- /sidebar -->

</div><!-- /two-col -->

<!-- SIMILAR PROPERTIES (Full Width) -->
<div class="related-section">
  <h2>Similar Properties You Might Like</h2>
  <div class="related-grid">
{similar_html}
  </div>
</div>

<!-- FREE CONSULTATION CTA -->
<div class="enquiry" id="enquirySection">
  <h2>Contact Us for a Free Consultation</h2>
  <p>Get expert advice on {name_escaped} &mdash; no obligations, no pressure.</p>
  <a href="{wa_url}" target="_blank" class="sidebar-wa" style="display:inline-flex;margin-top:8px;width:auto;padding:14px 36px;font-size:16px;border-radius:50px">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
    Chat on WhatsApp
  </a>
</div>

<!-- FOOTER -->
<div class="site-footer">
  &copy; 2026 Straits Advisory. All rights reserved.
</div>

<!-- SCRIPTS -->
<script>
// Currency conversion
{currency_js}
var rates = {{MYR:1, SGD:0.298, USD:0.222, CNY:1.608, GBP:0.176, AUD:0.344, HKD:1.733, INR:18.61, JPY:33.5, EUR:0.204, TWD:7.18}};
var symbols = {{MYR:'RM', SGD:'S$', USD:'US$', CNY:'\\u00a5', GBP:'\\u00a3', AUD:'A$', HKD:'HK$', INR:'\\u20b9', JPY:'\\u00a5', EUR:'\\u20ac', TWD:'NT$'}};
var countryToCurrency = {{SG:'SGD',US:'USD',GB:'GBP',AU:'AUD',CN:'CNY',HK:'HKD',IN:'INR',JP:'JPY',DE:'EUR',FR:'EUR',MY:'MYR',TW:'TWD'}};

function formatPrice(amount, currency) {{
  var sym = symbols[currency] || currency + ' ';
  if (amount >= 1000000) return sym + (amount/1000000).toFixed(2) + 'M';
  if (amount >= 1000) return sym + Math.round(amount).toLocaleString();
  return sym + amount;
}}

function convertAndDisplay(currency) {{
  if (PROPERTY_PRICE_MIN === 0) return;
  var rate = rates[currency] || rates.MYR;
  var min = Math.round(PROPERTY_PRICE_MIN * rate);
  var max = Math.round(PROPERTY_PRICE_MAX * rate);
  var display = formatPrice(min, currency) + ' \\u2014 ' + formatPrice(max, currency);
  if (currency !== 'MYR') display += ' <span style="font-size:13px;color:#6b7280;font-weight:500">(RM' + PROPERTY_PRICE_MIN.toLocaleString() + ' \\u2014 RM' + PROPERTY_PRICE_MAX.toLocaleString() + ')</span>';
  document.getElementById('heroPrice').innerHTML = display;
  var minEntry = document.querySelector('.key-info-item:last-child .key-info-val');
  if (minEntry) minEntry.textContent = formatPrice(min, currency);
}}

{currency_convert}

// About expand/collapse
function toggleAbout(){{
  var el = document.getElementById('aboutText');
  var btn = document.getElementById('seeMoreBtn');
  if (!el || !btn) return;
  el.classList.toggle('expanded');
  btn.textContent = el.classList.contains('expanded') ? 'See less \\u2191' : 'See more \\u2193';
}}

// Details expand/collapse
function toggleDetails(){{
  var rows = document.querySelectorAll('.detail-extra');
  var btn = document.getElementById('detailsBtn');
  var isHidden = rows[0].style.display === 'none';
  rows.forEach(function(r){{ r.style.display = isHidden ? 'table-row' : 'none'; }});
  btn.textContent = isHidden ? 'See fewer details \\u2191' : 'See all details \\u2193';
}}

// Nearby POI data
var nearbyPOIs = [
  {{name:'Sultan Iskandar CIQ',type:'Immigration / RTS Link',cat:'transit',emoji:'\\ud83d\\ude84',lng:103.7670,lat:1.4654,dist:0.8,distStr:'800m'}},
  {{name:'JB Sentral',type:'KTM Station',cat:'transit',emoji:'\\ud83d\\ude86',lng:103.7588,lat:1.4575,dist:1.4,distStr:'1.4 km'}},
  {{name:'Woodlands Checkpoint (SG)',type:'International Border',cat:'transit',emoji:'\\ud83c\\uddf8\\ud83c\\uddec',lng:103.7686,lat:1.4456,dist:1.5,distStr:'15 min'}},
  {{name:'Kotaraya Bus Terminal',type:'Bus Terminal',cat:'bus',emoji:'\\ud83d\\ude8c',lng:103.7615,lat:1.4616,dist:0.9,distStr:'900m'}},
  {{name:'JB Sentral Bus Terminal',type:'Bus Terminal',cat:'bus',emoji:'\\ud83d\\ude8c',lng:103.7592,lat:1.4571,dist:1.4,distStr:'1.4 km'}},
  {{name:'Larkin Sentral',type:'Bus Terminal',cat:'bus',emoji:'\\ud83d\\ude8c',lng:103.7426,lat:1.4957,dist:5.0,distStr:'5.0 km'}},
  {{name:'Foon Yew High School',type:'Secondary School',cat:'schools',emoji:'\\ud83c\\udf93',lng:103.7787,lat:1.4688,dist:1.5,distStr:'1.5 km'}},
  {{name:'Fairview International School',type:'International School',cat:'schools',emoji:'\\ud83c\\udfeb',lng:103.7948,lat:1.5414,dist:10,distStr:'10 km'}},
  {{name:'Hospital Sultanah Aminah',type:'Government Hospital',cat:'clinics',emoji:'\\ud83c\\udfe5',lng:103.7460,lat:1.4586,dist:2.6,distStr:'2.6 km'}},
  {{name:'KPJ Johor Specialist Hospital',type:'Private Hospital',cat:'clinics',emoji:'\\ud83c\\udfe5',lng:103.7414,lat:1.4761,dist:3.5,distStr:'3.5 km'}},
  {{name:'R&F Mall',type:'Shopping Mall',cat:'shopping',emoji:'\\ud83d\\udecd\\ufe0f',lng:103.7690,lat:1.4592,dist:0.1,distStr:'100m'}},
  {{name:'City Square JB',type:'Shopping Mall',cat:'shopping',emoji:'\\ud83d\\udecd\\ufe0f',lng:103.7638,lat:1.4616,dist:0.7,distStr:'700m'}},
  {{name:'KOMTAR JBCC',type:'Shopping Mall',cat:'shopping',emoji:'\\ud83d\\udecd\\ufe0f',lng:103.7630,lat:1.4634,dist:0.9,distStr:'900m'}},
  {{name:'KSL City Mall',type:'Shopping Mall',cat:'shopping',emoji:'\\ud83d\\udecd\\ufe0f',lng:103.7624,lat:1.4855,dist:3.2,distStr:'3.2 km'}},
  {{name:'Mid Valley Southkey',type:'Mega Mall',cat:'shopping',emoji:'\\ud83c\\udfec',lng:103.7774,lat:1.5010,dist:5.0,distStr:'5.0 km'}},
  {{name:'Paradigm Mall JB',type:'Shopping Mall',cat:'shopping',emoji:'\\ud83d\\udecd\\ufe0f',lng:103.6858,lat:1.5152,dist:10,distStr:'10 km'}}
];

var nearbyMap = null;
var activeNearbyCategory = 'transit';

function renderNearbyList(cat){{
  var items = nearbyPOIs.filter(function(p){{ return p.cat === cat; }}).sort(function(a,b){{ return a.dist - b.dist; }});
  var html = '<ul class="nearby-list">';
  items.forEach(function(p){{
    html += '<li class="nearby-item"><div class="nearby-item-left"><div class="ni-icon">' + p.emoji + '</div><div><div class="ni-name">' + p.name + '</div><div class="ni-type">' + p.type + '</div></div></div><span class="nearby-dist">' + p.distStr + '</span></li>';
  }});
  html += '</ul>';
  document.getElementById('nearbyList').innerHTML = html;
}}

function filterNearby(cat, tab){{
  activeNearbyCategory = cat;
  document.querySelectorAll('.nearby-tab').forEach(function(t){{ t.classList.remove('active'); }});
  if(tab) tab.classList.add('active');
  renderNearbyList(cat);
}}

renderNearbyList('transit');

// Mortgage calculator
function calcMortgage(){{
  var priceStr = document.getElementById('mortPrice').value.replace(/[^0-9]/g,'');
  var price = parseFloat(priceStr) || {mort_default_num};
  var downPct = parseFloat(document.getElementById('mortDown').value) || 10;
  var tenure = parseInt(document.getElementById('mortTenure').value) || 30;
  var rate = parseFloat(document.getElementById('mortRate').value) || 4.5;
  var downAmt = price * (downPct / 100);
  var loan = price - downAmt;
  var monthlyRate = (rate / 100) / 12;
  var numPayments = tenure * 12;
  var monthly = 0;
  if(monthlyRate > 0){{
    monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }} else {{
    monthly = loan / numPayments;
  }}
  var stamp = 0;
  if(price <= 100000){{ stamp = price * 0.01; }}
  else if(price <= 500000){{ stamp = 1000 + (price - 100000) * 0.02; }}
  else {{ stamp = 1000 + 8000 + (price - 500000) * 0.03; }}
  var legal = Math.max(500, price * 0.0107);
  document.getElementById('mortResult').textContent = 'RM ' + Math.round(monthly).toLocaleString();
  document.getElementById('mortLoanAmt').textContent = 'RM ' + Math.round(loan).toLocaleString();
  document.getElementById('mortRateDisp').textContent = rate;
  document.getElementById('mortTenureDisp').textContent = tenure;
  document.getElementById('upfrontDown').textContent = 'RM ' + Math.round(downAmt).toLocaleString();
  document.getElementById('upfrontStamp').textContent = 'RM ' + Math.round(stamp).toLocaleString();
  document.getElementById('upfrontLegal').textContent = 'RM ' + Math.round(legal).toLocaleString();
  document.getElementById('upfrontTotal').textContent = 'RM ' + Math.round(downAmt + stamp + legal).toLocaleString();
}}

// MapLibre init
document.addEventListener('DOMContentLoaded', function(){{
  function initMap(){{
    if(typeof maplibregl === 'undefined'){{ setTimeout(initMap, 200); return; }}
    nearbyMap = new maplibregl.Map({{
      container:'nearbyMap',
      style:'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center:[103.7694,1.4588],
      zoom:14,
      attributionControl:false
    }});
    new maplibregl.Marker({{color:'#c9a962'}})
      .setLngLat([103.7694,1.4588])
      .setPopup(new maplibregl.Popup({{offset:25}}).setHTML('<strong>{name_escaped}</strong><br>{location_escaped}, Johor'))
      .addTo(nearbyMap);
    nearbyMap.addControl(new maplibregl.NavigationControl(),'top-right');
  }}
  initMap();
  calcMortgage();
}});
</script>

</body>
</html>"""

    return page_html


def generate_missing_data_report(df):
    """Generate the missing data XLSX report."""
    report_rows = []

    for i, row in df.iterrows():
        name = safe_str(row['Project Name'])

        missing_price = is_nan(row.get('Price Range'))
        missing_size = is_nan(row.get('Size Range (sqft)'))
        missing_foreigner = is_nan(row.get('Foreigner minimum purchase price'))
        missing_desc = is_nan(row.get('Description'))
        missing_highlights = is_nan(row.get('Highlights'))
        missing_units = is_nan(row.get('Total Units'))

        # Check discounts
        has_any_discount = False
        for d in range(1, 9):
            if not is_nan(row.get(f'Discount {d}')):
                has_any_discount = True
                break
        missing_discounts = not has_any_discount

        # Check fees
        fee_cols = ['SPA Legal Fee', 'Loan Legal Fee', 'SPA Stamp Duty (MOT)', 'Loan Stamp Duty', 'Foreigner State Consent Fee']
        has_any_fee = False
        for col in fee_cols:
            if not is_nan(row.get(col)):
                has_any_fee = True
                break
        missing_fees = not has_any_fee

        missing_fields = [missing_price, missing_size, missing_foreigner, missing_desc,
                          missing_highlights, missing_units, missing_discounts, missing_fees]

        if any(missing_fields):
            missing_count = sum(missing_fields)
            total_fields = len(missing_fields)

            if missing_count >= 6:
                status = "Minimal"
            elif missing_count >= 3:
                status = "Partial"
            else:
                status = "Complete"

            report_rows.append({
                'Property Name': name,
                'Missing: Price Range': 'Yes' if missing_price else 'No',
                'Missing: Size Range': 'Yes' if missing_size else 'No',
                'Missing: Foreigner Min Purchase': 'Yes' if missing_foreigner else 'No',
                'Missing: Description': 'Yes' if missing_desc else 'No',
                'Missing: Highlights': 'Yes' if missing_highlights else 'No',
                'Missing: Total Units': 'Yes' if missing_units else 'No',
                'Missing: Discounts': 'Yes' if missing_discounts else 'No',
                'Missing: Fees': 'Yes' if missing_fees else 'No',
                'Status': status,
            })

    report_df = pd.DataFrame(report_rows)
    report_df.to_excel(MISSING_DATA_PATH, index=False, engine='openpyxl')
    print(f"\nCreated missing data report: {MISSING_DATA_PATH}")
    print(f"  Properties with missing data: {len(report_rows)} / {len(df)}")

    # Summary
    status_counts = report_df['Status'].value_counts()
    for status, count in status_counts.items():
        print(f"  {status}: {count}")


def main():
    print("=" * 60)
    print("Straits Advisory - Property Listing Page Generator")
    print("=" * 60)
    print(f"\nSource: {XLSX_PATH}")
    print(f"Template: {TEMPLATE_PATH}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Total properties in XLSX: {len(df)}")
    print()

    generated = 0
    skipped = 0

    for i, row in df.iterrows():
        name = safe_str(row['Project Name'])
        slug = slugify(name)
        filename = f"{slug}.html"
        filepath = os.path.join(OUTPUT_DIR, filename)

        # Skip R&F Princess Cove - Phase 2 (index 4)
        if i == 4:
            print(f"  SKIP [{i:2d}] {name} (already exists)")
            skipped += 1
            continue

        # Generate the page
        page_html = generate_property_page(row, i, df)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(page_html)

        # Check data completeness
        has_price = not is_nan(row.get('Price Range'))
        has_desc = not is_nan(row.get('Description'))
        status = "FULL" if (has_price and has_desc) else "PARTIAL" if (has_price or has_desc) else "MINIMAL"

        print(f"  CREATE [{i:2d}] {filename} ({status})")
        generated += 1

    print(f"\nGenerated: {generated} files")
    print(f"Skipped: {skipped} files")

    # Generate missing data report
    generate_missing_data_report(df)

    print("\nDone!")


if __name__ == "__main__":
    main()
