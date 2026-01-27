import json

def main():
    with open('output/tactics_enriched.json', 'r', encoding='utf8') as f:
        tactics = json.load(f)

    # 1. JSON Manifest (already mostly there, but we'll make a clean one for the site)
    with open('output/tactics_manifest.json', 'w', encoding='utf8') as f:
        json.dump(tactics, f, indent=2)

    # 2. Markdown Glossary
    glossary = "# Tactical Intelligence Glossary\n\n"
    glossary += "This glossary documents the mechanical DNA of manipulation tactics.\n\n"

    for t in tactics:
        glossary += f"## {t['tactic']}\n\n"
        if t.get('mechanism'):
            glossary += "### Mechanism\n"
            for step in t['mechanism']:
                glossary += f"- {step}\n"
            glossary += "\n"

        if t.get('recognitionPatterns'):
            glossary += "### Recognition Patterns\n"
            for pattern in t['recognitionPatterns']:
                glossary += f"- {pattern}\n"
            glossary += "\n"

        if t.get('relatedTactics'):
            glossary += "### Relational Logic\n"
            for rel in t['relatedTactics']:
                glossary += f"- **{rel['type']}**: {rel['target']} ({rel['rationale']})\n"
            glossary += "\n"

        if t.get('quotes'):
            glossary += "### Source Evidence\n"
            for quote in t['quotes']:
                glossary += f"> \"{quote}\"\n\n"

        glossary += "---\n\n"

    with open('output/tactical_glossary.md', 'w', encoding='utf8') as f:
        f.write(glossary)

    # 3. Mermaid Graph Visualization
    mermaid = "graph TD\n"
    for t in tactics:
        # Sanitize name for Mermaid
        t_name = t['tactic'].replace(" ", "_").replace("-", "_").replace("(", "").replace(")", "").replace("\"", "")
        for rel in t.get('relatedTactics', []):
            target_name = rel['target'].replace(" ", "_").replace("-", "_").replace("(", "").replace(")", "").replace("\"", "")
            mermaid += f"  {t_name} -- {rel['type']} --> {target_name}\n"

    with open('output/tactic_network.mermaid', 'w', encoding='utf8') as f:
        f.write(mermaid)

    print("Generated site assets: tactics_manifest.json, tactical_glossary.md, tactic_network.mermaid")

if __name__ == "__main__":
    main()
