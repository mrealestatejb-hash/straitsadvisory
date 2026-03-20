"""
Batch-add a "News" navigation link to all HTML pages.
Inserts the link right after the "About" nav link.
Skips news.html (already has it).
Uses ../news.html for property pages in the properties/ subfolder.
"""

import re
import os
import glob

BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")

# Pattern: match the About <a> tag (with optional class="active") up to its closing </a>
# We capture the whole About link so we can reinsert it, then append the News link.
ABOUT_PATTERN = re.compile(
    r'(<a\s+href="[^"]*why-work-with-us\.html"[^>]*data-i18n="About"[^>]*>About</a>)'
)

def already_has_news(content):
    """Check if News link already exists after About."""
    return 'data-i18n="News"' in content

def add_news_link(filepath, is_property_page=False):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if already_has_news(content):
        print(f"  SKIP (already has News): {os.path.basename(filepath)}")
        return False

    href = "../news.html" if is_property_page else "news.html"
    news_link = f'<a href="{href}" data-i18n="News">News</a>'

    new_content, count = ABOUT_PATTERN.subn(r'\1' + news_link, content)

    if count == 0:
        print(f"  WARNING: No About link found in {os.path.basename(filepath)}")
        return False

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  UPDATED ({count} insertion(s)): {os.path.basename(filepath)}")
    return True

def main():
    updated = 0
    skipped = 0

    # 1. Process public/*.html (skip news.html)
    print("=== Processing public/ HTML files ===")
    for filepath in sorted(glob.glob(os.path.join(BASE, "*.html"))):
        basename = os.path.basename(filepath)
        if basename == "news.html":
            print(f"  SKIP (is news.html): {basename}")
            skipped += 1
            continue
        if add_news_link(filepath, is_property_page=False):
            updated += 1
        else:
            skipped += 1

    # 2. Process public/properties/*.html
    print("\n=== Processing public/properties/ HTML files ===")
    prop_dir = os.path.join(BASE, "properties")
    if os.path.isdir(prop_dir):
        for filepath in sorted(glob.glob(os.path.join(prop_dir, "*.html"))):
            if add_news_link(filepath, is_property_page=True):
                updated += 1
            else:
                skipped += 1
    else:
        print("  WARNING: properties/ directory not found")

    print(f"\n=== Done: {updated} files updated, {skipped} files skipped ===")

if __name__ == "__main__":
    main()
