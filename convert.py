import bibtexparser
import json

with open('references.bib', 'r', encoding='utf-8') as bibtex_file:
    bib_database = bibtexparser.load(bibtex_file)

with open('references.json', 'w', encoding='utf-8') as json_file:
    json.dump(bib_database.entries, json_file, indent=2, ensure_ascii=False)

print(f"✓ Converted {len(bib_database.entries)} references")