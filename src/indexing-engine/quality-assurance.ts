import { ForensicNode, NodeType, GraphLink } from '../types';
import { QualityStandards } from './quality-standards';
import { QualityScoring, ContentQualityReport, QualityRecommendation, QualityTrend, QualityBenchmark } from './quality-scoring';
import { IndexingOrchestrator, EnhancedIndexingResult } from './indexing-orchestrator';

/**
 * AUTOMATED QUALITY ASSURANCE PIPELINE
 * Integrates quality checks into the existing indexing pipeline
 */
export class QualityAssurancePipeline {
  
  /**
   * Executes quality assurance pipeline for a set of nodes
   */
  static async executeQualityPipeline(nodes: ForensicNode[]): Promise<QualityPipelineResult> {
    console.log('🔍 Starting Quality Assurance Pipeline...');
    
    // Step 1: Quality Pre-Processing
    console.log('📋 Pre-processing quality validation...');
    const preProcessedResult = await this.preProcessQualityValidation(nodes);
    
    // Step 2: Enhanced Indexing with Quality Integration
    console.log('🔗 Executing enhanced indexing with quality checks...');
    const indexingResult = await IndexingOrchestrator.executeEnhancedIndexing(preProcessedResult.nodes);
    
    // Step 3: Post-Indexing Quality Assessment
    console.log('📊 Performing post-indexing quality assessment...');
    const qualityAssessment = this.performPostIndexingQualityAssessment(
      preProcessedResult.nodes, 
      indexingResult.links
    );
    
    // Step 4: Quality Trend Analysis
    console.log('📈 Analyzing quality trends...');
    const trendAnalysis = this.analyzeQualityTrends(qualityAssessment.reports);
    
    // Step 5: Quality Optimization Recommendations
    console.log('💡 Generating optimization recommendations...');
    const optimizationRecommendations = this.generateOptimizationRecommendations(
      qualityAssessment.reports, 
      indexingResult.enhancedDiagnostics
    );

    const result: QualityPipelineResult = {
      preProcessedNodes: preProcessedResult.nodes,
      indexingResult: indexingResult,
      qualityAssessment: qualityAssessment,
      trendAnalysis: trendAnalysis,
      optimizationRecommendations: optimizationRecommendations,
      pipelineMetrics: {
        totalNodes: nodes.length,
        processedNodes: preProcessedResult.nodes.length,
        qualityChecks: qualityAssessment.reports.length,
        issuesFound: qualityAssessment.totalIssues,
        recommendationsGenerated: optimizationRecommendations.length,
        processingTime: Date.now()
      }
    };

    console.log('✅ Quality Assurance Pipeline Complete!');
    return result;
  }

  /**
   * Pre-processes nodes with quality validation
   */
  private static async preProcessQualityValidation(nodes: ForensicNode[]): Promise<PreProcessingResult> {
    const validatedNodes: ForensicNode[] = [];
    const qualityReports: ContentQualityReport[] = [];
    const issues: QualityIssue[] = [];
    const suggestions: QualitySuggestion[] = [];

    for (const node of nodes) {
      // Calculate quality score
      const qualityReport = QualityScoring.calculateQualityScore(node);
      qualityReports.push(qualityReport);
      
      // Collect issues and suggestions
      issues.push(...qualityReport.issues);
      suggestions.push(...qualityReport.suggestions);

      // Apply quality-based filtering
      if (qualityReport.overallScore >= 0.5) {
        // Node meets minimum quality threshold
        validatedNodes.push(node);
      } else {
        console.warn(`Node ${node.id} rejected due to low quality score: ${qualityReport.overallScore}`);
      }
    }

    return {
      nodes: validatedNodes,
      qualityReports: qualityReports,
      issues: issues,
      suggestions: suggestions
    };
  }

