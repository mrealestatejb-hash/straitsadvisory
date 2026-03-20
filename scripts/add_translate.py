#!/usr/bin/env python3
"""Add translation data-i18n attributes and translate.js script to all property pages."""

import os
import re
import glob

PROPERTIES_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'properties')

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Add data-i18n to nav links (handle both ../buy.html and buy.html patterns)
    # Nav links: Buy, Sell, Rent, Services, About
    content = re.sub(
        r'(<a href="[^"]*buy\.html"[^>]*)>Buy</a>',
        r'\1 data-i18n="Buy">Buy</a>',
        content
    )
    content = re.sub(
        r'(<a href="[^"]*sell\.html"[^>]*)>Sell</a>',
        r'\1 data-i18n="Sell">Sell</a>',
        content
    )
    content = re.sub(
        r'(<a href="[^"]*rent\.html"[^>]*)>Rent</a>',
        r'\1 data-i18n="Rent">Rent</a>',
        content
    )
    content = re.sub(
        r'(<a href="[^"]*services\.html"[^>]*)>Services</a>',
        r'\1 data-i18n="Services">Services</a>',
        content
    )
    content = re.sub(
        r'(<a href="[^"]*why-work-with-us\.html"[^>]*)>About</a>',
        r'\1 data-i18n="About">About</a>',
        content
    )
    # WhatsApp Us CTA
    content = re.sub(
        r'(<a href="https://wa\.me/[^"]*" class="nav-cta"[^>]*)>WhatsApp Us</a>',
        r'\1 data-i18n="WhatsApp Us">WhatsApp Us</a>',
        content
    )

    # "About this property" section title
    content = content.replace(
        '>About this property</h2>',
        ' data-i18n="About this property">About this property</h2>'
    )

    # "Book a Viewing" / "Chat on WhatsApp" buttons
    content = re.sub(
        r'>Book a Viewing</a>',
        r' data-i18n="Book a Viewing">Book a Viewing</a>',
        content
    )
    # Wrap "Chat on WhatsApp" text in a span with data-i18n
    content = re.sub(
        r'(?<!</svg)>\s*\n\s*Chat on WhatsApp\s*\n\s*</a>',
        '>\n    <span data-i18n="Chat on WhatsApp">Chat on WhatsApp</span>\n  </a>',
        content
    )
    # Fix any broken </svg data-i18n="..."> from previous run
    content = re.sub(
        r'</svg data-i18n="[^"]*">',
        '</svg>',
        content
    )

    # "What's Nearby" heading
    content = content.replace(
        ">What's Nearby</h2>",
        ' data-i18n="What\'s Nearby">What\'s Nearby</h2>'
    )

    # Nearby category tabs
    for cat in ['Transit', 'Bus', 'Schools', 'Clinics', 'Shopping']:
        content = re.sub(
            rf'(<button[^>]*onclick="switchNearby\(\'{cat.lower()}\'[^"]*"[^>]*)>{cat}</button>',
            rf'\1 data-i18n="{cat}">{cat}</button>',
            content
        )

    # "Show more" / "Show less"
    content = re.sub(
        r'>Show more</button>',
        r' data-i18n="Show more">Show more</button>',
        content
    )

    # "Price on Request"
    content = re.sub(
        r'>Price on Request</span>',
        r' data-i18n="Price on Request">Price on Request</span>',
        content
    )

    # Add translate.js script before </body> if not already present
    if 'translate.js' not in content:
        content = content.replace('</body>', '<script src="../js/translate.js"></script>\n</body>')

    # Don't double-add data-i18n
    content = content.replace('data-i18n="Buy" data-i18n="Buy"', 'data-i18n="Buy"')
    content = content.replace('data-i18n="Sell" data-i18n="Sell"', 'data-i18n="Sell"')
    content = content.replace('data-i18n="Rent" data-i18n="Rent"', 'data-i18n="Rent"')
    content = content.replace('data-i18n="Services" data-i18n="Services"', 'data-i18n="Services"')
    content = content.replace('data-i18n="About" data-i18n="About"', 'data-i18n="About"')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    files = glob.glob(os.path.join(PROPERTIES_DIR, '*.html'))
    modified = 0
    for f in files:
        if process_file(f):
            modified += 1
            print(f"  Updated: {os.path.basename(f)}")
    print(f"\nModified {modified} of {len(files)} property pages")

if __name__ == '__main__':
    main()
