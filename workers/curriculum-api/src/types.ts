export interface Env {
  VECTORIZE: VectorizeIndex;
  D1: D1Database;
  AI: Ai;
}

export interface QueryRequest {
  query: string;
  topK?: number;
  returnMetadata?: boolean;
  includeRelationships?: boolean;
}

export interface EnrichedResult {
  score: number;
  lesson: Lesson;
  relationships?: Relationship[];
  metadata: Record<string, any>;
}

export interface Lesson {
  lesson_id: number;
  lesson_number: number;
  title: string;
  tactical_application: string;
  module_id: number;
  phase_name: string;
}

export interface Relationship {
  source_concept: string;
  target_concept: string;
  relationship_type: string;
  logic_rationale: string;
}
