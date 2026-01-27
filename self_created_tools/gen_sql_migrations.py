import json

def main():
    with open('output/tactics_enriched.json', 'r', encoding='utf8') as f:
        tactics = json.load(f)

    with open('output/vulnerability_matrices.json', 'r', encoding='utf8') as f:
        vulnerabilities = json.load(f)

    with open('output/curriculum_mapping.json', 'r', encoding='utf8') as f:
        curriculum = json.load(f)

    migration_sql = """-- Migration: Tactical Intelligence Schema
-- Core tables for tactical indexing

CREATE TABLE IF NOT EXISTS tactics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  historical_validator TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mechanisms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tactic_id INTEGER NOT NULL,
  step_description TEXT NOT NULL,
  FOREIGN KEY (tactic_id) REFERENCES tactics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS counters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tactic_id INTEGER NOT NULL,
  counter_strategy TEXT NOT NULL,
  FOREIGN KEY (tactic_id) REFERENCES tactics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vulnerabilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  factor TEXT NOT NULL,
  manifestation TEXT,
  pathway TEXT,
  counter_protocol TEXT
);

CREATE TABLE IF NOT EXISTS institutional_vectors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  institution TEXT NOT NULL,
  bias_type TEXT,
  vector TEXT,
  safeguard TEXT
);

CREATE TABLE IF NOT EXISTS curriculum_mappings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tactic_id INTEGER NOT NULL,
  module_name TEXT,
  state_actor_precedent TEXT,
  criminal_network_mirror TEXT,
  digital_amplification TEXT,
  FOREIGN KEY (tactic_id) REFERENCES tactics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tactic_relationships (
  source_tactic_id INTEGER NOT NULL,
  target_tactic_id INTEGER NOT NULL,
  relationship_type TEXT CHECK(relationship_type IN ('ENABLES', 'COUNTERS', 'AMPLIFIES', 'REQUIRES', 'MIRRORS')),
  logic_rationale TEXT,
  source_evidence TEXT,
  PRIMARY KEY (source_tactic_id, target_tactic_id, relationship_type),
  FOREIGN KEY (source_tactic_id) REFERENCES tactics(id) ON DELETE CASCADE,
  FOREIGN KEY (target_tactic_id) REFERENCES tactics(id) ON DELETE CASCADE
);
"""

    seed_sql = "-- Seed data for Tactical Intelligence\n"

    # Helper for escaping and subqueries
    def escape(s):
        return s.replace("'", "''")

    def get_tactic_id(name):
        return f"(SELECT id FROM tactics WHERE name = '{escape(name)}')"

    for t in tactics:
        name = escape(t['tactic'])
        historical = escape(t.get('historicalValidator', ''))
        seed_sql += f"INSERT OR IGNORE INTO tactics (name, historical_validator) VALUES ('{name}', '{historical}');\n"

    for t in tactics:
        t_id_sub = get_tactic_id(t['tactic'])
        for mech in t.get('mechanism', []):
            seed_sql += f"INSERT INTO mechanisms (tactic_id, step_description) VALUES ({t_id_sub}, '{escape(mech)}');\n"
        for counter in t.get('counters', []):
            seed_sql += f"INSERT INTO counters (tactic_id, counter_strategy) VALUES ({t_id_sub}, '{escape(counter)}');\n"
        for rel in t.get('relatedTactics', []):
            target_id_sub = get_tactic_id(rel['target'])
            seed_sql += f"INSERT OR IGNORE INTO tactic_relationships (source_tactic_id, target_tactic_id, relationship_type, logic_rationale) VALUES ({t_id_sub}, {target_id_sub}, '{rel['type']}', '{escape(rel['rationale'])}');\n"

    for v in vulnerabilities['individual']:
        seed_sql += f"INSERT INTO vulnerabilities (factor, manifestation, pathway, counter_protocol) VALUES ('{escape(v['factor'])}', '{escape(v['manifestation'])}', '{escape(v['pathway'])}', '{escape(v['counter_protocol'])}');\n"

    for iv in vulnerabilities['institutional']:
        seed_sql += f"INSERT INTO institutional_vectors (institution, bias_type, vector, safeguard) VALUES ('{escape(iv['institution'])}', '{escape(iv['bias_type'])}', '{escape(iv['vector'])}', '{escape(iv['safeguard'])}');\n"

    for c in curriculum:
        t_id_sub = get_tactic_id(c['tactic'])
        seed_sql += f"INSERT INTO curriculum_mappings (tactic_id, module_name, state_actor_precedent, criminal_network_mirror, digital_amplification) VALUES ({t_id_sub}, '{escape(c['curriculum_module'])}', '{escape(c['state_actor_precedent'])}', '{escape(c['criminal_network_mirror'])}', '{escape(c['digital_amplification'])}');\n"

    with open('database/migrations/0002_tactical_intelligence.sql', 'w', encoding='utf8') as f:
        f.write(migration_sql)

    with open('database/seed_tactical_intelligence.sql', 'w', encoding='utf8') as f:
        f.write(seed_sql)

    print("Generated SQL migration and seed files.")

if __name__ == "__main__":
    main()
