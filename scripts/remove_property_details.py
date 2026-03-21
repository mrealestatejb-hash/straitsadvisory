import re, glob, os

base = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'properties')
files = glob.glob(os.path.join(base, '*.html'))

# Match: comment + div with Property details h2 + table + optional button + closing div
pattern_with_btn = re.compile(
    r'\s*<!-- 4\. Property Details Table -->\s*'
    r'<div class="section"[^>]*>\s*'
    r'<h2[^>]*>Property details</h2>\s*'
    r'<table[^>]*>.*?</table>\s*'
    r'<button[^>]*>[^<]*</button>\s*'
    r'</div>',
    re.DOTALL
)

pattern_no_btn = re.compile(
    r'\s*<!-- 4\. Property Details Table -->\s*'
    r'<div class="section"[^>]*>\s*'
    r'<h2[^>]*>Property details</h2>\s*'
    r'<table[^>]*>.*?</table>\s*'
    r'</div>',
    re.DOTALL
)

count = 0
for f in sorted(files):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if 'Property details' not in content:
        continue
    new_content = pattern_with_btn.sub('\n', content)
    if new_content == content:
        new_content = pattern_no_btn.sub('\n', content)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new_content)
        count += 1
        print(f"Removed: {os.path.basename(f)}")
    else:
        print(f"NO MATCH: {os.path.basename(f)}")

print(f"\nDone. Updated {count} files.")
