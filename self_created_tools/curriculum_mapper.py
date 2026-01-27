import json
import re

def main():
    # Load extracted tactics
    with open('output/tactics_with_relations.json', 'r', encoding='utf8') as f:
        tactics = json.load(f)

    # Mapping logic based on archive.ts and doctrine
    # Mapping state-actor precedents and criminal network mirrors as required in Phase 3
    mapping = []

    for t in tactics:
        name = t['tactic'].lower()
        map_entry = {
            "tactic": t['tactic'],
            "curriculum_module": "Unknown",
            "state_actor_precedent": "N/A",
            "criminal_network_mirror": "N/A",
            "digital_amplification": "N/A"
        }

        if "civilians as weapons" in name or "civilian weaponization" in name:
            map_entry["curriculum_module"] = "Volume II: Operational - Multi-Actor Coordination"
            map_entry["state_actor_precedent"] = "Stasi Zersetzung doctrine"
            map_entry["criminal_network_mirror"] = "Cartel informant networks"
            map_entry["digital_amplification"] = "Nextdoor/WhatsApp neighborhood alerts"
        elif "gaslighting" in name:
            map_entry["curriculum_module"] = "Volume I: Foundational - Reality Distortion"
            map_entry["state_actor_precedent"] = "COINTELPRO 'Black Bag' jobs"
            map_entry["criminal_network_mirror"] = "Cult isolation tactics"
            map_entry["digital_amplification"] = "Social media feigned shock and moral outrage"
        elif "misinformation seeding" in name:
            map_entry["curriculum_module"] = "Volume II: Operational - Narrative Warfare"
            map_entry["state_actor_precedent"] = "Operation Mockingbird"
            map_entry["criminal_network_mirror"] = "Street-level rumor dusting"
            map_entry["digital_amplification"] = "Algorithmic echo chambers"
        elif "breadcrumb web" in name:
            map_entry["curriculum_module"] = "Volume I: Foundational - Defensive Framework"
            map_entry["state_actor_precedent"] = "Forensic intelligence gathering"
            map_entry["criminal_network_mirror"] = "Counter-surveillance logs"
            map_entry["digital_amplification"] = "Timestamped digital metadata"

        mapping.append(map_entry)

    with open('output/curriculum_mapping.json', 'w', encoding='utf8') as f:
        json.dump(mapping, f, indent=2)

    print(f"Mapped {len(mapping)} tactics to curriculum.")

if __name__ == "__main__":
    main()
