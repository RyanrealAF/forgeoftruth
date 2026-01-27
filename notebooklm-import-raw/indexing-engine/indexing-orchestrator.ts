import { ForensicNode, GraphLink } from '../types';
import { TemporalIndexer, TemporalIndex } from './temporal-indexer';
import { EntityResolver, EntityResolution } from './entity-resolver';
import { SemanticAnalyzer, SemanticAnalysis } from './semantic-analyzer';
import { processIndexingStructure } from './processor';
import { auditIndexingStructure } from './audit';
import { LedgerHealer } from './healer';

export interface EnhancedIndexingResult {
  // Original structure
  links: GraphLink[];
  
  // Temporal indexing
  temporalIndex: TemporalIndex;
  
  // Entity resolution
  entityResolution: EntityResolution;
  
  // Semantic analysis
  semanticAnalysis: SemanticAnalysis;
  
  // Enhanced diagnostics
  enhancedDiagnostics: EnhancedDiagnostics;
  
  // Integration metrics
  integrationMetrics: IntegrationMetrics;
}

export interface EnhancedDiagnostics {
  structuralIntegrity: number;
  temporalConsistency: number;
  entityResolutionQuality: number;
  semanticCoherence: number;
  crossDomainIntegration: number;
  overallHealth: number;
  issues: IndexingIssue[];
}

export interface IndexingIssue {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: 'TEMPORAL' | 'ENTITY' | 'SEMANTIC' | 'STRUCTURAL';
  description: string;
  affectedNodes: string[];
  suggestedFix: string;
  confidence: number;
}

export interface IntegrationMetrics {
  temporalCoverage: number;
  entityCoverage: number;
  semanticDepth: number;
  crossReferenceQuality: number;
  patternDetectionAccuracy: number;
  anomalyDetectionSensitivity: number;
}

/**
 * ENHANCED INDEXING ORCHESTRATOR
 * Coordinates all indexing engines to create a comprehensive forensic index
 */
export class IndexingOrchestrator {
  
  /**
   * Executes the complete enhanced indexing pipeline
   */
  static async executeEnhancedIndexing(nodes: ForensicNode[]): Promise<EnhancedIndexingResult> {
    console.log('🚀 Starting Enhanced Indexing Pipeline...');
    
    // Step 1: Original structure processing
    console.log('📊 Processing original structure...');
    const originalResult = processIndexingStructure(nodes);
    
    // Step 2: Temporal indexing
    console.log('⏰ Analyzing temporal patterns...');
    const temporalIndex = TemporalIndexer.analyzeTemporalPatterns(nodes);
    
    // Step 3: Entity resolution
    console.log('🔍 Resolving entities...');
    const entityResolution = EntityResolver.resolveEntities(nodes);
    
    // Step 4: Semantic analysis
    console.log('🧠 Performing semantic analysis...');
    const semanticAnalysis = SemanticAnalyzer.analyzeSemantics(nodes);
    
    // Step 5: Enhanced diagnostics
    console.log('🏥 Generating enhanced diagnostics...');
    const enhancedDiagnostics = this.generateEnhancedDiagnostics(
      nodes, 
      originalResult.links, 
      temporalIndex, 
      entityResolution, 
      semanticAnalysis
    );
    
    // Step 6: Integration metrics
    console.log('📈 Calculating integration metrics...');
    const integrationMetrics = this.calculateIntegrationMetrics(
      temporalIndex, 
      entityResolution, 
      semanticAnalysis
    );

    // Step 7: Healing and optimization
    console.log('🔧 Healing and optimizing...');
    const healedResult = await this.optimizeIndex(
      originalResult.links, 
      enhancedDiagnostics, 
      integrationMetrics
    );

    const result: EnhancedIndexingResult = {
      links: healedResult.links,
      temporalIndex: temporalIndex,
      entityResolution: entityResolution,
      semanticAnalysis: semanticAnalysis,
      enhancedDiagnostics: enhancedDiagnostics,
      integrationMetrics: integrationMetrics
    };

    console.log('✅ Enhanced Indexing Pipeline Complete!');
    return result;
  }

