# Read and print the contents of references.bib
print("=== Contents of references.bib ===")
try:
    with open('references.bib', 'r', encoding='utf-8') as f:
        content = f.read()
        print(content)
        print("\n=== End of file ===")
        print(f"File length: {len(content)} characters")
        print(f"Number of '@article' found: {content.count('@article')}")
except FileNotFoundError:
    print("ERROR: references.bib not found!")
except Exception as e:
    print(f"ERROR: {e}")