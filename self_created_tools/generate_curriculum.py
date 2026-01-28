import json
import os

def generate_curriculum():
    manifest_path = 'output/tactics_manifest.json'
    mapping_path = 'output/curriculum_mapping.json'

    if not os.path.exists(manifest_path) or not os.path.exists(mapping_path):
        print("Manifest or mapping not found")
        return

    with open(manifest_path, 'r') as f:
        manifest = json.load(f)

    with open(mapping_path, 'r') as f:
        mapping = json.load(f)

    mapping_dict = {m['tactic']: m for m in mapping}

    lessons = []
    for i, item in enumerate(manifest, 1):
        tactic_name = item['tactic']
        m_info = mapping_dict.get(tactic_name, {})

        lesson = {
            "id": f"L{i:02d}",
            "title": tactic_name,
            "tacticalConcept": item['mechanism'][0] if item['mechanism'] else "No concept defined",
            "historicalValidator": m_info.get('state_actor_precedent', item.get('historicalValidator', 'N/A')),
            "phase": m_info.get('curriculum_module', 'Unknown'),
            "moduleId": i # Just a dummy ID
        }
        lessons.append(lesson)

    curriculum = {"lessons": lessons}

    with open('data/curriculum.json', 'w') as f:
        json.dump(curriculum, f, indent=2)
    print(f"Generated data/curriculum.json with {len(lessons)} lessons")

if __name__ == "__main__":
    generate_curriculum()
