import { ForensicNode, NodeType } from '../types';

export interface SemanticAnalysis {
  semanticLayers: SemanticLayer[];
  conceptDrift: ConceptDrift[];
  crossDomainKnowledge: CrossDomainLink[];
  latentPatterns: LatentPattern[];
  semanticConfidence: number;
}

export interface SemanticLayer {
  layerType: 'SURFACE' | 'CONTEXTUAL' | 'LATENT';
  concepts: SemanticConcept[];
  density: number;
  coherence: number;
  timestamp: string;
}

export interface SemanticConcept {
  conceptId: string;
  term: string;
  frequency: number;
  context: string[];
  relatedConcepts: string[];
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  confidence: number;
}

export interface ConceptDrift {
  concept: string;
  fromMeaning: string;
  toMeaning: string;
  driftType: 'SEMANTIC' | 'CONTEXTUAL' | 'SENTIMENT';
  timestamp: string;
  evidence: string[];
  confidence: number;
}

export interface CrossDomainLink {
  fromDomain: string;
  toDomain: string;
  connectionType: 'METAPHOR' | 'ANALOGY' | 'REFERENCE';
  strength: number;
  explanation: string;
  confidence: number;
}

export interface LatentPattern {
  patternId: string;
  patternType: 'RECURRING' | 'EMERGING' | 'DECLINING';
  description: string;
  nodes: string[];
  frequency: number;
  significance: number;
  timestamp: string;
}

/**
 * ADVANCED SEMANTIC ANALYZER
 * Multi-layer semantic analysis with concept drift detection and cross-domain knowledge integration
 */
export class SemanticAnalyzer {
  
  /**
   * Performs comprehensive semantic analysis across all nodes
   */
  static analyzeSemantics(nodes: ForensicNode[]): SemanticAnalysis {
    const analysis: SemanticAnalysis = {
      semanticLayers: [],
      conceptDrift: [],
      crossDomainKnowledge: [],
      latentPatterns: [],
      semanticConfidence: 0
    };

    // Analyze surface layer semantics
    const surfaceLayer = this.analyzeSurfaceSemantics(nodes);
    analysis.semanticLayers.push(surfaceLayer);

    // Analyze contextual layer semantics
    const contextualLayer = this.analyzeContextualSemantics(nodes);
    analysis.semanticLayers.push(contextualLayer);

    // Analyze latent layer semantics
    const latentLayer = this.analyzeLatentSemantics(nodes);
    analysis.semanticLayers.push(latentLayer);

    // Detect concept drift
    analysis.conceptDrift = this.detectConceptDrift(nodes, analysis.semanticLayers);

    // Identify cross-domain knowledge
    analysis.crossDomainKnowledge = this.identifyCrossDomainKnowledge(nodes);

    // Extract latent patterns
    analysis.latentPatterns = this.extractLatentPatterns(nodes);

    // Calculate overall semantic confidence
    analysis.semanticConfidence = this.calculateSemanticConfidence(analysis);

    return analysis;
  }

