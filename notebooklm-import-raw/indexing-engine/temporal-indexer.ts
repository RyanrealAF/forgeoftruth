import { ForensicNode, GraphLink, NodeType } from '../types';

export interface TemporalIndex {
  nodeTimeline: Map<string, TemporalEvent[]>;
  patternEvolution: Map<string, PatternShift[]>;
  behavioralAnomalies: Anomaly[];
}

export interface TemporalEvent {
  nodeId: string;
  timestamp: string;
  eventType: 'CREATION' | 'MODIFICATION' | 'CONNECTION' | 'ANOMALY';
  context: string;
  confidence: number;
}

export interface PatternShift {
  patternType: string;
  fromState: string;
  toState: string;
  timestamp: string;
  trigger?: string;
  confidence: number;
}

export interface Anomaly {
  nodeId: string;
  anomalyType: 'TEMPORAL' | 'BEHAVIORAL' | 'RELATIONAL';
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  evidence: string[];
}

/**
 * TEMPORAL INDEXING ENGINE
 * Tracks evolution of forensic patterns over time and identifies behavioral shifts
 */
export class TemporalIndexer {
  
  /**
   * Analyzes temporal patterns in node creation and modification
   */
  static analyzeTemporalPatterns(nodes: ForensicNode[]): TemporalIndex {
    const index: TemporalIndex = {
      nodeTimeline: new Map(),
      patternEvolution: new Map(),
      behavioralAnomalies: []
    };

    // Build timeline for each node
    nodes.forEach(node => {
      const events: TemporalEvent[] = [];
      
      // Parse date from metadata
      const dateStr = node.metadata.date;
      if (dateStr) {
        events.push({
          nodeId: node.id,
          timestamp: this.parseDate(dateStr),
          eventType: 'CREATION',
          context: `Node created with classification: ${node.metadata.classification}`,
          confidence: 1.0
        });
      }

      // Analyze content for temporal markers
      const temporalMarkers = this.extractTemporalMarkers(node.content);
      temporalMarkers.forEach(marker => {
        events.push({
          nodeId: node.id,
          timestamp: marker.date,
          eventType: 'MODIFICATION',
          context: `Content references: ${marker.context}`,
          confidence: marker.confidence
        });
      });

      index.nodeTimeline.set(node.id, events);
    });

    // Identify pattern evolution
    index.patternEvolution = this.detectPatternShifts(nodes, index.nodeTimeline);
    
    // Detect behavioral anomalies
    index.behavioralAnomalies = this.detectAnomalies(nodes, index.nodeTimeline);

    return index;
  }

  /**
   * Detects shifts in behavioral patterns over time
   */
  private static detectPatternShifts(
    nodes: ForensicNode[], 
    timeline: Map<string, TemporalEvent[]>
  ): Map<string, PatternShift[]> {
    const shifts = new Map<string, PatternShift[]>();
    
    // Analyze doctrinal evolution
    const doctrines = nodes.filter(n => n.type === NodeType.DOCTRINE);
    if (doctrines.length > 1) {
      const doctrinalShifts = this.analyzeDoctrinalEvolution(doctrines, timeline);
      shifts.set('DOCTRINAL', doctrinalShifts);
    }

    // Analyze tactical evolution
    const tactics = nodes.filter(n => n.type === NodeType.TACTIC);
    if (tactics.length > 1) {
      const tacticalShifts = this.analyzeTacticalEvolution(tactics, timeline);
      shifts.set('TACTICAL', tacticalShifts);
    }

    // Analyze profile evolution
    const profiles = nodes.filter(n => n.type === NodeType.PROFILE);
    if (profiles.length > 1) {
      const profileShifts = this.analyzeProfileEvolution(profiles, timeline);
      shifts.set('PROFILE', profileShifts);
    }

    return shifts;
  }

  /**
   * Detects temporal and behavioral anomalies
   */
  private static detectAnomalies(
    nodes: ForensicNode[],
    timeline: Map<string, TemporalEvent[]>
  ): Anomaly[] {
    const anomalies: Anomaly[] = [];

    // Check for temporal inconsistencies
    nodes.forEach(node => {
      const events = timeline.get(node.id) || [];
      const temporalAnomalies = this.detectTemporalAnomalies(node, events);
      anomalies.push(...temporalAnomalies);

      // Check for behavioral inconsistencies
      const behavioralAnomalies = this.detectBehavioralAnomalies(node);
      anomalies.push(...behavioralAnomalies);
    });

    return anomalies;
  }

  /**
   * Analyzes doctrinal evolution patterns
   */
  private static analyzeDoctrinalEvolution(
    doctrines: ForensicNode[],
    timeline: Map<string, TemporalEvent[]>
  ): PatternShift[] {
    const shifts: PatternShift[] = [];
    const sortedDoctrines = doctrines.sort((a, b) => 
      this.parseDate(a.metadata.date).localeCompare(this.parseDate(b.metadata.date))
    );

    for (let i = 1; i < sortedDoctrines.length; i++) {
      const prev = sortedDoctrines[i - 1];
      const curr = sortedDoctrines[i];
      
      // Check for doctrinal shifts
      const shift = this.detectDoctrinalShift(prev, curr);
      if (shift) {
        shifts.push(shift);
      }
    }

    return shifts;
  }