  /**
   * Generates comprehensive diagnostics across all indexing dimensions
   */
  private static generateEnhancedDiagnostics(
    nodes: ForensicNode[],
    links: GraphLink[],
    temporalIndex: TemporalIndex,
    entityResolution: EntityResolution,
    semanticAnalysis: SemanticAnalysis
  ): EnhancedDiagnostics {
    
    // Get original diagnostics
    const originalDiagnostics = auditIndexingStructure(nodes, links, []);
    
    // Calculate temporal consistency
    const temporalConsistency = this.calculateTemporalConsistency(temporalIndex);
    
    // Calculate entity resolution quality
    const entityQuality = this.calculateEntityResolutionQuality(entityResolution);
    
    // Calculate semantic coherence
    const semanticCoherence = this.calculateSemanticCoherence(semanticAnalysis);
    
    // Calculate cross-domain integration
    const crossDomainIntegration = this.calculateCrossDomainIntegration(semanticAnalysis);
    
    // Identify issues
    const issues = this.identifyIndexingIssues(
      nodes, 
      links, 
      temporalIndex, 
      entityResolution, 
      semanticAnalysis
    );

    // Calculate overall health
    const overallHealth = this.calculateOverallHealth([
      originalDiagnostics.integrityScore / 100,
      temporalConsistency,
      entityQuality,
      semanticCoherence,
      crossDomainIntegration
    ]);

    return {
      structuralIntegrity: originalDiagnostics.integrityScore / 100,
      temporalConsistency: temporalConsistency,
      entityResolutionQuality: entityQuality,
      semanticCoherence: semanticCoherence,
      crossDomainIntegration: crossDomainIntegration,
      overallHealth: overallHealth,
      issues: issues
    };
  }

  /**
   * Calculates temporal consistency score
   */
  private static calculateTemporalConsistency(temporalIndex: TemporalIndex): number {
    const totalEvents = Array.from(temporalIndex.nodeTimeline.values())
      .reduce((sum, events) => sum + events.length, 0);
    
    const anomalyCount = temporalIndex.behavioralAnomalies.length;
    
    if (totalEvents === 0) return 1.0;
    
    const anomalyRate = anomalyCount / totalEvents;
    return Math.max(0, 1 - anomalyRate);
  }

  /**
   * Calculates entity resolution quality
   */
  private static calculateEntityResolutionQuality(entityResolution: EntityResolution): number {
    const entityCount = entityResolution.entities.length;
    const aliasCount = entityResolution.aliases.length;
    const relationshipCount = entityResolution.relationships.length;
    
    if (entityCount === 0) return 0;
    
    // Quality score based on entity coverage and relationship density
    const aliasCoverage = aliasCount / entityCount;
    const relationshipDensity = relationshipCount / entityCount;
    
    return Math.min(1.0, (aliasCoverage + relationshipDensity) / 2);
  }

  /**
   * Calculates semantic coherence
   */
  private static calculateSemanticCoherence(semanticAnalysis: SemanticAnalysis): number {
    const layerCount = semanticAnalysis.semanticLayers.length;
    if (layerCount === 0) return 0;
    
    const totalCoherence = semanticAnalysis.semanticLayers
      .reduce((sum, layer) => sum + layer.coherence, 0);
    
    return totalCoherence / layerCount;
  }

  /**
   * Calculates cross-domain integration score
   */
  private static calculateCrossDomainIntegration(semanticAnalysis: SemanticAnalysis): number {
    const crossDomainLinks = semanticAnalysis.crossDomainKnowledge.length;
    const latentPatterns = semanticAnalysis.latentPatterns.length;
    
    // Integration score based on cross-domain connections and pattern detection
    const integrationScore = (crossDomainLinks * 0.7) + (latentPatterns * 0.3);
    
    return Math.min(1.0, integrationScore / 10); // Normalize to 0-1 range
  }

