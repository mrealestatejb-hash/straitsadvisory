#!/usr/bin/env python3
"""
Remove "Discounts & Rebates" and "Fees & Charges" sections from all property HTML files.

Each section follows this pattern:
    <!-- Discounts & Rebates -->
    <div class="section">
      <h2 class="section-title">Discounts &amp; Rebates</h2>
      ... content (ul.check-list or table.details-table) ...
    </div>

    <!-- Fees & Charges -->
    <div class="section">
      <h2 class="section-title">Fees &amp; Charges</h2>
      ... content (table.details-table) ...
    </div>
"""

import os
import re
import glob

PROPERTIES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'properties')

# Pattern to match the HTML comment + the <div class="section"> block for each section.
# The section div ends at the next </div> that closes it (after the inner content).
# We match: optional whitespace, optional HTML comment, the div.section containing the h2, up to closing </div>

# For "Discounts & Rebates": comment + div.section with h2 containing "Discounts &amp; Rebates"
DISCOUNTS_PATTERN = re.compile(
    r'\s*<!-- Discounts & Rebates -->\s*'
    r'<div class="section">\s*'
    r'<h2 class="section-title">Discounts &amp; Rebates</h2>'
    r'.*?'
    r'</div>\s*',
    re.DOTALL
)

# For "Fees & Charges": comment + div.section with h2 containing "Fees &amp; Charges"
FEES_PATTERN = re.compile(
    r'\s*<!-- Fees & Charges -->\s*'
    r'<div class="section">\s*'
    r'<h2 class="section-title">Fees &amp; Charges</h2>'
    r'.*?'
    r'</div>\s*',
    re.DOTALL
)


def process_file(filepath):
    """Process a single HTML file. Returns (discounts_removed, fees_removed) counts."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    discounts_removed = len(DISCOUNTS_PATTERN.findall(content))
    content = DISCOUNTS_PATTERN.sub('\n', content)

    fees_removed = len(FEES_PATTERN.findall(content))
    content = FEES_PATTERN.sub('\n', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    return discounts_removed, fees_removed


def main():
    html_files = sorted(glob.glob(os.path.join(PROPERTIES_DIR, '*.html')))
    print(f"Found {len(html_files)} HTML files in {PROPERTIES_DIR}\n")

    total_files_modified = 0
    total_discounts = 0
    total_fees = 0

    for filepath in html_files:
        filename = os.path.basename(filepath)
        d, f = process_file(filepath)
        if d or f:
            total_files_modified += 1
            total_discounts += d
            total_fees += f
            parts = []
            if d:
                parts.append(f"{d} Discounts & Rebates")
            if f:
                parts.append(f"{f} Fees & Charges")
            print(f"  Modified: {filename} - removed {', '.join(parts)}")

    print(f"\n--- Summary ---")
    print(f"Files scanned:    {len(html_files)}")
    print(f"Files modified:   {total_files_modified}")
    print(f"Discounts removed: {total_discounts}")
    print(f"Fees removed:      {total_fees}")
    print(f"Total sections:    {total_discounts + total_fees}")


if __name__ == '__main__':
    main()