  /**
   * Detects doctrinal pattern shifts
   */
  private static detectDoctrinalShift(prev: ForensicNode, curr: ForensicNode): PatternShift | null {
    // Check for classification changes
    if (prev.metadata.classification !== curr.metadata.classification) {
      return {
        patternType: 'CLASSIFICATION_SHIFT',
        fromState: prev.metadata.classification,
        toState: curr.metadata.classification,
        timestamp: this.parseDate(curr.metadata.date),
        confidence: 0.8
      };
    }

    // Check for thematic evolution
    const newThemes = curr.themes.filter(t => !prev.themes.includes(t));
    if (newThemes.length > 0) {
      return {
        patternType: 'THEMATIC_EVOLUTION',
        fromState: prev.themes.join(', '),
        toState: curr.themes.join(', '),
        timestamp: this.parseDate(curr.metadata.date),
        trigger: `New themes: ${newThemes.join(', ')}`,
        confidence: 0.6
      };
    }

    return null;
  }

  /**
   * Extracts temporal markers from content
   */
  private static extractTemporalMarkers(content: string): Array<{date: string, context: string, confidence: number}> {
    const markers: Array<{date: string, context: string, confidence: number}> = [];
    
    // Pattern for dates (MMXXIV, MMXXIII, etc.)
    const datePattern = /(MM(?:XX(?:[IVX]+)?|XX(?:[IVX]+)?|X(?:[IVX]+)?))/gi;
    const matches = content.match(datePattern);
    
    if (matches) {
      matches.forEach(match => {
        markers.push({
          date: this.convertRomanToYear(match),
          context: `Found temporal reference: ${match}`,
          confidence: 0.9
        });
      });
    }

    // Pattern for specific dates
    const specificDatePattern = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    const dateMatches = content.match(specificDatePattern);
    
    if (dateMatches) {
      dateMatches.forEach(match => {
        markers.push({
          date: match,
          context: `Found specific date: ${match}`,
          confidence: 1.0
        });
      });
    }

    return markers;
  }

  /**
   * Converts Roman numerals to years
   */
  private static convertRomanToYear(roman: string): string {
    const romanMap: Record<string, number> = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = romanMap[roman[i]];
      const next = romanMap[roman[i + 1]];
      
      if (next && current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }

    // Convert to modern year format
    return `20${result.toString().padStart(2, '0')}`;
  }

  /**
   * Parses date strings to ISO format
   */
  private static parseDate(dateStr: string): string {
    // Handle MMXXIV format
    if (dateStr.includes('MM')) {
      const year = this.convertRomanToYear(dateStr.split('.')[0]);
      return `${year}-01-01T00:00:00Z`;
    }
    
    // Handle MMXXIV.Q1 format
    if (dateStr.includes('Q')) {
      const [yearPart, quarter] = dateStr.split('.');
      const year = this.convertRomanToYear(yearPart);
      const month = parseInt(quarter.replace('Q', '')) * 3 - 2;
      return `${year}-${month.toString().padStart(2, '0')}-01T00:00:00Z`;
    }

    // Handle MMXXIV.01 format
    if (dateStr.includes('.')) {
      const [yearPart, monthPart] = dateStr.split('.');
      const year = this.convertRomanToYear(yearPart);
      return `${year}-${monthPart.padStart(2, '0')}-01T00:00:00Z`;
    }

    return new Date().toISOString();
  }

  /**
   * Detects temporal anomalies
   */
  private static detectTemporalAnomalies(node: ForensicNode, events: TemporalEvent[]): Anomaly[] {
    const anomalies: Anomaly[] = [];

    // Check for impossible temporal sequences
    if (events.length > 1) {
      for (let i = 1; i < events.length; i++) {
        const prev = new Date(events[i - 1].timestamp);
        const curr = new Date(events[i].timestamp);
        
        if (curr < prev) {
          anomalies.push({
            nodeId: node.id,
            anomalyType: 'TEMPORAL',
            description: 'Event sequence violation detected',
            severity: 'HIGH',
            timestamp: curr.toISOString(),
            evidence: [`Previous: ${events[i - 1].context}`, `Current: ${events[i].context}`]
          });
        }
      }
    }

    return anomalies;
  }

  /**
   * Detects behavioral anomalies
   */
  private static detectBehavioralAnomalies(node: ForensicNode): Anomaly[] {
    const anomalies: Anomaly[] = [];

    // Check for inconsistent metadata
    if (node.metadata.isHighSignal && node.themes.length === 0) {
      anomalies.push({
        nodeId: node.id,
        anomalyType: 'BEHAVIORAL',
        description: 'High signal node with no thematic content',
        severity: 'MEDIUM',
        timestamp: new Date().toISOString(),
        evidence: ['Missing thematic classification for high-signal node']
      });
    }

    return anomalies;
  }

  // Placeholder methods for tactical and profile evolution
  private static analyzeTacticalEvolution(tactics: ForensicNode[], timeline: Map<string, TemporalEvent[]>): PatternShift[] {
    return []; // Implementation similar to doctrinal evolution
  }

  private static analyzeProfileEvolution(profiles: ForensicNode[], timeline: Map<string, TemporalEvent[]>): PatternShift[] {
    return []; // Implementation similar to doctrinal evolution
  }
}