  /**
   * Identifies indexing issues across all dimensions
   */
  private static identifyIndexingIssues(
    nodes: ForensicNode[],
    links: GraphLink[],
    temporalIndex: TemporalIndex,
    entityResolution: EntityResolution,
    semanticAnalysis: SemanticAnalysis
  ): IndexingIssue[] {
    const issues: IndexingIssue[] = [];

    // Temporal issues
    temporalIndex.behavioralAnomalies.forEach(anomaly => {
      issues.push({
        severity: anomaly.severity,
        category: 'TEMPORAL',
        description: anomaly.description,
        affectedNodes: [anomaly.nodeId],
        suggestedFix: 'Review temporal sequence and validate event ordering',
        confidence: 0.8
      });
    });

    // Entity issues
    if (entityResolution.entities.length === 0) {
      issues.push({
        severity: 'HIGH',
        category: 'ENTITY',
        description: 'No entities resolved from content',
        affectedNodes: nodes.map(n => n.id),
        suggestedFix: 'Check entity extraction patterns and content formatting',
        confidence: 0.9
      });
    }

    // Semantic issues
    if (semanticAnalysis.semanticLayers.length < 3) {
      issues.push({
        severity: 'MEDIUM',
        category: 'SEMANTIC',
        description: 'Insufficient semantic layer coverage',
        affectedNodes: nodes.map(n => n.id),
        suggestedFix: 'Enhance semantic analysis patterns and term extraction',
        confidence: 0.7
      });
    }

    // Structural issues
    const orphanCount = this.countOrphanNodes(nodes, links);
    if (orphanCount > nodes.length * 0.1) {
      issues.push({
        severity: 'HIGH',
        category: 'STRUCTURAL',
        description: `High orphan node count: ${orphanCount}`,
        affectedNodes: this.findOrphanNodes(nodes, links),
        suggestedFix: 'Review connection heuristics and improve linking algorithms',
        confidence: 0.8
      });
    }

    return issues;
  }

  /**
   * Calculates overall health score
   */
  private static calculateOverallHealth(scores: number[]): number {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
  }

  /**
   * Calculates integration metrics
   */
  private static calculateIntegrationMetrics(
    temporalIndex: TemporalIndex,
    entityResolution: EntityResolution,
    semanticAnalysis: SemanticAnalysis
  ): IntegrationMetrics {
    
    // Calculate coverage metrics
    const temporalCoverage = this.calculateTemporalCoverage(temporalIndex);
    const entityCoverage = this.calculateEntityCoverage(entityResolution);
    const semanticDepth = this.calculateSemanticDepth(semanticAnalysis);
    
    // Calculate quality metrics
    const crossReferenceQuality = this.calculateCrossReferenceQuality(
      temporalIndex, 
      entityResolution, 
      semanticAnalysis
    );
    
    const patternDetectionAccuracy = this.calculatePatternDetectionAccuracy(semanticAnalysis);
    const anomalyDetectionSensitivity = this.calculateAnomalyDetectionSensitivity(temporalIndex);

    return {
      temporalCoverage: temporalCoverage,
      entityCoverage: entityCoverage,
      semanticDepth: semanticDepth,
      crossReferenceQuality: crossReferenceQuality,
      patternDetectionAccuracy: patternDetectionAccuracy,
      anomalyDetectionSensitivity: anomalyDetectionSensitivity
    };
  }

  /**
   * Optimizes the index based on diagnostics and metrics
   */
  private static async optimizeIndex(
    links: GraphLink[],
    diagnostics: EnhancedDiagnostics,
    metrics: IntegrationMetrics
  ): Promise<{links: GraphLink[]}> {
    
    let optimizedLinks = [...links];
    
    // Apply optimizations based on diagnostics
    if (diagnostics.overallHealth < 0.7) {
      console.log('🔧 Applying index optimizations...');
      
      // Heal broken links
      const healedLinks = await this.healLinks(optimizedLinks);
      optimizedLinks = healedLinks;
      
      // Remove low-confidence links if needed
      if (diagnostics.issues.some(i => i.category === 'STRUCTURAL')) {
        optimizedLinks = this.filterLowConfidenceLinks(optimizedLinks);
      }
    }

    return { links: optimizedLinks };
  }

