-- Schema for Sibling Granular Database
-- Focused on atomic storage and high-frequency retrieval

-- Atomic facts: specific, verified claims
CREATE TABLE IF NOT EXISTS atomic_facts (
  id TEXT PRIMARY KEY,
  tactic_id INTEGER,
  fact_content TEXT NOT NULL,
  confidence_score REAL DEFAULT 1.0,
  source_reference TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forensic events: timestamped occurrences with granular metadata
CREATE TABLE IF NOT EXISTS forensic_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  timestamp_recorded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  node_id TEXT,
  actor_role TEXT,
  raw_data TEXT, -- JSON blob for varied metadata
  signal_strength INTEGER CHECK(signal_strength BETWEEN 1 AND 10)
);

-- Semantic snippets: text chunks for RAG/search
CREATE TABLE IF NOT EXISTS semantic_snippets (
  id TEXT PRIMARY KEY,
  tactic_name TEXT,
  chunk_text TEXT NOT NULL,
  embedding_placeholder BLOB, -- Reserved for future vector embedding
  context_tags TEXT, -- Comma-separated tags
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid retrieval
CREATE INDEX IF NOT EXISTS idx_fact_tactic ON atomic_facts(tactic_id);
CREATE INDEX IF NOT EXISTS idx_event_type ON forensic_events(event_type);
CREATE INDEX IF NOT EXISTS idx_event_node ON forensic_events(node_id);
CREATE INDEX IF NOT EXISTS idx_snippet_tactic ON semantic_snippets(tactic_name);
