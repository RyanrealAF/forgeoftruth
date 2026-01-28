import { ForensicNode, NodeType, QualityRecommendation, QualityAction, QualityTrend, QualityBenchmark, QualityComparison, CategoryComparison } from '../types';
import { ValidationFramework } from './validation-framework';
import { TemporalIndexer } from './temporal-indexer';
import { EntityResolver } from './entity-resolver';
import { SemanticAnalyzer } from './semantic-analyzer';

/**
 * COMPREHENSIVE MONITORING DASHBOARD
 * Real-time monitoring and reporting system for content quality standards
 */
export class MonitoringDashboard {
  
  /**
   * Generates comprehensive quality dashboard for content analysis
   */
  static async generateDashboard(nodes: ForensicNode[]): Promise<QualityDashboard> {
    console.log(`📊 Generating quality dashboard for ${nodes.length} nodes...`);
    
    // Execute comprehensive analysis
    const validationResults = await this.executeValidationBatch(nodes);
    const temporalAnalysis = TemporalIndexer.analyzeTemporalPatterns(nodes);
    const entityAnalysis = EntityResolver.resolveEntities(nodes);
    const semanticAnalysis = SemanticAnalyzer.analyzeSemantics(nodes);
    
    // Calculate aggregate metrics
    const aggregateMetrics = this.calculateAggregateMetrics(validationResults);
    const trendAnalysis = this.analyzeTrends(nodes, temporalAnalysis, entityAnalysis, semanticAnalysis);
    const benchmarkAnalysis = this.analyzeBenchmarks(nodes, aggregateMetrics);
    
    // Generate actionable insights
    const insights = this.generateInsights(validationResults, aggregateMetrics, trendAnalysis);
    const recommendations = this.aggregateRecommendations(validationResults);
    
    const dashboard: QualityDashboard = {
      summary: {
        totalNodes: nodes.length,
        averageScore: aggregateMetrics.averageScore,
        complianceRate: aggregateMetrics.complianceRate,
        criticalIssues: aggregateMetrics.criticalIssues,
        lastUpdated: new Date().toISOString()
      },
      metrics: aggregateMetrics,
      trends: trendAnalysis,
      benchmarks: benchmarkAnalysis,
      insights: insights,
      recommendations: recommendations,
      detailedResults: validationResults,
      enhancedAnalysis: {
        temporalIntegrity: temporalAnalysis,
        entityResolution: entityAnalysis,
        semanticCoherence: semanticAnalysis
      },
      timestamp: new Date().toISOString()
    };

    console.log(`✅ Dashboard generated: ${nodes.length} nodes analyzed`);
    return dashboard;
  }

  /**
   * Executes batch validation for all nodes
   */
  private static async executeValidationBatch(nodes: ForensicNode[]): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    for (const node of nodes) {
      try {
        const validation = await ValidationFramework.validateContent(node);
        results.push({
          nodeId: node.id,
          title: node.title,
          contentType: node.type,
          score: validation.overallScore,
          confidence: validation.confidence,
          passed: validation.overallScore >= 0.7,
          issues: this.extractIssues(validation),
          recommendations: validation.recommendations,
          timestamp: validation.timestamp
        });
      } catch (error) {
        console.error(`❌ Validation failed for ${node.id}:`, error);
        results.push({
          nodeId: node.id,
          title: node.title,
          contentType: node.type,
          score: 0,
          confidence: 0,
          passed: false,
          issues: [{ severity: 'CRITICAL', category: 'VALIDATION_ERROR', description: 'Validation failed', evidence: [String(error)] }],
          recommendations: [],
          timestamp: new Date().toISOString()
        });
      }
    }