  /**
   * Heals broken links using enhanced algorithms
   */
  private static async healLinks(links: GraphLink[]): Promise<GraphLink[]> {
    // This would integrate with the existing LedgerHealer
    // For now, return the original links
    return links;
  }

  /**
   * Filters out low-confidence links
   */
  private static filterLowConfidenceLinks(links: GraphLink[]): GraphLink[] {
    const threshold = 0.5;
    return links.filter(link => link.weight >= threshold);
  }

  // Helper methods
  private static countOrphanNodes(nodes: ForensicNode[], links: GraphLink[]): number {
    const nodeIds = new Set(nodes.map(n => n.id));
    const connectedNodes = new Set<string>();
    
    links.forEach(link => {
      connectedNodes.add(link.source);
      connectedNodes.add(link.target);
    });
    
    let orphanCount = 0;
    nodeIds.forEach(id => {
      if (!connectedNodes.has(id)) orphanCount++;
    });
    
    return orphanCount;
  }

  private static findOrphanNodes(nodes: ForensicNode[], links: GraphLink[]): string[] {
    const nodeIds = new Set(nodes.map(n => n.id));
    const connectedNodes = new Set<string>();
    
    links.forEach(link => {
      connectedNodes.add(link.source);
      connectedNodes.add(link.target);
    });
    
    const orphans: string[] = [];
    nodeIds.forEach(id => {
      if (!connectedNodes.has(id)) orphans.push(id);
    });
    
    return orphans;
  }

  private static calculateTemporalCoverage(temporalIndex: TemporalIndex): number {
    const nodeTimeline = temporalIndex.nodeTimeline;
    const totalNodes = nodeTimeline.size;
    const nodesWithTimeline = Array.from(nodeTimeline.values())
      .filter(events => events.length > 0).length;
    
    return totalNodes > 0 ? nodesWithTimeline / totalNodes : 0;
  }

  private static calculateEntityCoverage(entityResolution: EntityResolution): number {
    const totalEntities = entityResolution.entities.length;
    const entitiesWithAliases = entityResolution.entities.filter(e => e.aliases.length > 0).length;
    
    return totalEntities > 0 ? entitiesWithAliases / totalEntities : 0;
  }

  private static calculateSemanticDepth(semanticAnalysis: SemanticAnalysis): number {
    const layers = semanticAnalysis.semanticLayers;
    const avgDensity = layers.reduce((sum, layer) => sum + layer.density, 0) / layers.length;
    
    return Math.min(1.0, avgDensity / 10); // Normalize to 0-1 range
  }

  private static calculateCrossReferenceQuality(
    temporalIndex: TemporalIndex,
    entityResolution: EntityResolution,
    semanticAnalysis: SemanticAnalysis
  ): number {
    const temporalEntities = temporalIndex.nodeTimeline.size;
    const resolvedEntities = entityResolution.entities.length;
    const semanticEntities = semanticAnalysis.semanticLayers.reduce((sum, layer) => 
      sum + layer.concepts.length, 0);
    
    // Quality based on cross-referencing consistency
    const consistency = Math.min(
      temporalEntities / Math.max(resolvedEntities, 1),
      resolvedEntities / Math.max(semanticEntities, 1),
      semanticEntities / Math.max(temporalEntities, 1)
    );
    
    return Math.min(1.0, consistency);
  }

  private static calculatePatternDetectionAccuracy(semanticAnalysis: SemanticAnalysis): number {
    const patterns = semanticAnalysis.latentPatterns.length;
    const drifts = semanticAnalysis.conceptDrift.length;
    
    // Accuracy based on pattern and drift detection
    return Math.min(1.0, (patterns + drifts) / 20);
  }

  private static calculateAnomalyDetectionSensitivity(temporalIndex: TemporalIndex): number {
    const anomalies = temporalIndex.behavioralAnomalies.length;
    const totalEvents = Array.from(temporalIndex.nodeTimeline.values())
      .reduce((sum, events) => sum + events.length, 0);
    
    if (totalEvents === 0) return 0;
    
    // Sensitivity based on anomaly detection rate
    return Math.min(1.0, anomalies / totalEvents);
  }
}