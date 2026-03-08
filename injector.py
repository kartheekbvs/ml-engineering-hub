import glob
from bs4 import BeautifulSoup

html_files = [f for f in glob.glob('*.html') if f != 'index.html']
hook_html = '''
                    <div class="edu-next-steps">
                        ✅ <strong>Next Steps:</strong> If you want, I can also give you a "100 Most Important Concepts for AI/ML Engineers" (a compact list that interviews and advanced courses focus on).
                    </div>'''

for f in html_files:
    print(f"Reading {f}")
    with open(f, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
        
    concepts = soup.find_all('div', class_='edu-concept')
    if not concepts:
        continue
        
    for concept in concepts:
        if not concept.find('div', class_='edu-next-steps'):
            hook_soup = BeautifulSoup(hook_html, 'html.parser')
            concept.append(hook_soup)
            
    with open(f, 'w', encoding='utf-8') as file:
        file.write(str(soup))
    print(f'Successfully updated {f}')