    return results;
  }

  /**
   * Calculates aggregate quality metrics
   */
  private static calculateAggregateMetrics(results: ValidationResult[]): AggregateMetrics {
    const totalNodes = results.length;
    const passedNodes = results.filter(r => r.passed).length;
    const criticalIssues = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'CRITICAL').length, 0);
    const highIssues = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'HIGH').length, 0);
    
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / totalNodes;
    const complianceRate = totalNodes > 0 ? passedNodes / totalNodes : 0;
    
    const scoreDistribution = {
      excellent: results.filter(r => r.score >= 0.9).length,
      good: results.filter(r => r.score >= 0.8 && r.score < 0.9).length,
      fair: results.filter(r => r.score >= 0.7 && r.score < 0.8).length,
      poor: results.filter(r => r.score < 0.7).length
    };

    const contentTypes = Object.values(NodeType).map(type => ({
      type: type,
      count: results.filter(r => r.contentType === type).length,
      averageScore: this.calculateTypeAverage(results, type)
    }));

    return {
      totalNodes,
      passedNodes,
      failedNodes: totalNodes - passedNodes,
      averageScore,
      complianceRate,
      criticalIssues,
      highIssues,
      scoreDistribution,
      contentTypes,
      qualityHealth: this.calculateQualityHealth(averageScore, complianceRate, criticalIssues)
    };
  }

  /**
   * Analyzes quality trends over time and across content types
   */
  private static analyzeTrends(nodes: ForensicNode[], temporalAnalysis: any, entityAnalysis: any, semanticAnalysis: any): TrendAnalysis {
    const trends: QualityTrend[] = [];
    
    // Content type trends
    Object.values(NodeType).forEach(type => {
      const typeNodes = nodes.filter(n => n.type === type);
      if (typeNodes.length > 0) {
        const typeScores = typeNodes.map(n => n.metadata.tier / 3); // Simplified scoring
        const avgScore = typeScores.reduce((sum, score) => sum + score, 0) / typeScores.length;
        
        trends.push({
          trend: avgScore > 0.7 ? 'IMPROVING' : avgScore > 0.5 ? 'STABLE' : 'DECLINING',
          scoreChange: avgScore - 0.5,
          timePeriod: 'Content Analysis',
          confidence: 0.8
        });
      }
    });

    // Temporal trends
    if (temporalAnalysis.behavioralAnomalies.length > 0) {
      trends.push({
        trend: 'DECLINING',
        scoreChange: -0.1,
        timePeriod: 'Temporal Analysis',
        confidence: 0.9
      });
    }

    // Semantic trends
    if (semanticAnalysis.semanticConfidence > 0.8) {
      trends.push({
        trend: 'IMPROVING',
        scoreChange: 0.1,
        timePeriod: 'Semantic Analysis',
        confidence: 0.85
      });
    }

    return {
      overallTrend: this.determineOverallTrend(trends),
      contentTrends: trends,
      riskIndicators: this.identifyRiskIndicators(temporalAnalysis, entityAnalysis, semanticAnalysis),
      improvementOpportunities: this.identifyImprovementOpportunities(trends)
    };
  }

  /**
   * Analyzes benchmarks and compliance levels
   */
  private static analyzeBenchmarks(nodes: ForensicNode[], metrics: AggregateMetrics): BenchmarkAnalysis {
    const benchmarks: QualityBenchmark[] = [];
    const comparisons: QualityComparison[] = [];
    
    // Content type benchmarks
    Object.values(NodeType).forEach(type => {
      const typeBenchmark = this.getBenchmarkForType(type);
      if (typeBenchmark) {
        benchmarks.push(typeBenchmark);
        
        const typeNodes = nodes.filter(n => n.type === type);
        const typeAverage = typeNodes.length > 0 ? typeNodes.reduce((sum, n) => sum + (n.metadata.tier / 3), 0) / typeNodes.length : 0;
        
        comparisons.push({
          benchmarkName: typeBenchmark.name,
          currentScore: typeAverage,
          targetScore: typeBenchmark.targetScore,
          gap: typeBenchmark.targetScore - typeAverage,
          status: typeAverage >= typeBenchmark.targetScore ? 'MEETS' : typeAverage >= typeBenchmark.targetScore - 0.1 ? 'NEAR' : 'FAR'
        });
      }
    });

    // Overall quality benchmark
    benchmarks.push({
      name: 'Overall Quality Standard',
      description: 'General content quality benchmark',
      targetScore: 0.75,
      category: 'General'
    });

    comparisons.push({
      benchmarkName: 'Overall Quality Standard',
      currentScore: metrics.averageScore,
      targetScore: 0.75,
      gap: 0.75 - metrics.averageScore,
      status: metrics.averageScore >= 0.75 ? 'MEETS' : metrics.averageScore >= 0.65 ? 'NEAR' : 'FAR'
    });

    return {
      benchmarks,
      comparisons,
      complianceSummary: this.generateComplianceSummary(comparisons),
      performanceGaps: this.identifyPerformanceGaps(comparisons)
    };
  }

  /**
   * Generates actionable insights from validation results
   */
  private static generateInsights(results: ValidationResult[], metrics: AggregateMetrics, trends: TrendAnalysis): QualityInsight[] {
    const insights: QualityInsight[] = [];
    
    // Compliance insights
    if (metrics.complianceRate < 0.7) {
      insights.push({
        type: 'COMPLIANCE',
        severity: 'HIGH',
        title: 'Low Compliance Rate',
        description: `Only ${Math.round(metrics.complianceRate * 100)}% of content meets quality standards`,
        impact: 'High risk of content quality issues',
        recommendation: 'Implement immediate quality improvement measures'
      });
    }

    // Critical issues insights
    if (metrics.criticalIssues > 0) {
      insights.push({
        type: 'CRITICAL_ISSUES',
        severity: 'CRITICAL',
        title: 'Critical Quality Issues Detected',
        description: `${metrics.criticalIssues} critical issues found across content`,
        impact: 'Severe impact on content reliability and trustworthiness',
        recommendation: 'Address critical issues immediately'
      });
    }

    // Trend insights
    if (trends.overallTrend === 'DECLINING') {
      insights.push({
        type: 'TREND',
        severity: 'MEDIUM',
        title: 'Quality Trend Declining',
        description: 'Content quality shows declining trend over time',
        impact: 'Long-term degradation of content standards',
        recommendation: 'Review and strengthen quality control processes'
      });
    }

    // Content type insights
    metrics.contentTypes.forEach(contentType => {
      if (contentType.averageScore < 0.6) {
        insights.push({
          type: 'CONTENT_TYPE',
          severity: 'MEDIUM',
          title: `Poor Quality in ${contentType.type}`,
          description: `${contentType.type} content has low average quality score`,
          impact: 'Specific content type needs attention',
          recommendation: `Focus quality improvement efforts on ${contentType.type} content`
        });
      }
    });

    return insights;
  }

  /**
   * Aggregates recommendations from all validation results
   */
  private static aggregateRecommendations(results: ValidationResult[]): QualityRecommendation[] {
    const allRecommendations = results.flatMap(r => r.recommendations);
    
    // Group by priority and category
    const grouped = allRecommendations.reduce((acc, rec) => {
      const key = `${rec.priority}_${rec.description}`;
      if (!acc[key]) {
        acc[key] = { ...rec, count: 1 };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {} as Record<string, QualityRecommendation & { count: number }>);

    // Sort by priority and frequency
    return Object.values(grouped)
      .sort((a, b) => {
        const priorityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority] || b.count - a.count;
      })
      .slice(0, 20); // Limit to top 20 recommendations
  }

  /**
   * Extracts issues from validation result
   */
  private static extractIssues(validation: any): QualityIssue[] {
    const issues: QualityIssue[] = [];
    
    Object.values(validation.validationLayers).forEach((layer: any) => {
      issues.push(...layer.issues);
    });
    
    return issues;
  }

  /**
   * Calculates average score for a specific content type
   */
  private static calculateTypeAverage(results: ValidationResult[], type: NodeType): number {
    const typeResults = results.filter(r => r.contentType === type);
    if (typeResults.length === 0) return 0;
    return typeResults.reduce((sum, r) => sum + r.score, 0) / typeResults.length;
  }

  /**
   * Calculates overall quality health score
   */
  private static calculateQualityHealth(averageScore: number, complianceRate: number, criticalIssues: number): number {
    const scoreWeight = 0.4;
    const complianceWeight = 0.4;
    const issuesWeight = 0.2;
    
    const issuesPenalty = Math.min(criticalIssues * 0.1, 0.5);
    
    return Math.max(0, (averageScore * scoreWeight) + (complianceRate * complianceWeight) - issuesPenalty);
  }

  /**
   * Determines overall trend from individual trends
   */
  private static determineOverallTrend(trends: QualityTrend[]): 'IMPROVING' | 'DECLINING' | 'STABLE' {
    const improvingCount = trends.filter(t => t.trend === 'IMPROVING').length;
    const decliningCount = trends.filter(t => t.trend === 'DECLINING').length;
    const stableCount = trends.filter(t => t.trend === 'STABLE').length;
    
    if (improvingCount > decliningCount) return 'IMPROVING';
    if (decliningCount > improvingCount) return 'DECLINING';
    return 'STABLE';
  }

  /**
   * Identifies risk indicators from enhanced analysis
   */
  private static identifyRiskIndicators(temporalAnalysis: any, entityAnalysis: any, semanticAnalysis: any): RiskIndicator[] {
    const risks: RiskIndicator[] = [];
    
    if (temporalAnalysis.behavioralAnomalies.length > 0) {
      risks.push({
        type: 'TEMPORAL_INCONSISTENCY',
        severity: 'HIGH',
        description: 'Temporal sequence inconsistencies detected',
        confidence: 0.8
      });
    }

    if (entityAnalysis.entities.length === 0) {
      risks.push({
        type: 'ENTITY_RESOLUTION_FAILURE',
        severity: 'MEDIUM',
        description: 'No entities resolved from content',
        confidence: 0.7
      });
    }

    if (semanticAnalysis.semanticConfidence < 0.6) {
      risks.push({
        type: 'SEMANTIC_INCOHERENCE',
        severity: 'HIGH',
        description: 'Low semantic coherence detected',
        confidence: 0.9
      });
    }

    return risks;
  }

  /**
   * Identifies improvement opportunities from trends
   */
  private static identifyImprovementOpportunities(trends: TrendAnalysis): ImprovementOpportunity[] {
    const opportunities: ImprovementOpportunity[] = [];
    
    trends.contentTrends.forEach(trend => {
      if (trend.trend === 'DECLINING') {
        opportunities.push({
          category: trend.timePeriod,
          description: `Address declining quality in ${trend.timePeriod}`,
          priority: 'HIGH',
          estimatedImpact: 'Significant improvement potential'
        });
      }
    });

    return opportunities;
  }

  /**
   * Generates benchmark compliance summary
   */
  private static generateComplianceSummary(comparisons: QualityComparison[]): ComplianceSummary {
    const totalBenchmarks = comparisons.length;
    const metBenchmarks = comparisons.filter(c => c.status === 'MEETS').length;
    const nearBenchmarks = comparisons.filter(c => c.status === 'NEAR').length;
    const farBenchmarks = comparisons.filter(c => c.status === 'FAR').length;

    return {
      totalBenchmarks,
      metBenchmarks,
      nearBenchmarks,
      farBenchmarks,
      complianceRate: totalBenchmarks > 0 ? metBenchmarks / totalBenchmarks : 0,
      status: metBenchmarks === totalBenchmarks ? 'EXCELLENT' : metBenchmarks + nearBenchmarks >= totalBenchmarks * 0.8 ? 'GOOD' : 'POOR'
    };
  }

  /**
   * Identifies performance gaps from benchmark comparisons
   */
  private static identifyPerformanceGaps(comparisons: QualityComparison[]): PerformanceGap[] {
    return comparisons
      .filter(c => c.gap > 0.1)
      .map(c => ({
        benchmarkName: c.benchmarkName,
        currentScore: c.currentScore,
        targetScore: c.targetScore,
        gap: c.gap,
        priority: c.gap > 0.3 ? 'CRITICAL' : c.gap > 0.2 ? 'HIGH' : 'MEDIUM'
      }))
      .sort((a, b) => b.gap - a.gap);
  }

  /**
   * Gets benchmark configuration for content type
   */
  private static getBenchmarkForType(type: NodeType): QualityBenchmark | null {
    const benchmarks = {
      [NodeType.DOCTRINE]: { name: 'Doctrinal Excellence', target: 0.85, description: 'High standards for doctrinal content' },
      [NodeType.TACTIC]: { name: 'Tactical Precision', target: 0.80, description: 'Precision standards for tactical content' },
      [NodeType.PROFILE]: { name: 'Profile Completeness', target: 0.75, description: 'Completeness standards for profile content' },
      [NodeType.THEORY]: { name: 'Theoretical Rigor', target: 0.90, description: 'Rigor standards for theoretical content' },
      [NodeType.CASE_STUDY]: { name: 'Case Study Depth', target: 0.80, description: 'Depth standards for case study content' }
    };

    return benchmarks[type as keyof typeof benchmarks] || null;
  }
}

