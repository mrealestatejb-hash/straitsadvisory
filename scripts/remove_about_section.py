import re, glob, os

base = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'properties')
files = glob.glob(os.path.join(base, '*.html'))

# Two patterns: with and without See more button
pattern_with_btn = re.compile(
    r'\s*<!-- 3\. About This Property -->\s*'
    r'<div class="section"[^>]*>\s*'
    r'<h2[^>]*>About this property</h2>\s*'
    r'<div class="about-text"[^>]*>.*?</div>\s*'
    r'<button[^>]*>See more[^<]*</button>\s*'
    r'</div>',
    re.DOTALL
)

pattern_no_btn = re.compile(
    r'\s*<!-- 3\. About This Property -->\s*'
    r'<div class="section"[^>]*>\s*'
    r'<h2[^>]*>About this property</h2>\s*'
    r'<div class="about-text"[^>]*>.*?</div>\s*'
    r'</div>',
    re.DOTALL
)

count = 0
for f in sorted(files):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if 'About this property' not in content:
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
