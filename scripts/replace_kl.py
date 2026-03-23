#!/usr/bin/env python3
"""Replace KL placeholder cards with real PropertyGuru listings."""

import os

HTML_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'buy.html')

# (area_slug, tenure, status, title, location, price, area_label, feature, img_url)
LISTINGS = [
    ("kl-city-centre","freehold","new-launch","KL East : East 61","KL City Centre, Kuala Lumpur","Price on Request","KL City Centre","Terraced House","https://my1-cdn.pgimgs.com/project-listing-project/60629533/PLPHO.286873510.V800/KL-East-East-61-KL-City-Centre-Malaysia.jpg"),
    ("kl-city-centre","freehold","new-launch","KL East : The Reya","KL City Centre, Kuala Lumpur","From RM899,000","KL City Centre","Completion 2029","https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop"),
    ("bandar-tasik-selatan","leasehold","new-launch","PSV 2 Residences","Bandar Tasik Selatan, Kuala Lumpur","From RM512,000","Bandar Tasik Selatan","Completion 2028","https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"),
    ("setapak","freehold","new-launch","EkoTitiwangsa","Setapak, Kuala Lumpur","From RM413,000","Setapak","Completion 2028","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"),
    ("sentul","freehold","new-launch","LSH Sentul Ria","Sentul, Kuala Lumpur","Price on Request","Sentul","Service Residence","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"),
    ("mont-kiara","freehold","new-launch","Papyrus North Kiara","Mont Kiara, Kuala Lumpur","From RM868,000","Mont Kiara","Completion 2028","https://my1-cdn.pgimgs.com/project-listing-project/40570920/PLPHO.252073513.V800/Papyrus-North-Kiara-Mont-Kiara-Malaysia.jpg"),
    ("bukit-bintang","leasehold","new-launch","SWNK Houze @ BBCC","Bukit Bintang, Kuala Lumpur","From RM745,000","Bukit Bintang","Completion 2026","https://my1-cdn.pgimgs.com/project-listing-project/40593700/PLPHO.264068316.V800/SWNK-Houze-BBCC-Bukit-Bintang-Malaysia.jpg"),
    ("jalan-klang-lama","freehold","new-launch","M Aurora","Jalan Klang Lama, Kuala Lumpur","Price on Request","Jalan Klang Lama","Completion 2027","https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600&h=400&fit=crop"),
    ("bangsar","leasehold","new-launch","Parkside Residences @ Setia Federal Hill","Bangsar, Kuala Lumpur","From RM665,000","Bangsar","Completion 2030","https://my1-cdn.pgimgs.com/project-listing-project/60400131/PLPHO.274369992.V800/Parkside-Residences-Setia-Federal-Hill-Bangsar-Malaysia.jpg"),
    ("kl-city-centre","freehold","new-launch","Sunway Cochrane","KL City Centre, Kuala Lumpur","Price on Request","KL City Centre","Condominium","https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop"),
    ("seputeh","leasehold","new-launch","9 Seputeh","Jalan Klang Lama, Kuala Lumpur","Price on Request","Seputeh","Condominium","https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"),
    ("setapak","leasehold","new-launch","SkyAwani PRIMA Residences","Setapak, Kuala Lumpur","Price on Request","Setapak","Apartment","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"),
    ("jalan-klang-lama","freehold","completed","The Maple Residences","Jalan Klang Lama, Kuala Lumpur","From RM835,000","Jalan Klang Lama","Completed 2025","https://my1-cdn.pgimgs.com/project-listing-project/40612174/PLPHO.246040889.V800/The-Maple-Residences-Jalan-Klang-Lama-Old-Klang-Road-Malaysia.jpg"),
    ("cheras","leasehold","new-launch","LSH Segar","Cheras, Kuala Lumpur","From RM567,000","Cheras","Completion 2026","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"),
    ("desa-petaling","leasehold","new-launch","Tuan Straits Residency","Desa Petaling, Kuala Lumpur","Price on Request","Desa Petaling","Completion 2030","https://my1-cdn.pgimgs.com/project-listing-project/60628859/PLPHO.286396875.V800/Tuan-Straits-Residency-Desa-Petaling-Malaysia.jpg"),
    ("kl-city-centre","freehold","new-launch","KL48","KL City Centre, Kuala Lumpur","Price on Request","KL City Centre","Condominium","https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600&h=400&fit=crop"),
    ("kepong","leasehold","new-launch","M Nova","Kepong, Kuala Lumpur","Price on Request","Kepong","Completion 2028","https://my1-cdn.pgimgs.com/project-listing-project/34334462/PLPHO.193971438.V800/M-Nova-Kepong-Malaysia.jpg"),
    ("seputeh","leasehold","new-launch","J.Rayon Residences","Seputeh, Kuala Lumpur","Price on Request","Seputeh","Apartment","https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop"),
    ("kl-city-centre","freehold","new-launch","Royal Garden @ Sri Putramas 4","Kuala Lumpur","Price on Request","Kuala Lumpur","Condominium","https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"),
    ("setapak","leasehold","new-launch","M Azura","Setapak, Kuala Lumpur","Price on Request","Setapak","Completion 2028","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"),
    ("bukit-jalil","leasehold","new-launch","The Nobel Healthcare Park, KL Wellness City","Bukit Jalil, Kuala Lumpur","From RM414,000","Bukit Jalil","Completion 2026","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"),
    ("taman-desa","leasehold","new-launch","M Aspira","Taman Desa, Kuala Lumpur","From RM452,000","Taman Desa","Service Residence","https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600&h=400&fit=crop"),
    ("segambut","freehold","new-launch","Bamboo Hills Residences","Segambut, Kuala Lumpur","From RM490,000","Segambut","Completion 2028","https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop"),
    ("jalan-klang-lama","freehold","new-launch","Radium Arena @ Old Klang Road","Jalan Klang Lama, Kuala Lumpur","From RM410,000","Jalan Klang Lama","Completion 2028","https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"),
    ("kl-city-centre","freehold","completed","The Conlay","KL City Centre, Kuala Lumpur","From RM1,552,000","KL City Centre","Completed 2025","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"),
    ("kl-city-centre","freehold","new-launch","Chancery Ampang - Hybrid SOHO","KL City Centre, Kuala Lumpur","From RM422,000","KL City Centre","Completion 2027","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"),
    ("seputeh","freehold","new-launch","Aetas Seputeh","Seputeh, Kuala Lumpur","From RM3,285,800","Seputeh","Completion 2028","https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600&h=400&fit=crop"),
    ("segambut","freehold","new-launch","Tangen Residences","Segambut, Kuala Lumpur","From RM659,000","Segambut","Completion 2027","https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop"),
    ("kl-city-centre","freehold","new-launch","CloutHaus Residences","KL City Centre, Kuala Lumpur","From RM1,500,000","KL City Centre","Condominium","https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"),
    ("jalan-klang-lama","freehold","new-launch","Aras Residences","Jalan Klang Lama, Kuala Lumpur","From RM599,400","Jalan Klang Lama","Condominium","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"),
    ("cheras","leasehold","new-launch","The Connaught One","Cheras, Kuala Lumpur","From RM380,000","Cheras","Completion 2027","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"),
    ("desa-pandan","leasehold","new-launch","SkyAman 1 Residences","Desa Pandan, Kuala Lumpur","Price on Request","Desa Pandan","Apartment","https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600&h=400&fit=crop"),
    ("cheras","leasehold","new-launch","Levia Residence","Cheras, Kuala Lumpur","From RM684,000","Cheras","Completion 2027","https://my1-cdn.pgimgs.com/project-listing-project/43191686/PLPHO.265943167.V800/Levia-Residence-Kuala-Lumpur-Cheras-Malaysia.jpg"),
    ("setapak","leasehold","new-launch","PV 22 Residences","Setapak, Kuala Lumpur","From RM373,000","Setapak","Completion 2028","https://my1-cdn.pgimgs.com/project-listing-project/40623328/PLPHO.238853575.V800/PV-22-Residences-Setapak-Malaysia.jpg"),
    ("sentul","freehold","new-launch","Vox Residence @ Sentul","Sentul, Kuala Lumpur","From RM523,200","Sentul","Completion 2027","https://my1-cdn.pgimgs.com/project-listing-project/40601773/PLPHO.248479718.V800/Vox-Residence-Sentul-Sentul-Malaysia.jpg"),
    ("kl-city-centre","freehold","new-launch","Platinum Melati Residences","KL City Centre, Kuala Lumpur","Price on Request","KL City Centre","Condominium","https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop"),
]