  /**
   * Performs post-indexing quality assessment
   */
  private static performPostIndexingQualityAssessment(
    nodes: ForensicNode[], 
    links: GraphLink[]
  ): QualityAssessment {
    const reports: ContentQualityReport[] = [];
    const linkQualityIssues: LinkQualityIssue[] = [];
    const structuralIssues: StructuralQualityIssue[] = [];

    // Generate quality reports for all processed nodes
    nodes.forEach(node => {
      const report = QualityScoring.calculateQualityScore(node);
      reports.push(report);
    });

    // Assess link quality
    const linkQuality = this.assessLinkQuality(links, nodes);
    linkQualityIssues.push(...linkQuality.issues);

    // Assess structural quality
    const structuralQuality = this.assessStructuralQuality(nodes, links);
    structuralIssues.push(...structuralQuality.issues);

    // Calculate aggregate metrics
    const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0) + 
                       linkQualityIssues.length + structuralIssues.length;

    return {
      reports: reports,
      linkQualityIssues: linkQualityIssues,
      structuralIssues: structuralIssues,
      aggregateMetrics: {
        averageQualityScore: this.calculateAverageQualityScore(reports),
        qualityDistribution: this.calculateQualityDistribution(reports),
        issueSeverityBreakdown: this.calculateIssueSeverityBreakdown(reports),
        totalIssues: totalIssues
      }
    };
  }

  /**
   * Assesses link quality
   */
  private static assessLinkQuality(links: GraphLink[], nodes: ForensicNode[]): LinkQualityAssessment {
    const issues: LinkQualityIssue[] = [];
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    links.forEach(link => {
      const sourceNode = nodeMap.get(link.source);
      const targetNode = nodeMap.get(link.target);

      if (!sourceNode || !targetNode) {
        issues.push({
          type: 'BROKEN_LINK',
          severity: 'HIGH',
          description: `Broken link from ${link.source} to ${link.target}`,
          link: link,
          evidence: ['Target node does not exist in the index']
        });
        return;
      }

      // Check for semantic relevance
      const sharedThemes = sourceNode.themes.filter(theme => 
        targetNode.themes.includes(theme)
      );

      if (sharedThemes.length === 0 && link.weight < 0.8) {
        issues.push({
          type: 'LOW_RELEVANCE_LINK',
          severity: 'MEDIUM',
          description: `Low relevance link between ${sourceNode.title} and ${targetNode.title}`,
          link: link,
          evidence: ['No shared themes detected']
        });
      }

      // Check for circular references
      if (link.source === link.target) {
        issues.push({
          type: 'SELF_REFERENCE',
          severity: 'LOW',
          description: `Self-referential link detected in ${sourceNode.title}`,
          link: link,
          evidence: ['Node links to itself']
        });
      }
    });

    return { issues };
  }

  /**
   * Assesses structural quality
   */
  private static assessStructuralQuality(nodes: ForensicNode[], links: GraphLink[]): StructuralQualityAssessment {
    const issues: StructuralQualityIssue[] = [];
    const nodeIds = new Set(nodes.map(n => n.id));
    const connectedNodes = new Set<string>();

    // Track connected nodes
    links.forEach(link => {
      connectedNodes.add(link.source);
      connectedNodes.add(link.target);
    });

    // Find orphan nodes
    const orphanNodes = nodes.filter(n => !connectedNodes.has(n.id));
    if (orphanNodes.length > 0) {
      issues.push({
        type: 'ORPHAN_NODES',
        severity: 'MEDIUM',
        description: `${orphanNodes.length} orphan nodes detected`,
        nodeIds: orphanNodes.map(n => n.id),
        evidence: ['Nodes not connected to the main graph structure']
      });
    }

    // Check for isolated clusters
    const clusters = this.findConnectedClusters(nodes, links);
    if (clusters.length > 1) {
      issues.push({
        type: 'ISOLATED_CLUSTERS',
        severity: 'LOW',
        description: `${clusters.length} isolated clusters detected`,
        clusterCount: clusters.length,
        evidence: ['Content graph has disconnected components']
      });
    }

    // Check for excessive connectivity
    const connectivityMap = new Map<string, number>();
    links.forEach(link => {
      connectivityMap.set(link.source, (connectivityMap.get(link.source) || 0) + 1);
      connectivityMap.set(link.target, (connectivityMap.get(link.target) || 0) + 1);
    });

    const highlyConnected = Array.from(connectivityMap.entries())
      .filter(([_, count]) => count > 20)
      .map(([id, _]) => id);

    if (highlyConnected.length > 0) {
      issues.push({
        type: 'EXCESSIVE_CONNECTIVITY',
        severity: 'LOW',
        description: `${highlyConnected.length} nodes have excessive connectivity`,
        nodeIds: highlyConnected,
        evidence: ['Nodes have more than 20 connections']
      });
    }

    return { issues };
  }

  /**
   * Finds connected clusters in the graph
   */
  private static findConnectedClusters(nodes: ForensicNode[], links: GraphLink[]): string[][] {
    const graph = new Map<string, string[]>();
    nodes.forEach(n => graph.set(n.id, []));
    links.forEach(link => {
      graph.get(link.source)!.push(link.target);
      graph.get(link.target)!.push(link.source);
    });

    const visited = new Set<string>();
    const clusters: string[][] = [];

    nodes.forEach(node => {
      if (!visited.has(node.id)) {
        const cluster: string[] = [];
        this.dfsCluster(node.id, graph, visited, cluster);
        clusters.push(cluster);
      }
    });

    return clusters;
  }

  /**
   * Depth-first search for cluster detection
   */
  private static dfsCluster(nodeId: string, graph: Map<string, string[]>, visited: Set<string>, cluster: string[]) {
    if (visited.has(nodeId)) return;
    
    visited.add(nodeId);
    cluster.push(nodeId);
    
    const neighbors = graph.get(nodeId) || [];
    neighbors.forEach(neighbor => {
      this.dfsCluster(neighbor, graph, visited, cluster);
    });
  }

  /**
   * Analyzes quality trends
   */
  private static analyzeQualityTrends(reports: ContentQualityReport[]): QualityTrend {
    // For now, return a basic trend analysis
    // In a real implementation, this would analyze historical data
    const avgScore = this.calculateAverageQualityScore(reports);
    
    return {
      trend: avgScore > 0.8 ? 'IMPROVING' : avgScore > 0.6 ? 'STABLE' : 'DECLINING',
      direction: 'FLAT',
      change: 0,
      confidence: 0.8,
      reports: reports
    };
  }

  /**
   * Generates optimization recommendations
   */
  private static generateOptimizationRecommendations(
    reports: ContentQualityReport[], 
    diagnostics: any
  ): QualityRecommendation[] {
    const recommendations: QualityRecommendation[] = [];
    
    // Analyze overall quality issues
    const criticalIssues = reports.flatMap(r => r.issues).filter(i => i.severity === 'CRITICAL');
    const highIssues = reports.flatMap(r => r.issues).filter(i => i.severity === 'HIGH');
    
    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        category: 'IMMEDIATE_ACTION',
        description: `${criticalIssues.length} critical quality issues require immediate attention`,
        actions: [{
          action: 'Address all critical quality issues before proceeding',
          impact: 'Prevents propagation of low-quality content'
        }]
      });
    }

    if (highIssues.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'QUALITY_IMPROVEMENT',
        description: `${highIssues.length} high-priority quality improvements identified`,
        actions: [{
          action: 'Implement quality improvement recommendations',
          impact: 'Significant quality enhancement'
        }]
      });
    }

    // Add diagnostic-based recommendations
    if (diagnostics && diagnostics.issues) {
      const diagnosticIssues = diagnostics.issues.filter((issue: any) => issue.severity === 'HIGH');
      if (diagnosticIssues.length > 0) {
        recommendations.push({
          priority: 'MEDIUM',
          category: 'SYSTEM_OPTIMIZATION',
          description: 'System-level quality issues detected',
          actions: [{
            action: 'Review and optimize system diagnostics',
            impact: 'Improves overall system quality'
          }]
        });
      }
    }

    return recommendations;
  }

  /**
   * Calculates average quality score
   */
  private static calculateAverageQualityScore(reports: ContentQualityReport[]): number {
    if (reports.length === 0) return 0;
    const totalScore = reports.reduce((sum, r) => sum + r.overallScore, 0);
    return totalScore / reports.length;
  }

  /**
   * Calculates quality distribution
   */
  private static calculateQualityDistribution(reports: ContentQualityReport[]): QualityDistribution {
    const distribution: QualityDistribution = {
      excellent: reports.filter(r => r.overallScore >= 0.9).length,
      good: reports.filter(r => r.overallScore >= 0.7 && r.overallScore < 0.9).length,
      fair: reports.filter(r => r.overallScore >= 0.5 && r.overallScore < 0.7).length,
      poor: reports.filter(r => r.overallScore < 0.5).length
    };
    return distribution;
  }

  /**
   * Calculates issue severity breakdown
   */
  private static calculateIssueSeverityBreakdown(reports: ContentQualityReport[]): IssueBreakdown {
    const allIssues = reports.flatMap(r => r.issues);
    return {
      critical: allIssues.filter(i => i.severity === 'CRITICAL').length,
      high: allIssues.filter(i => i.severity === 'HIGH').length,
      medium: allIssues.filter(i => i.severity === 'MEDIUM').length,
      low: allIssues.filter(i => i.severity === 'LOW').length
    };
  }
}

