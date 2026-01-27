import json
import os
import re

def main():
    with open('output/tactics_with_relations.json', 'r', encoding='utf8') as f:
        tactics = json.load(f)

    raw_dir = 'notebooklm-import-raw'

    # Simple harvesting: look for sentences containing the tactic name or related keywords
    for tactic in tactics:
        name = tactic['tactic']
        keywords = [name.lower()]
        if 'mechanism' in tactic and tactic['mechanism']:
            keywords.extend([k.lower() for k in tactic['mechanism'][:2]])

        quotes = []
        case_studies = []

        for filename in os.listdir(raw_dir):
            if filename.endswith('.txt'):
                filepath = os.path.join(raw_dir, filename)
                with open(filepath, 'r', encoding='utf8') as f:
                    content = f.read()

                # Find quotes (rough approximation: sentences containing keywords)
                sentences = re.split(r'(?<=[.!?])\s+', content)
                for sentence in sentences:
                    sentence = sentence.strip()
                    if any(kw in sentence.lower() for kw in keywords):
                        if len(sentence) > 30 and len(sentence) < 300:
                            quotes.append(sentence)
                            if len(quotes) >= 5: break

                # Find case study snippets (paragraphs starting with "Case Study" or "Record")
                paragraphs = content.split('\n\n')
                for para in paragraphs:
                    para = para.strip()
                    if para.lower().startswith(('case study:', 'record:', 'example:')):
                        if any(kw in para.lower() for kw in keywords):
                            case_studies.append(para)
                            if len(case_studies) >= 2: break

        tactic['quotes'] = list(set(quotes))[:3]
        tactic['realWorldCaseStudies'] = list(set(case_studies))[:2]

    with open('output/tactics_enriched.json', 'w', encoding='utf8') as f:
        json.dump(tactics, f, indent=2)

    print(f"Enriched {len(tactics)} tactics with metadata.")

if __name__ == "__main__":
    main()