def build_card(area, tenure, status, title, location, price, area_label, feature, img):
    import re
    name_slug = re.sub(r'[^a-z0-9 ]', '', title.lower()).strip()
    name_slug = re.sub(r'\s+', ' ', name_slug)
    tenure_label = "Freehold" if tenure == "freehold" else "Leasehold"
    status_label = "Completed" if status == "completed" else "New Launch"
    badge_class = "badge-green" if status == "completed" else "badge-gold"
    return f'''<a href="#" class="property-card" data-city="kuala-lumpur" data-area="{area}" data-status="{status}" data-tenure="{tenure}" data-name="{name_slug}" style="text-decoration:none;color:inherit">
  <div class="card-image" style="background:url('{img}') center/cover"><div class="card-badges"><span class="badge {badge_class}">{status_label}</span><span class="badge badge-outline">{tenure_label}</span></div></div>
  <div class="card-body"><h3 class="card-title">{title}</h3><p class="card-location">{location}</p><p class="card-price">{price}</p>
    <div class="card-meta"><span class="card-distance">\U0001f4cd {area_label}</span><span class="card-feature">\u2726 {feature}</span></div>
  </div></a>'''


def main():
    with open(HTML_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    kl_start = content.find('<!-- KUALA LUMPUR PROPERTIES -->')
    penang_start = content.find('<!-- PENANG PROPERTIES -->')

    if kl_start == -1 or penang_start == -1:
        print("ERROR: Could not find section markers")
        return

    cards = '\n\n'.join(build_card(*l) for l in LISTINGS)
    new_section = f'<!-- KUALA LUMPUR PROPERTIES -->\n\n{cards}\n\n'

    new_content = content[:kl_start] + new_section + content[penang_start:]

    with open(HTML_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Replaced KL section with {len(LISTINGS)} real listings")


if __name__ == '__main__':
    main()
