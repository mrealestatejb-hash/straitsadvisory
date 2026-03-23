"""
Remove the FREE CONSULTATION CTA section from all property HTML files.
Matches from <!-- FREE CONSULTATION CTA --> through the closing </div> of the enquiry section.
"""

import re
import glob
import os

PROPERTIES_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public", "properties"
)

# Pattern: match the comment, the enquiry div, and everything inside it up to the closing </div>
# Also consume any trailing blank lines
pattern = re.compile(
    r'\n?<!-- FREE CONSULTATION CTA -->\s*'
    r'<div class="enquiry" id="enquirySection">.*?</div>\s*',
    re.DOTALL
)

html_files = glob.glob(os.path.join(PROPERTIES_DIR, "*.html"))
modified_count = 0

for filepath in sorted(html_files):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content, num_subs = pattern.subn("\n\n", content)

    if num_subs > 0:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        modified_count += 1
        print(f"  Modified: {os.path.basename(filepath)}")

print(f"\nDone. Modified {modified_count} of {len(html_files)} files.")
