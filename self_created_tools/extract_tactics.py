import os
import json
import re

def extract_tactics_from_file(filepath):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()

    tactics = []

    # Pattern for Tactics in Civilians as Weapons document
    # 4.1. Misinformation Seeding
    # Tactical Introduction: ...
    # Ambiguity & Plausible Deniability: ...
    # Indicators: ...
    sections = re.split(r'\n(?=\d\.\d\.\s+)', content)
    for section in sections:
        match = re.match(r'(\d\.\d\.\s+)(.*?)\n(.*)', section, re.DOTALL)
        if match:
            title = match.group(2).strip()
            body = match.group(3).strip()

            tactic = {
                "tactic": title,
                "mechanism": [],
                "recognitionPatterns": [],
                "historicalValidator": "",
                "counters": [],
                "relatedTactics": [],
                "sourceDocuments": [os.path.basename(filepath)],
                "realWorldCaseStudies": []
            }

            # Extract mechanisms and patterns
            lines = body.split('\n')
            current_field = None
            for line in lines:
                line = line.strip()
                if not line: continue

                if 'Indicators:' in line or 'Warning signs include:' in line:
                    current_field = 'recognitionPatterns'
                    continue
                elif 'Tactical Introduction:' in line or 'Mechanism:' in line or 'Phase' in line:
                    current_field = 'mechanism'

                if current_field:
                    tactic[current_field].append(line.lstrip('- ').lstrip('• '))

            if tactic['tactic']:
                tactics.append(tactic)

    # Also look for Tactic: [Name] style
    tactic_blocks = re.split(r'\nTACTIC:\s*', content)
    for block in tactic_blocks[1:]:
        lines = block.split('\n')
        name = lines[0].strip()
        tactic = {
            "tactic": name,
            "mechanism": [],
            "recognitionPatterns": [],
            "historicalValidator": "",
            "counters": [],
            "relatedTactics": [],
            "sourceDocuments": [os.path.basename(filepath)],
            "realWorldCaseStudies": []
        }

        current_section = None
        for line in lines[1:]:
            line = line.strip()
            if not line: continue
            if line.startswith('CATEGORY:'): continue
            if line.startswith('COMPLEXITY:'): continue
            if line.startswith('OPERATIONAL MECHANICS:'):
                current_section = 'mechanism'
                continue
            if line.startswith('INDICATOR MATRIX:'):
                current_section = 'recognitionPatterns'
                continue
            if line.startswith('COUNTER-TACTICS:'):
                current_section = 'counters'
                continue
            if line.startswith('RELATED TACTICS:'):
                current_section = 'relatedTactics'
                continue

            if current_section:
                tactic[current_section].append(line.lstrip('- ').lstrip('• '))

        tactics.append(tactic)

    return tactics

def main():
    raw_dir = 'notebooklm-import-raw'
    all_tactics = []

    for filename in os.listdir(raw_dir):
        if filename.endswith('.txt'):
            filepath = os.path.join(raw_dir, filename)
            tactics = extract_tactics_from_file(filepath)
            all_tactics.extend(tactics)

    # Deduplicate and merge
    merged = {}
    for t in all_tactics:
        name = t['tactic'].lower()
        if name not in merged:
            merged[name] = t
        else:
            merged[name]['mechanism'].extend(t['mechanism'])
            merged[name]['recognitionPatterns'].extend(t['recognitionPatterns'])
            merged[name]['sourceDocuments'].extend(t['sourceDocuments'])
            merged[name]['mechanism'] = list(set(merged[name]['mechanism']))
            merged[name]['recognitionPatterns'] = list(set(merged[name]['recognitionPatterns']))
            merged[name]['sourceDocuments'] = list(set(merged[name]['sourceDocuments']))

    with open('output/raw_tactics.json', 'w', encoding='utf8') as f:
        json.dump(list(merged.values()), f, indent=2)

    print(f"Extracted {len(merged)} unique tactics to output/raw_tactics.json")

if __name__ == "__main__":
    main()
