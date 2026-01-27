import json

def main():
    with open('output/raw_tactics.json', 'r', encoding='utf8') as f:
        tactics = json.load(f)

    # Pre-defined relationships based on mission brief and logical mapping
    relationships = [
        ("Misinformation Seeding", "Behavior Reframing", "ENABLES"),
        ("Behavior Reframing", "Folk Devil Construction", "ENABLES"),
        ("Civilians as Weapons", "Plausible Deniability", "ENABLES"),
        ("Breadcrumb Web", "Gaslighting", "COUNTERS"),
        ("Breadcrumb Web", "Mental Health Gaslighting", "COUNTERS"),
        ("Digital Echo Chambers and Group Think", "Folk Devil Construction", "AMPLIFIES"),
        ("Misinformation Seeding", "Digital Echo Chambers and Group Think", "AMPLIFIES"),
        ("Community Surveillance Activation", "Behavior Reframing", "REQUIRES"),
        ("Institutional Amplification", "Misinformation Seeding", "REQUIRES"),
        ("Folk Devil Construction", "Social Exclusion and Denormalization", "ENABLES"),
        ("Setup By Reaction", "Villain Casting", "ENABLES"),
        ("Tactical Pause", "Engineered Outrage", "COUNTERS"),
        ("Content as Record", "Gaslighting", "COUNTERS"),
    ]

    # Convert to a more usable format and add to tactics
    tactic_map = {t['tactic'].lower(): t for t in tactics}

    # Ensure some missing core tactics from brief are present
    core_tactics_to_ensure = ["Gaslighting", "Plausible Deniability", "Breadcrumb Web", "Tactical Pause", "Content as Record"]
    for ct in core_tactics_to_ensure:
        if ct.lower() not in tactic_map:
            tactic_map[ct.lower()] = {
                "tactic": ct,
                "mechanism": [],
                "recognitionPatterns": [],
                "historicalValidator": "",
                "counters": [],
                "relatedTactics": [],
                "sourceDocuments": ["Mission Brief"],
                "realWorldCaseStudies": []
            }

    for source, target, rel_type in relationships:
        s_low = source.lower()
        t_low = target.lower()

        if s_low in tactic_map:
            tactic_map[s_low]['relatedTactics'].append({
                "target": target,
                "type": rel_type,
                "rationale": f"{source} {rel_type} {target} based on tactical logic."
            })

    # Save enriched tactics
    with open('output/tactics_with_relations.json', 'w', encoding='utf8') as f:
        json.dump(list(tactic_map.values()), f, indent=2)

    print(f"Mapped relationships for {len(tactic_map)} tactics.")

if __name__ == "__main__":
    main()
