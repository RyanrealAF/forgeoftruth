-- Migration: Tactical Intelligence Schema
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