  /**
   * Analyzes surface-level semantic content
   */
  private static analyzeSurfaceSemantics(nodes: ForensicNode[]): SemanticLayer {
    const concepts = new Map<string, SemanticConcept>();
    
    nodes.forEach(node => {
      const terms = this.extractSurfaceTerms(node.content);
      terms.forEach(term => {
        if (concepts.has(term)) {
          const existing = concepts.get(term)!;
          existing.frequency++;
          existing.context.push(node.title);
        } else {
          concepts.set(term, {
            conceptId: `SUR_${term.replace(/\s+/g, '_').toUpperCase()}`,
            term: term,
            frequency: 1,
            context: [node.title],
            relatedConcepts: [],
            sentiment: this.analyzeSentiment(term),
            confidence: 0.8
          });
        }
      });
    });

    return {
      layerType: 'SURFACE',
      concepts: Array.from(concepts.values()),
      density: this.calculateLayerDensity(Array.from(concepts.values())),
      coherence: this.calculateLayerCoherence(Array.from(concepts.values())),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyzes contextual semantic relationships
   */
  private static analyzeContextualSemantics(nodes: ForensicNode[]): SemanticLayer {
    const concepts = new Map<string, SemanticConcept>();
    
    nodes.forEach(node => {
      const contextualTerms = this.extractContextualTerms(node.content, node.themes);
      contextualTerms.forEach(term => {
        if (concepts.has(term.term)) {
          const existing = concepts.get(term.term)!;
          existing.frequency++;
          existing.context.push(node.title);
          existing.relatedConcepts.push(...term.related);
        } else {
          concepts.set(term.term, {
            conceptId: `CTX_${term.term.replace(/\s+/g, '_').toUpperCase()}`,
            term: term.term,
            frequency: 1,
            context: [node.title],
            relatedConcepts: term.related,
            sentiment: this.analyzeSentiment(term.term),
            confidence: 0.9
          });
        }
      });
    });

    return {
      layerType: 'CONTEXTUAL',
      concepts: Array.from(concepts.values()),
      density: this.calculateLayerDensity(Array.from(concepts.values())),
      coherence: this.calculateLayerCoherence(Array.from(concepts.values())),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyzes latent semantic patterns
   */
  private static analyzeLatentSemantics(nodes: ForensicNode[]): SemanticLayer {
    const concepts = new Map<string, SemanticConcept>();
    
    // Use more sophisticated pattern matching for latent concepts
    nodes.forEach(node => {
      const latentTerms = this.extractLatentTerms(node.content);
      latentTerms.forEach(term => {
        if (concepts.has(term)) {
          const existing = concepts.get(term)!;
          existing.frequency++;
          existing.context.push(node.title);
        } else {
          concepts.set(term, {
            conceptId: `LAT_${term.replace(/\s+/g, '_').toUpperCase()}`,
            term: term,
            frequency: 1,
            context: [node.title],
            relatedConcepts: [],
            sentiment: this.analyzeSentiment(term),
            confidence: 0.6
          });
        }
      });
    });

    return {
      layerType: 'LATENT',
      concepts: Array.from(concepts.values()),
      density: this.calculateLayerDensity(Array.from(concepts.values())),
      coherence: this.calculateLayerCoherence(Array.from(concepts.values())),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Detects concept drift over time
   */
  private static detectConceptDrift(
    nodes: ForensicNode[], 
    layers: SemanticLayer[]
  ): ConceptDrift[] {
    const drifts: ConceptDrift[] = [];
    
    // Compare semantic layers to detect drift
    if (layers.length >= 2) {
      const surfaceLayer = layers.find(l => l.layerType === 'SURFACE');
      const contextualLayer = layers.find(l => l.layerType === 'CONTEXTUAL');
      
      if (surfaceLayer && contextualLayer) {
        // Look for concepts that appear in both layers with different meanings
        surfaceLayer.concepts.forEach(surfaceConcept => {
          const contextualMatch = contextualLayer.concepts.find(c => 
            c.term.toLowerCase() === surfaceConcept.term.toLowerCase()
          );
          
          if (contextualMatch && surfaceConcept.sentiment !== contextualMatch.sentiment) {
            drifts.push({
              concept: surfaceConcept.term,
              fromMeaning: surfaceConcept.context.join(', '),
              toMeaning: contextualMatch.context.join(', '),
              driftType: 'SENTIMENT',
              timestamp: new Date().toISOString(),
              evidence: [...surfaceConcept.context, ...contextualMatch.context],
              confidence: 0.7
            });
          }
        });
      }
    }

    return drifts;
  }

  /**
   * Identifies cross-domain knowledge connections
   */
  private static identifyCrossDomainKnowledge(nodes: ForensicNode[]): CrossDomainLink[] {
    const links: CrossDomainLink[] = [];
    
    // Look for metaphorical and analogical connections
    nodes.forEach(node => {
      const metaphors = this.extractMetaphors(node.content);
      const analogies = this.extractAnalogies(node.content);
      
      metaphors.forEach(metaphor => {
        links.push({
          fromDomain: metaphor.sourceDomain,
          toDomain: metaphor.targetDomain,
          connectionType: 'METAPHOR',
          strength: 0.8,
          explanation: metaphor.explanation,
          confidence: 0.9
        });
      });

      analogies.forEach(analogy => {
        links.push({
          fromDomain: analogy.sourceDomain,
          toDomain: analogy.targetDomain,
          connectionType: 'ANALOGY',
          strength: 0.7,
          explanation: analogy.explanation,
          confidence: 0.8
        });
      });
    });

    return links;
  }

  /**
   * Extracts latent patterns from content
   */
  private static extractLatentPatterns(nodes: ForensicNode[]): LatentPattern[] {
    const patterns: LatentPattern[] = [];
    
    // Look for recurring patterns across nodes
    const allContent = nodes.map(n => n.content).join(' ');
    const patternCandidates = this.findPatternCandidates(allContent);
    
    patternCandidates.forEach(candidate => {
      const nodesContaining = nodes.filter(n => n.content.includes(candidate));
      
      if (nodesContaining.length > 1) {
        patterns.push({
          patternId: `PAT_${candidate.replace(/\s+/g, '_').toUpperCase()}`,
          patternType: 'RECURRING',
          description: candidate,
          nodes: nodesContaining.map(n => n.id),
          frequency: nodesContaining.length,
          significance: this.calculatePatternSignificance(candidate, nodesContaining),
          timestamp: new Date().toISOString()
        });
      }
    });

    return patterns;
  }

  /**
   * Extracts surface-level terms from content
   */
  private static extractSurfaceTerms(content: string): string[] {
    const terms: string[] = [];
    
    // Extract capitalized terms (likely proper nouns)
    const properNouns = content.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g);
    if (properNouns) {
      terms.push(...properNouns);
    }

    // Extract quoted terms
    const quotedTerms = content.match(/"([^"]+)"/g);
    if (quotedTerms) {
      terms.push(...quotedTerms.map(q => q.replace(/"/g, '')));
    }

    return [...new Set(terms)]; // Remove duplicates
  }

  /**
   * Extracts contextual terms based on themes
   */
  private static extractContextualTerms(content: string, themes: string[]): Array<{term: string, related: string[]}> {
    const terms: Array<{term: string, related: string[]}> = [];
    
    themes.forEach(theme => {
      // Look for theme-related terms in context
      const themePattern = new RegExp(`\\b(${theme})\\b`, 'gi');
      const matches = content.match(themePattern);
      
      if (matches) {
        // Extract surrounding context
        const contextTerms = this.extractContextTerms(content, theme);
        terms.push({
          term: theme,
          related: contextTerms
        });
      }
    });

    return terms;
  }

  /**
   * Extracts latent terms using more sophisticated patterns
   */
  private static extractLatentTerms(content: string): string[] {
    const terms: string[] = [];
    
    // Look for abstract concepts
    const abstractPattern = /\b(concept|idea|principle|framework|paradigm|model)\b/gi;
    const abstractMatches = content.match(abstractPattern);
    if (abstractMatches) {
      terms.push(...abstractMatches);
    }

    // Look for psychological terms
    const psychologicalPattern = /\b(mind|brain|thought|perception|cognition|emotion)\b/gi;
    const psychMatches = content.match(psychologicalPattern);
    if (psychMatches) {
      terms.push(...psychMatches);
    }

    return [...new Set(terms)];
  }

  /**
   * Extracts metaphors from content
   */
  private static extractMetaphors(content: string): Array<{sourceDomain: string, targetDomain: string, explanation: string}> {
    const metaphors: Array<{sourceDomain: string, targetDomain: string, explanation: string}> = [];
    
    // Pattern for "X is Y" metaphors
    const metaphorPattern = /(\w+)\s+is\s+(\w+)/gi;
    let match;
    
    while ((match = metaphorPattern.exec(content)) !== null) {
      metaphors.push({
        sourceDomain: match[1],
        targetDomain: match[2],
        explanation: `Metaphorical mapping from ${match[1]} to ${match[2]}`
      });
    }

    return metaphors;
  }

  /**
   * Extracts analogies from content
   */
  private static extractAnalogies(content: string): Array<{sourceDomain: string, targetDomain: string, explanation: string}> {
    const analogies: Array<{sourceDomain: string, targetDomain: string, explanation: string}> = [];
    
    // Pattern for "X is like Y" analogies
    const analogyPattern = /(\w+)\s+is\s+like\s+(\w+)/gi;
    let match;
    
    while ((match = analogyPattern.exec(content)) !== null) {
      analogies.push({
        sourceDomain: match[1],
        targetDomain: match[2],
        explanation: `Analogical comparison between ${match[1]} and ${match[2]}`
      });
    }

    return analogies;
  }

  /**
   * Finds pattern candidates in content
   */
  private static findPatternCandidates(content: string): string[] {
    const candidates: string[] = [];
    
    // Look for repeated phrases
    const words = content.toLowerCase().split(/\W+/);
    const wordCounts = new Map<string, number>();
    
    words.forEach(word => {
      if (word.length > 3) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    });

    // Find words that appear multiple times
    wordCounts.forEach((count, word) => {
      if (count > 2) {
        candidates.push(word);
      }
    });

    return candidates;
  }

  /**
   * Extracts context terms around a given term
   */
  private static extractContextTerms(content: string, term: string): string[] {
    const contextTerms: string[] = [];
    const termIndex = content.toLowerCase().indexOf(term.toLowerCase());
    
    if (termIndex !== -1) {
      const start = Math.max(0, termIndex - 50);
      const end = Math.min(content.length, termIndex + 50);
      const context = content.substring(start, end);
      
      // Extract surrounding words
      const surroundingWords = context.match(/\b(\w{3,})\b/g);
      if (surroundingWords) {
        contextTerms.push(...surroundingWords.filter(w => w.toLowerCase() !== term.toLowerCase()));
      }
    }

    return [...new Set(contextTerms)];
  }

  /**
   * Analyzes sentiment of a term
   */
  private static analyzeSentiment(term: string): 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' {
    const positiveWords = ['good', 'great', 'excellent', 'positive', 'success', 'victory', 'win'];
    const negativeWords = ['bad', 'terrible', 'awful', 'negative', 'failure', 'defeat', 'lose'];
    
    const lowerTerm = term.toLowerCase();
    
    if (positiveWords.some(word => lowerTerm.includes(word))) {
      return 'POSITIVE';
    } else if (negativeWords.some(word => lowerTerm.includes(word))) {
      return 'NEGATIVE';
    } else {
      return 'NEUTRAL';
    }
  }

  /**
   * Calculates layer density
   */
  private static calculateLayerDensity(concepts: SemanticConcept[]): number {
    if (concepts.length === 0) return 0;
    
    const totalFrequency = concepts.reduce((sum, c) => sum + c.frequency, 0);
    return totalFrequency / concepts.length;
  }

  /**
   * Calculates layer coherence
   */
  private static calculateLayerCoherence(concepts: SemanticConcept[]): number {
    if (concepts.length === 0) return 0;
    
    // Simple coherence calculation based on related concepts
    const totalRelated = concepts.reduce((sum, c) => sum + c.relatedConcepts.length, 0);
    return totalRelated / concepts.length;
  }

  /**
   * Calculates pattern significance
   */
  private static calculatePatternSignificance(pattern: string, nodes: ForensicNode[]): number {
    const totalNodes = nodes.length;
    const patternNodes = nodes.filter(n => n.content.includes(pattern)).length;
    
    return patternNodes / totalNodes;
  }

  /**
   * Calculates overall semantic confidence
   */
  private static calculateSemanticConfidence(analysis: SemanticAnalysis): number {
    const layerConfidence = analysis.semanticLayers.reduce((sum, layer) => 
      sum + (layer.density * layer.coherence), 0) / analysis.semanticLayers.length;
    
    const driftConfidence = analysis.conceptDrift.length > 0 ? 0.8 : 1.0;
    const crossDomainConfidence = analysis.crossDomainKnowledge.length > 0 ? 0.9 : 0.5;
    const patternConfidence = analysis.latentPatterns.length > 0 ? 0.8 : 0.6;

    return (layerConfidence + driftConfidence + crossDomainConfidence + patternConfidence) / 4;
  }
}