// Type definitions for monitoring dashboard
interface QualityDashboard {
  summary: DashboardSummary;
  metrics: AggregateMetrics;
  trends: TrendAnalysis;
  benchmarks: BenchmarkAnalysis;
  insights: QualityInsight[];
  recommendations: QualityRecommendation[];
  detailedResults: ValidationResult[];
  enhancedAnalysis: {
    temporalIntegrity: any;
    entityResolution: any;
    semanticCoherence: any;
  };
  timestamp: string;
}

interface DashboardSummary {
  totalNodes: number;
  averageScore: number;
  complianceRate: number;
  criticalIssues: number;
  lastUpdated: string;
}

interface AggregateMetrics {
  totalNodes: number;
  passedNodes: number;
  failedNodes: number;
  averageScore: number;
  complianceRate: number;
  criticalIssues: number;
  highIssues: number;
  scoreDistribution: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
  contentTypes: Array<{
    type: NodeType;
    count: number;
    averageScore: number;
  }>;
  qualityHealth: number;
}

interface TrendAnalysis {
  overallTrend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  contentTrends: QualityTrend[];
  riskIndicators: RiskIndicator[];
  improvementOpportunities: ImprovementOpportunity[];
}

interface BenchmarkAnalysis {
  benchmarks: QualityBenchmark[];
  comparisons: QualityComparison[];
  complianceSummary: ComplianceSummary;
  performanceGaps: PerformanceGap[];
}

interface QualityInsight {
  type: 'COMPLIANCE' | 'CRITICAL_ISSUES' | 'TREND' | 'CONTENT_TYPE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}

interface ValidationResult {
  nodeId: string;
  title: string;
  contentType: NodeType;
  score: number;
  confidence: number;
  passed: boolean;
  issues: QualityIssue[];
  recommendations: QualityRecommendation[];
  timestamp: string;
}

interface QualityIssue {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  description: string;
  location?: string;
  evidence: string[];
}

interface RiskIndicator {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  confidence: number;
}

interface ImprovementOpportunity {
  category: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedImpact: string;
}

interface ComplianceSummary {
  totalBenchmarks: number;
  metBenchmarks: number;
  nearBenchmarks: number;
  farBenchmarks: number;
  complianceRate: number;
  status: 'EXCELLENT' | 'GOOD' | 'POOR';
}

interface PerformanceGap {
  benchmarkName: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}