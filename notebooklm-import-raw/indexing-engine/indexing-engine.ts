import { ForensicNode, NodeType, TacticalVector } from '../types';
import { IndexingOrchestrator, EnhancedIndexingResult } from './indexing-orchestrator';
import { ValidationFramework } from './validation-framework';
import { MonitoringDashboard } from './monitoring-dashboard';
import { IndexingTests } from './indexing-tests';
import { IndexingAPI } from './indexing-api';
import { IndexingCLI } from './indexing-cli';
import { QualityStandards } from './quality-standards';
import { TemporalIndexer } from './temporal-indexer';
import { EntityResolver } from './entity-resolver';
import { SemanticAnalyzer } from './semantic-analyzer';
import { processIndexingStructure } from './processor';
import { auditIndexingStructure } from './audit';
import { LedgerHealer } from './healer';

/**
 * COMPREHENSIVE INDEXING ENGINE
 * Master orchestrator for the entire indexing system
 */
export class IndexingEngine {
  
  /**
   * Execute complete enhanced indexing pipeline
   */
  static async executeIndexing(nodes: ForensicNode[]): Promise<EnhancedIndexingResult> {
    return await IndexingOrchestrator.executeEnhancedIndexing(nodes);
  }

  /**
   * Validate individual content node
   */
  static async validateContent(node: ForensicNode): Promise<any> {
    return await ValidationFramework.validateContent(node);
  }

  /**
   * Generate monitoring dashboard
   */
  static async generateDashboard(nodes: ForensicNode[]): Promise<any> {
    return await MonitoringDashboard.generateDashboard(nodes);
  }

  /**
   * Run comprehensive test suite
   */
  static async runTestSuite(): Promise<any> {
    return await IndexingTests.runAllTests();
  }

  /**
   * Get quality standards for content type
   */
  static getQualityStandards(contentType: NodeType): any {
    return QualityStandards.getStandardsForType(contentType);
  }

  /**
   * Execute temporal indexing
   */
  static analyzeTemporalPatterns(nodes: ForensicNode[]): any {
    return TemporalIndexer.analyzeTemporalPatterns(nodes);
  }

  /**
   * Execute entity resolution
   */
  static resolveEntities(nodes: ForensicNode[]): any {
    return EntityResolver.resolveEntities(nodes);
  }

  /**
   * Execute semantic analysis
   */
  static analyzeSemantics(nodes: ForensicNode[]): any {
    return SemanticAnalyzer.analyzeSemantics(nodes);
  }

  /**
   * Process indexing structure
   */
  static processIndexingStructure(nodes: ForensicNode[]): any {
    return processIndexingStructure(nodes);
  }

  /**
   * Audit indexing structure
   */
  static auditIndexingStructure(nodes: ForensicNode[], links: any[], repairs: any[]): any {
    return auditIndexingStructure(nodes, links, repairs);
  }

  /**
   * Heal broken links
   */
  static async healLinks(nodes: ForensicNode[]): Promise<any> {
    return await LedgerHealer.repairIndex(nodes);
  }

  /**
   * Run CLI interface
   */
  static async runCLI(): Promise<void> {
    return await IndexingCLI.run();
  }

  /**
   * Create API middleware
   */
  static createAPI(): any {
    return IndexingAPI.createIndexingMiddleware();
  }

  /**
   * Get system health status
   */
  static getHealthStatus(): any {
    return IndexingAPI.getHealthStatus();
  }

  /**
   * Get system metrics
   */
  static getSystemMetrics(): any {
    return IndexingAPI.getSystemMetrics();
  }

  /**
   * Batch validate multiple nodes
   */
  static async batchValidate(nodes: ForensicNode[]): Promise<any> {
    return await IndexingAPI.batchValidate(nodes);
  }

  /**
   * Batch index multiple nodes
   */
  static async batchIndex(nodes: ForensicNode[]): Promise<any> {
    return await IndexingAPI.batchIndex(nodes);
  }

  /**
   * Optimize existing index
   */
  static async optimizeIndex(
    links: any[],
    diagnostics: any,
    metrics: any,
    validationResults: any
  ): Promise<any> {
    return await IndexingAPI.optimizeIndex(links, diagnostics, metrics, validationResults);
  }
}

// Export all components for direct access
export {
  IndexingOrchestrator,
  ValidationFramework,
  MonitoringDashboard,
  IndexingTests,
  IndexingAPI,
  IndexingCLI,
  QualityStandards,
  TemporalIndexer,
  EntityResolver,
  SemanticAnalyzer,
  processIndexingStructure,
  auditIndexingStructure,
  LedgerHealer
};

// Export types
export type {
  EnhancedIndexingResult,
  EnhancedDiagnostics,
  IndexingIssue,
  IntegrationMetrics,
  ValidationResults,
  MonitoringDashboard as DashboardType,
  QualityRecommendation,
  QualityTrend,
  QualityBenchmark,
  QualityComparison,
  ValidationLayerResult,
  QualityIssue,
  QualitySuggestion,
  DashboardSummary,
  AggregateMetrics,
  TrendAnalysis,
  BenchmarkAnalysis,
  QualityInsight,
  ValidationResult,
  RiskIndicator,
  ImprovementOpportunity,
  ComplianceSummary,
  PerformanceGap
} from './indexing-orchestrator';

export default IndexingEngine;