// Type definitions for quality assurance pipeline
export interface QualityPipelineResult {
  preProcessedNodes: ForensicNode[];
  indexingResult: EnhancedIndexingResult;
  qualityAssessment: QualityAssessment;
  trendAnalysis: QualityTrend;
  optimizationRecommendations: QualityRecommendation[];
  pipelineMetrics: PipelineMetrics;
}

export interface PreProcessingResult {
  nodes: ForensicNode[];
  qualityReports: ContentQualityReport[];
  issues: QualityIssue[];
  suggestions: QualitySuggestion[];
}

export interface QualityAssessment {
  reports: ContentQualityReport[];
  linkQualityIssues: LinkQualityIssue[];
  structuralIssues: StructuralQualityIssue[];
  aggregateMetrics: AggregateQualityMetrics;
}

export interface LinkQualityIssue {
  type: 'BROKEN_LINK' | 'LOW_RELEVANCE_LINK' | 'SELF_REFERENCE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  link: GraphLink;
  evidence: string[];
}

export interface StructuralQualityIssue {
  type: 'ORPHAN_NODES' | 'ISOLATED_CLUSTERS' | 'EXCESSIVE_CONNECTIVITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  nodeIds?: string[];
  clusterCount?: number;
  evidence: string[];
}

export interface LinkQualityAssessment {
  issues: LinkQualityIssue[];
}

export interface StructuralQualityAssessment {
  issues: StructuralQualityIssue[];
}

export interface AggregateQualityMetrics {
  averageQualityScore: number;
  qualityDistribution: QualityDistribution;
  issueSeverityBreakdown: IssueBreakdown;
  totalIssues: number;
}

export interface QualityDistribution {
  excellent: number;
  good: number;
  fair: number;
  poor: number;
}

export interface IssueBreakdown {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface PipelineMetrics {
  totalNodes: number;
  processedNodes: number;
  qualityChecks: number;
  issuesFound: number;
  recommendationsGenerated: number;
  processingTime: number;
}

// Quality benchmark definitions
export const DEFAULT_QUALITY_BENCHMARK: QualityBenchmark = {
  name: 'Tactical Content Standard',
  targetScore: 0.8,
  categoryTargets: {
    'ACCURACY': 0.85,
    'COMPLETENESS': 0.8,
    'CONSISTENCY': 0.85,
    'RELEVANCE': 0.75,
    'STRUCTURE': 0.8
  },
  description: 'Standard quality benchmark for tactical content'
};