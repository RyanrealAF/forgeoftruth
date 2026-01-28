-- Cloudflare D1 Database Schema for Tactical Curriculum Index
-- Fractal structure for 120-lesson curriculum

-- Create modules table for curriculum phases
CREATE TABLE IF NOT EXISTS modules (
  id TEXT PRIMARY KEY,
  sequence INTEGER NOT NULL,
  title TEXT NOT NULL,
  phase TEXT NOT NULL CHECK(phase IN ('DOCTRINE', 'REFLECTION', 'ENDGAME')),
  focus TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create lessons table for individual tactical concepts
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  sequence INTEGER NOT NULL,
  title TEXT NOT NULL,
  tactical_concept TEXT NOT NULL,
  historical_validator TEXT NOT NULL,
  content_json TEXT,
  difficulty_level INTEGER DEFAULT 1,
  estimated_duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- Create index for faster module lookups
CREATE INDEX IF NOT EXISTS idx_module_sequence ON modules(sequence);
CREATE INDEX IF NOT EXISTS idx_module_phase ON modules(phase);

-- Create indexes for lesson lookups
CREATE INDEX IF NOT EXISTS idx_lesson_module ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lesson_sequence ON lessons(module_id, sequence);
CREATE INDEX IF NOT EXISTS idx_lesson_concept ON lessons(tactical_concept);

-- Create table for lesson progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP,
  notes TEXT,
  PRIMARY KEY (user_id, lesson_id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- Create table for tactical references and sources
CREATE TABLE IF NOT EXISTS tactical_references (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  reference_type TEXT NOT NULL CHECK(reference_type IN ('BOOK', 'ARTICLE', 'VIDEO', 'AUDIO', 'CASE_STUDY')),
  title TEXT NOT NULL,
  author TEXT,
  source_url TEXT,
  publication_date TEXT,
  description TEXT,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Create index for reference lookups
CREATE INDEX IF NOT EXISTS idx_reference_lesson ON tactical_references(lesson_id);
CREATE INDEX IF NOT EXISTS idx_reference_type ON tactical_references(reference_type);

-- Create table for lesson content storage
CREATE TABLE IF NOT EXISTS lesson_content (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'markdown',
  content_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Create index for lesson content lookups
CREATE INDEX IF NOT EXISTS idx_lesson_content_lesson ON lesson_content(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_content_type ON lesson_content(content_type);
