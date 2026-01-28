import { ForensicNode, NodeType, GraphLink } from '../types';
import { QualityStandards } from './quality-standards';
import { QualityScoring, ContentQualityReport, QualityRecommendation, QualityTrend, QualityBenchmark } from './quality-scoring';
import { QualityAssurancePipeline, QualityPipelineResult } from './quality-assurance';

/**
 * QUALITY MONITORING AND IMPROVEMENT SYSTEMS
 * Real-time quality monitoring with automated improvement suggestions
 */
export class QualityMonitoringSystem {
  
  private static monitoringHistory: QualityMonitoringEvent[] = [];
  private static alertThresholds: QualityAlertThresholds = {
    criticalIssues: 5,
    qualityDrop: 0.2,
    trendDecline: 3,
    processingTime: 5000
  };

  /**
   * Monitors quality metrics in real-time
   */
  static async monitorQualityMetrics(
    nodes: ForensicNode[], 
    links: GraphLink[],
    benchmark: QualityBenchmark = QualityAssurancePipeline.DEFAULT_QUALITY_BENCHMARK
  ): Promise<QualityMonitoringResult> {
    console.log('📊 Starting Quality Monitoring...');
    
    // Calculate current quality metrics
    const currentMetrics = await this.calculateCurrentMetrics(nodes, links);
    
    // Generate quality comparison
    const qualityComparison = QualityScoring.generateBenchmarkComparison(
      currentMetrics.reports, 
      benchmark
    );
    
    // Analyze quality trends
    const trendAnalysis = QualityScoring.calculateQualityTrend(currentMetrics.reports);
    
    // Generate alerts
    const alerts = this.generateQualityAlerts(currentMetrics, trendAnalysis);
    
    // Create monitoring event
    const monitoringEvent: QualityMonitoringEvent = {
      timestamp: new Date().toISOString(),
      metrics: currentMetrics,
      comparison: qualityComparison,
      trend: trendAnalysis,
      alerts: alerts
    };
    
    // Store in history
    this.monitoringHistory.push(monitoringEvent);
    
    // Clean up old history (keep last 100 events)
    if (this.monitoringHistory.length > 100) {
      this.monitoringHistory = this.monitoringHistory.slice(-100);
    }

    return {
      currentMetrics: currentMetrics,
      qualityComparison: qualityComparison,
      trendAnalysis: trendAnalysis,
      alerts: alerts,
      monitoringHistory: this.monitoringHistory.slice(-10), // Return last 10 events
      recommendations: this.generateMonitoringRecommendations(currentMetrics, alerts)
    };
  }

