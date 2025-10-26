
# I'll create all the required HTML files for the TripZee tour and travel website
# Based on the requirements, I need to create:
# 1. index.html (Home)
# 2. packages.html
# 3. gallery.html
# 4. about.html
# 5. contact.html
# 6. sitemap.xml
# 7. privacy.html
# 8. tos.html

# First, let me create the common header and footer components as strings

# Color scheme from 5.css
colors = {
    'primary': '#4b5563',
    'secondary': '#374151',
    'background': '#f9fafb',
    'text': '#111827',
    'button_bg': '#4b5563',
    'button_text': '#ffffff'
}

# Business details
business = {
    'name': 'TripZee',
    'phone': '+917888499960',
    'lat': '26.435359954834',
    'lng': '83.507492065429',
    'address': 'Sarao Khurd, Anusa, Gorakhpur - Uttar Pradesh 274208',
    'short_desc': 'Awesome Destiny luxuries places for couples and family at affordable price',
    'city': 'Gorakhpur',
    'state': 'Uttar Pradesh'
}

print("Setting up file structure and content...")
print(f"Business: {business['name']}")
print(f"Location: {business['city']}, {business['state']}")
print(f"Theme colors: Primary {colors['primary']}, Secondary {colors['secondary']}")
