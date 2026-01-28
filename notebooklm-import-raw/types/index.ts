/**
 * Core type definitions for the tactical indexing system
 */

export enum NodeType {
  DOCTRINE = 'DOCTRINE',
  THEORY = 'THEORY',
  TACTIC = 'TACTIC',
  CASE_STUDY = 'CASE_STUDY',
  PROFILE = 'PROFILE',
  SONG = 'SONG',
  PHANTOM = 'PHANTOM'
}

export enum TacticalVector {
  DEFENSIVE_PROTOCOL = 'DEFENSIVE_PROTOCOL',
  HUMINT_RECON = 'HUMINT_RECON',
  COGNITIVE_WARFARE = 'COGNITIVE_WARFARE',
  NARRATIVE_CONTROL = 'NARRATIVE_CONTROL',
  SYSTEMIC_VIOLENCE = 'SYSTEMIC_VIOLENCE'
}

export interface ForensicNode {
  id: string;
  type: NodeType;
  title: string;
  themes: string[];
  excerpt: string;
  content: string;
  metadata: NodeMetadata;
  linksTo?: string[];
}

export interface NodeMetadata {
  classification: string;
  date: string;
  vector: TacticalVector;
  anchors: string[];
  tier: number;
  recordHash: string;
  isHighSignal: boolean;
}

export interface GraphLink {
  source: string;
  target: string;
  weight: number;
  type: 'EXPLICIT' | 'MENTION' | 'SIGNATURE' | 'INFERRED';
  reasoning?: string;
}

export interface DiagnosticsReport {
  orphanCount: number;
  brokenLinks: string[];
  repairs: SynapticRepair[];
  integrityScore: number;
  totalNodes: number;
  connectionDensity: number;
  convergenceNodes: number;
}

export interface SynapticRepair {
  originalId: string;
  repairedId: string;
  confidence: number;
  sourceNodeId: string;
}

export interface QualityRecommendation {
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  action: string;
  confidence: number;
}

export interface QualityAction {
  action: string;
  category: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
}

export interface QualityTrend {
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  scoreChange: number;
  timePeriod: string;
  confidence: number;
}

export interface QualityBenchmark {
  name: string;
  description: string;
  targetScore: number;
  category: string;
}

export interface QualityComparison {
  benchmarkName: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  status: 'MEETS' | 'NEAR' | 'FAR';
}

export interface CategoryComparison {
  category: string;
  currentScore: number;
  targetScore: number;
  trend: QualityTrend;
  recommendations: QualityRecommendation[];
}