  /**
   * Calculates current quality metrics
   */
  private static async calculateCurrentMetrics(
    nodes: ForensicNode[], 
    links: GraphLink[]
  ): Promise<QualityMetrics> {
    const reports: ContentQualityReport[] = [];
    const processingTimes: ProcessingTime[] = [];
    
    // Calculate quality for each node
    for (const node of nodes) {
      const startTime = Date.now();
      const report = QualityScoring.calculateQualityScore(node);
      const processingTime = Date.now() - startTime;
      
      reports.push(report);
      processingTimes.push({
        nodeId: node.id,
        processingTime: processingTime,
        timestamp: new Date().toISOString()
      });
    }

    // Calculate aggregate metrics
    const aggregateMetrics = this.calculateAggregateMetrics(reports, links);
    
    return {
      reports: reports,
      aggregateMetrics: aggregateMetrics,
      processingTimes: processingTimes,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculates aggregate quality metrics
   */
  private static calculateAggregateMetrics(
    reports: ContentQualityReport[], 
    links: GraphLink[]
  ): AggregateQualityMetrics {
    const totalNodes = reports.length;
    const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0);
    const totalSuggestions = reports.reduce((sum, r) => sum + r.suggestions.length, 0);
    
    const averageScore = reports.reduce((sum, r) => sum + r.overallScore, 0) / totalNodes;
    const averageConfidence = reports.reduce((sum, r) => sum + r.confidence, 0) / totalNodes;
    
    // Calculate quality distribution
    const distribution = {
      excellent: reports.filter(r => r.overallScore >= 0.9).length,
      good: reports.filter(r => r.overallScore >= 0.7 && r.overallScore < 0.9).length,
      fair: reports.filter(r => r.overallScore >= 0.5 && r.overallScore < 0.7).length,
      poor: reports.filter(r => r.overallScore < 0.5).length
    };

    // Calculate link quality metrics
    const linkQuality = this.calculateLinkQualityMetrics(links, reports);
    
    // Calculate category performance
    const categoryPerformance = this.calculateCategoryPerformance(reports);

    return {
      totalNodes: totalNodes,
      averageQualityScore: Math.round(averageScore * 100) / 100,
      averageConfidence: Math.round(averageConfidence * 100) / 100,
      totalIssues: totalIssues,
      totalSuggestions: totalSuggestions,
      qualityDistribution: distribution,
      linkQualityMetrics: linkQuality,
      categoryPerformance: categoryPerformance,
      issueSeverityBreakdown: this.calculateIssueBreakdown(reports),
      processingEfficiency: this.calculateProcessingEfficiency(reports)
    };
  }

  /**
   * Calculates link quality metrics
   */
  private static calculateLinkQualityMetrics(
    links: GraphLink[], 
    reports: ContentQualityReport[]
  ): LinkQualityMetrics {
    const reportMap = new Map(reports.map(r => [r.nodeId, r]));
    const totalLinks = links.length;
    
    let highQualityLinks = 0;
    let lowQualityLinks = 0;
    let brokenLinks = 0;
    
    links.forEach(link => {
      const sourceReport = reportMap.get(link.source);
      const targetReport = reportMap.get(link.target);
      
      if (!sourceReport || !targetReport) {
        brokenLinks++;
      } else {
        const avgQuality = (sourceReport.overallScore + targetReport.overallScore) / 2;
        if (avgQuality >= 0.8) {
          highQualityLinks++;
        } else {
          lowQualityLinks++;
        }
      }
    });

    return {
      totalLinks: totalLinks,
      highQualityLinks: highQualityLinks,
      lowQualityLinks: lowQualityLinks,
      brokenLinks: brokenLinks,
      linkQualityRatio: totalLinks > 0 ? highQualityLinks / totalLinks : 0
    };
  }

  /**
   * Calculates category performance
   */
  private static calculateCategoryPerformance(reports: ContentQualityReport[]): CategoryPerformance[] {
    const categoryScores: Record<string, number[]> = {};
    const categoryCounts: Record<string, number> = {};

    reports.forEach(report => {
      Object.entries(report.categoryScores).forEach(([category, score]) => {
        if (!categoryScores[category]) {
          categoryScores[category] = [];
          categoryCounts[category] = 0;
        }
        categoryScores[category].push(score);
        categoryCounts[category]++;
      });
    });

    return Object.entries(categoryScores).map(([category, scores]) => {
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const standardDeviation = this.calculateStandardDeviation(scores);
      
      return {
        category: category,
        averageScore: Math.round(averageScore * 100) / 100,
        standardDeviation: Math.round(standardDeviation * 100) / 100,
        nodeCount: categoryCounts[category],
        performance: averageScore >= 0.8 ? 'EXCELLENT' : averageScore >= 0.6 ? 'GOOD' : 'POOR'
      };
    });
  }

  /**
   * Calculates issue severity breakdown
   */
  private static calculateIssueBreakdown(reports: ContentQualityReport[]): IssueBreakdown {
    const allIssues = reports.flatMap(r => r.issues);
    return {
      critical: allIssues.filter(i => i.severity === 'CRITICAL').length,
      high: allIssues.filter(i => i.severity === 'HIGH').length,
      medium: allIssues.filter(i => i.severity === 'MEDIUM').length,
      low: allIssues.filter(i => i.severity === 'LOW').length
    };
  }

  /**
   * Calculates processing efficiency metrics
   */
  private static calculateProcessingEfficiency(reports: ContentQualityReport[]): ProcessingEfficiency {
    const processingTimes = reports.map(r => {
      // Estimate processing time based on content length and complexity
      const contentLength = r.nodeId.length; // Simplified estimation
      return contentLength * 10; // Simplified calculation
    });
    
    const avgTime = processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length;
    const maxTime = Math.max(...processingTimes);
    const minTime = Math.min(...processingTimes);
    
    return {
      averageProcessingTime: Math.round(avgTime),
      maxProcessingTime: maxTime,
      minProcessingTime: minTime,
      efficiencyRatio: avgTime < 1000 ? 'HIGH' : avgTime < 3000 ? 'MEDIUM' : 'LOW'
    };
  }

  /**
   * Generates quality alerts based on thresholds
   */
  private static generateQualityAlerts(
    metrics: QualityMetrics, 
    trend: QualityTrend
  ): QualityAlert[] {
    const alerts: QualityAlert[] = [];
    
    // Check for critical issues threshold
    if (metrics.aggregateMetrics.issueSeverityBreakdown.critical > this.alertThresholds.criticalIssues) {
      alerts.push({
        type: 'CRITICAL_ISSUES',
        severity: 'CRITICAL',
        message: `Critical issues threshold exceeded: ${metrics.aggregateMetrics.issueSeverityBreakdown.critical} issues detected`,
        timestamp: new Date().toISOString(),
        actionRequired: true
      });
    }

    // Check for quality trend decline
    if (trend.trend === 'DECLINING' && trend.change < -this.alertThresholds.qualityDrop) {
      alerts.push({
        type: 'QUALITY_DECLINE',
        severity: 'HIGH',
        message: `Quality trend declining: ${Math.abs(trend.change)}% drop detected`,
        timestamp: new Date().toISOString(),
        actionRequired: true
      });
    }

    // Check for processing time threshold
    const avgProcessingTime = metrics.processingTimes.reduce((sum, pt) => sum + pt.processingTime, 0) / metrics.processingTimes.length;
    if (avgProcessingTime > this.alertThresholds.processingTime) {
      alerts.push({
        type: 'PERFORMANCE_ISSUE',
        severity: 'MEDIUM',
        message: `Processing time threshold exceeded: ${avgProcessingTime}ms average`,
        timestamp: new Date().toISOString(),
        actionRequired: false
      });
    }

    // Check for poor quality distribution
    const poorQualityRatio = metrics.aggregateMetrics.qualityDistribution.poor / metrics.aggregateMetrics.totalNodes;
    if (poorQualityRatio > 0.3) {
      alerts.push({
        type: 'POOR_QUALITY_RATIO',
        severity: 'HIGH',
        message: `High poor quality ratio: ${Math.round(poorQualityRatio * 100)}% of content below standards`,
        timestamp: new Date().toISOString(),
        actionRequired: true
      });
    }

    return alerts;
  }

  /**
   * Generates monitoring-based recommendations
   */
  private static generateMonitoringRecommendations(
    metrics: QualityMetrics, 
    alerts: QualityAlert[]
  ): QualityRecommendation[] {
    const recommendations: QualityRecommendation[] = [];
    
    // Generate recommendations based on alerts
    alerts.forEach(alert => {
      switch (alert.type) {
        case 'CRITICAL_ISSUES':
          recommendations.push({
            priority: 'CRITICAL',
            category: 'IMMEDIATE_ACTION',
            description: 'Critical quality issues detected',
            actions: [{
              action: 'Review and address all critical quality issues immediately',
              impact: 'Prevents propagation of low-quality content'
            }]
          });
          break;
          
        case 'QUALITY_DECLINE':
          recommendations.push({
            priority: 'HIGH',
            category: 'QUALITY_IMPROVEMENT',
            description: 'Quality trend decline detected',
            actions: [{
              action: 'Implement quality improvement measures',
              impact: 'Reverse quality decline trend'
            }]
          });
          break;
          
        case 'PERFORMANCE_ISSUE':
          recommendations.push({
            priority: 'MEDIUM',
            category: 'PERFORMANCE_OPTIMIZATION',
            description: 'Processing performance issues detected',
            actions: [{
              action: 'Optimize processing algorithms and infrastructure',
              impact: 'Improve system performance and responsiveness'
            }]
          });
          break;
          
        case 'POOR_QUALITY_RATIO':
          recommendations.push({
            priority: 'HIGH',
            category: 'CONTENT_ENHANCEMENT',
            description: 'High ratio of poor quality content',
            actions: [{
              action: 'Implement comprehensive content quality improvement program',
              impact: 'Significantly improve overall content quality'
            }]
          });
          break;
      }
    });

    // Generate recommendations based on category performance
    metrics.aggregateMetrics.categoryPerformance.forEach(category => {
      if (category.performance === 'POOR') {
        recommendations.push({
          priority: 'MEDIUM',
          category: 'CATEGORY_IMPROVEMENT',
          description: `Poor performance in ${category.category} category`,
          actions: [{
            action: `Focus on improving ${category.category} quality standards`,
            impact: 'Enhance category-specific quality metrics'
          }]
        });
      }
    });

    return recommendations;
  }

  /**
   * Calculates standard deviation
   */
  private static calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  /**
   * Gets quality monitoring dashboard data
   */
  static getMonitoringDashboard(): QualityDashboard {
    if (this.monitoringHistory.length === 0) {
      return {
        currentStatus: 'NO_DATA',
        metrics: null,
        trends: [],
        alerts: [],
        recommendations: []
      };
    }

    const latestEvent = this.monitoringHistory[this.monitoringHistory.length - 1];
    const recentEvents = this.monitoringHistory.slice(-10);
    
    // Calculate trend data
    const trendData = recentEvents.map(event => ({
      timestamp: event.timestamp,
      averageScore: event.metrics.aggregateMetrics.averageQualityScore,
      issueCount: event.metrics.aggregateMetrics.totalIssues
    }));

    return {
      currentStatus: this.getCurrentStatus(latestEvent),
      metrics: latestEvent.metrics.aggregateMetrics,
      trends: trendData,
      alerts: latestEvent.alerts,
      recommendations: latestEvent.metrics.reports.flatMap(r => 
        QualityScoring.generateRecommendations(r)
      ).slice(0, 10) // Limit to top 10 recommendations
    };
  }

  /**
   * Determines current system status
   */
  private static getCurrentStatus(event: QualityMonitoringEvent): 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'NO_DATA' {
    const criticalAlerts = event.alerts.filter(a => a.severity === 'CRITICAL').length;
    const highAlerts = event.alerts.filter(a => a.severity === 'HIGH').length;
    const avgScore = event.metrics.aggregateMetrics.averageQualityScore;
    
    if (criticalAlerts > 0 || avgScore < 0.5) {
      return 'CRITICAL';
    } else if (highAlerts > 0 || avgScore < 0.7) {
      return 'WARNING';
    } else {
      return 'HEALTHY';
    }
  }

  /**
   * Exports monitoring data for analysis
   */
  static exportMonitoringData(format: 'JSON' | 'CSV'): string {
    const data = {
      exportDate: new Date().toISOString(),
      monitoringHistory: this.monitoringHistory,
      summary: {
        totalEvents: this.monitoringHistory.length,
        averageQualityScore: this.monitoringHistory.reduce((sum, event) => 
          sum + event.metrics.aggregateMetrics.averageQualityScore, 0) / this.monitoringHistory.length,
        totalAlerts: this.monitoringHistory.reduce((sum, event) => sum + event.alerts.length, 0),
        currentStatus: this.getMonitoringDashboard().currentStatus
      }
    };

    if (format === 'JSON') {
      return JSON.stringify(data, null, 2);
    } else {
      // Simple CSV export for key metrics
      const headers = ['Timestamp', 'AverageScore', 'TotalIssues', 'CriticalIssues', 'HighIssues'];
      const rows = this.monitoringHistory.map(event => [
        event.timestamp,
        event.metrics.aggregateMetrics.averageQualityScore,
        event.metrics.aggregateMetrics.totalIssues,
        event.metrics.aggregateMetrics.issueSeverityBreakdown.critical,
        event.metrics.aggregateMetrics.issueSeverityBreakdown.high
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
  }

  /**
   * Sets custom alert thresholds
   */
  static setAlertThresholds(thresholds: Partial<QualityAlertThresholds>): void {
    this.alertThresholds = { ...this.alertThresholds, ...thresholds };
  }

  /**
   * Clears monitoring history
   */
  static clearHistory(): void {
    this.monitoringHistory = [];
  }
}

// Type definitions for quality monitoring system
export interface QualityMonitoringResult {
  currentMetrics: QualityMetrics;
  qualityComparison: any; // QualityComparison from quality-scoring
  trendAnalysis: QualityTrend;
  alerts: QualityAlert[];
  monitoringHistory: QualityMonitoringEvent[];
  recommendations: QualityRecommendation[];
}

export interface QualityMetrics {
  reports: ContentQualityReport[];
  aggregateMetrics: AggregateQualityMetrics;
  processingTimes: ProcessingTime[];
  timestamp: string;
}

export interface ProcessingTime {
  nodeId: string;
  processingTime: number;
  timestamp: string;
}

export interface ProcessingEfficiency {
  averageProcessingTime: number;
  maxProcessingTime: number;
  minProcessingTime: number;
  efficiencyRatio: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface LinkQualityMetrics {
  totalLinks: number;
  highQualityLinks: number;
  lowQualityLinks: number;
  brokenLinks: number;
  linkQualityRatio: number;
}

export interface CategoryPerformance {
  category: string;
  averageScore: number;
  standardDeviation: number;
  nodeCount: number;
  performance: 'EXCELLENT' | 'GOOD' | 'POOR';
}

export interface QualityMonitoringEvent {
  timestamp: string;
  metrics: QualityMetrics;
  comparison: any; // QualityComparison
  trend: QualityTrend;
  alerts: QualityAlert[];
}

export interface QualityAlert {
  type: 'CRITICAL_ISSUES' | 'QUALITY_DECLINE' | 'PERFORMANCE_ISSUE' | 'POOR_QUALITY_RATIO';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: string;
  actionRequired: boolean;
}

export interface QualityAlertThresholds {
  criticalIssues: number;
  qualityDrop: number;
  trendDecline: number;
  processingTime: number;
}

export interface QualityDashboard {
  currentStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'NO_DATA';
  metrics: AggregateQualityMetrics | null;
  trends: Array<{timestamp: string, averageScore: number, issueCount: number}>;
  alerts: QualityAlert[];
  recommendations: QualityRecommendation[];
}