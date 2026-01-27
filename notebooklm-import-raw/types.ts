
export enum NodeType {
  DOCTRINE = 'DOCTRINE',
  TACTIC = 'TACTIC',
  PROFILE = 'PROFILE',
  CASE_STUDY = 'CASE_STUDY',
  SONG = 'SONG',
  THEORY = 'THEORY'
}

export enum TacticalVector {
  DEFENSIVE_PROTOCOL = 'DEFENSIVE_PROTOCOL',
  HUMINT_RECON = 'HUMINT_RECON',
  NEUROBIOLOGY = 'NEUROBIOLOGY',
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
  metadata: {
    classification: string;
    date: string;
    vector: TacticalVector | string;
    anchors: string[];
    tier: number;
    recordHash: string;
    isHighSignal?: boolean;
  };
  linksTo?: string[];
}

export interface GraphLink {
  source: string;
  target: string;
  weight: number;
  type?: string;
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

export interface IndexingResult {
  links: GraphLink[];
}

export interface NeuralDiscoveryResult {
  suggestedNodes: ForensicNode[];
  suggestedLinks: GraphLink[];
  confidence: number;
}
