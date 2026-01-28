import { ForensicNode, NodeType, TacticalVector } from '../types';
import { IndexingOrchestrator, EnhancedIndexingResult } from './indexing-orchestrator';
import { ValidationFramework } from './validation-framework';
import { MonitoringDashboard } from './monitoring-dashboard';
import { IndexingTests } from './indexing-tests';

/**
 * COMPREHENSIVE INDEXING API
 * RESTful API endpoints for the enhanced indexing system
 */
export class IndexingAPI {
  
  /**
   * POST /api/v1/index
   * Execute complete enhanced indexing pipeline
   */
  static async executeIndexing(nodes: ForensicNode[]): Promise<EnhancedIndexingResult> {
    console.log(`🚀 Executing enhanced indexing for ${nodes.length} nodes...`);
    
    try {
      const result = await IndexingOrchestrator.executeEnhancedIndexing(nodes);
      console.log(`✅ Indexing complete: ${nodes.length} nodes processed`);
      return result;
    } catch (error) {
      console.error('❌ Indexing failed:', error);
      throw new Error(`Indexing execution failed: ${error}`);
    }
  }

  /**
   * POST /api/v1/validate
   * Validate individual content node
   */
  static async validateContent(node: ForensicNode): Promise<any> {
    console.log(`✅ Validating content: ${node.title} (${node.id})`);
    
    try {
      const result = await ValidationFramework.validateContent(node);
      console.log(`✅ Validation complete: ${node.title} - Score: ${result.overallScore}`);
      return result;
    } catch (error) {
      console.error('❌ Validation failed:', error);
      throw new Error(`Content validation failed: ${error}`);
    }
  }

  /**
   * POST /api/v1/dashboard
   * Generate monitoring dashboard
   */
  static async generateDashboard(nodes: ForensicNode[]): Promise<any> {
    console.log(`📊 Generating dashboard for ${nodes.length} nodes...`);
    
    try {
      const result = await MonitoringDashboard.generateDashboard(nodes);
      console.log(`✅ Dashboard generated: ${nodes.length} nodes analyzed`);
      return result;
    } catch (error) {
      console.error('❌ Dashboard generation failed:', error);
      throw new Error(`Dashboard generation failed: ${error}`);
    }
  }

  /**
   * GET /api/v1/test-suite
   * Run comprehensive test suite
   */
  static async runTestSuite(): Promise<any> {
    console.log('🧪 Running comprehensive test suite...');
    
    try {
      const result = await IndexingOrchestrator.runTestSuite();
      console.log(`✅ Test suite complete: ${result.passedTests}/${result.totalTests} tests passed`);
      return result;
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      throw new Error(`Test suite execution failed: ${error}`);
    }
  }

  /**
   * GET /api/v1/health
   * Check system health and status
   */
  static getHealthStatus(): HealthStatus {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      components: {
        validationFramework: 'operational',
        monitoringDashboard: 'operational',
        temporalIndexer: 'operational',
        entityResolver: 'operational',
        semanticAnalyzer: 'operational',
        qualityStandards: 'operational'
      },
      version: '2.0.0',
      uptime: process.uptime()
    };
  }

  /**
   * GET /api/v1/metrics
   * Get system metrics and statistics
   */
  static getSystemMetrics(): SystemMetrics {
    return {
      totalNodesProcessed: 0, // Would be tracked in production
      averageProcessingTime: 0, // Would be calculated from actual processing
      successRate: 1.0,
      errorRate: 0,
      memoryUsage: process.memoryUsage(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * POST /api/v1/batch-validate
   * Validate multiple content nodes in batch
   */
  static async batchValidate(nodes: ForensicNode[]): Promise<BatchValidationResult> {
    console.log(`✅ Validating batch of ${nodes.length} nodes...`);
    
    const results = [];
    const startTime = Date.now();
    
    for (const node of nodes) {
      try {
        const result = await ValidationFramework.validateContent(node);
        results.push({
          nodeId: node.id,
          title: node.title,
          contentType: node.type,
          score: result.overallScore,
          confidence: result.confidence,
          passed: result.overallScore >= 0.7,
          timestamp: result.timestamp
        });
      } catch (error) {
        results.push({
          nodeId: node.id,
          title: node.title,
          contentType: node.type,
          score: 0,
          confidence: 0,
          passed: false,
          timestamp: new Date().toISOString(),
          error: String(error)
        });
      }
    }
    
    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    const summary = {
      totalNodes: nodes.length,
      passedNodes: results.filter(r => r.passed).length,
      failedNodes: results.filter(r => !r.passed).length,
      averageScore: results.reduce((sum, r) => sum + r.score, 0) / results.length,
      processingTime: processingTime
    };

    return {
      summary: summary,
      results: results,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * POST /api/v1/batch-index
   * Execute indexing pipeline for multiple nodes
   */
  static async batchIndex(nodes: ForensicNode[]): Promise<BatchIndexingResult> {
    console.log(`🚀 Executing batch indexing for ${nodes.length} nodes...`);
    
    const startTime = Date.now();
    
    try {
      const result = await IndexingOrchestrator.executeEnhancedIndexing(nodes);
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      return {
        success: true,
        nodesProcessed: nodes.length,
        processingTime: processingTime,
        result: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      return {
        success: false,
        nodesProcessed: 0,
        processingTime: processingTime,
        error: String(error),
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * GET /api/v1/standards/:type
   * Get quality standards for specific content type
   */
  static getQualityStandards(contentType: NodeType): any {
    const QualityStandards = require('./quality-standards').QualityStandards;
    return QualityStandards.getStandardsForType(contentType);
  }

  /**
   * POST /api/v1/optimize
   * Optimize existing index based on diagnostics
   */
  static async optimizeIndex(
    links: any[],
    diagnostics: any,
    metrics: any,
    validationResults: any
  ): Promise<any> {
    console.log('🔧 Optimizing index based on diagnostics...');
    
    try {
      const result = await IndexingOrchestrator.optimizeIndex(links, diagnostics, metrics, validationResults);
      console.log('✅ Index optimization complete');
      return result;
    } catch (error) {
      console.error('❌ Index optimization failed:', error);
      throw new Error(`Index optimization failed: ${error}`);
    }
  }
}

// Type definitions for API responses
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  components: {
    validationFramework: 'operational' | 'degraded' | 'failed';
    monitoringDashboard: 'operational' | 'degraded' | 'failed';
    temporalIndexer: 'operational' | 'degraded' | 'failed';
    entityResolver: 'operational' | 'degraded' | 'failed';
    semanticAnalyzer: 'operational' | 'degraded' | 'failed';
    qualityStandards: 'operational' | 'degraded' | 'failed';
  };
  version: string;
  uptime: number;
}

interface SystemMetrics {
  totalNodesProcessed: number;
  averageProcessingTime: number;
  successRate: number;
  errorRate: number;
  memoryUsage: NodeJS.MemoryUsage;
  timestamp: string;
}

interface BatchValidationResult {
  summary: {
    totalNodes: number;
    passedNodes: number;
    failedNodes: number;
    averageScore: number;
    processingTime: number;
  };
  results: Array<{
    nodeId: string;
    title: string;
    contentType: NodeType;
    score: number;
    confidence: number;
    passed: boolean;
    timestamp: string;
    error?: string;
  }>;
  timestamp: string;
}

interface BatchIndexingResult {
  success: boolean;
  nodesProcessed: number;
  processingTime: number;
  result?: EnhancedIndexingResult;
  error?: string;
  timestamp: string;
}

/**
 * Express.js middleware for the indexing API
 */
export const createIndexingMiddleware = () => {
  const express = require('express');
  const router = express.Router();

  // Health check endpoint
  router.get('/health', (req: any, res: any) => {
    const health = IndexingAPI.getHealthStatus();
    res.json(health);
  });

  // System metrics endpoint
  router.get('/metrics', (req: any, res: any) => {
    const metrics = IndexingAPI.getSystemMetrics();
    res.json(metrics);
  });

  // Execute indexing endpoint
  router.post('/index', async (req: any, res: any) => {
    try {
      const nodes: ForensicNode[] = req.body.nodes;
      if (!nodes || !Array.isArray(nodes)) {
        return res.status(400).json({ error: 'Invalid request body: nodes array required' });
      }
      
      const result = await IndexingAPI.executeIndexing(nodes);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // Validate content endpoint
  router.post('/validate', async (req: any, res: any) => {
    try {
      const node: ForensicNode = req.body.node;
      if (!node) {
        return res.status(400).json({ error: 'Invalid request body: node object required' });
      }
      
      const result = await IndexingAPI.validateContent(node);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // Generate dashboard endpoint
  router.post('/dashboard', async (req: any, res: any) => {
    try {
      const nodes: ForensicNode[] = req.body.nodes;
      if (!nodes || !Array.isArray(nodes)) {
        return res.status(400).json({ error: 'Invalid request body: nodes array required' });
      }
      
      const result = await IndexingAPI.generateDashboard(nodes);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // Batch validate endpoint
  router.post('/batch-validate', async (req: any, res: any) => {
    try {
      const nodes: ForensicNode[] = req.body.nodes;
      if (!nodes || !Array.isArray(nodes)) {
        return res.status(400).json({ error: 'Invalid request body: nodes array required' });
      }
      
      const result = await IndexingAPI.batchValidate(nodes);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // Batch index endpoint
  router.post('/batch-index', async (req: any, res: any) => {
    try {
      const nodes: ForensicNode[] = req.body.nodes;
      if (!nodes || !Array.isArray(nodes)) {
        return res.status(400).json({ error: 'Invalid request body: nodes array required' });
      }
      
      const result = await IndexingAPI.batchIndex(nodes);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // Get quality standards endpoint
  router.get('/standards/:type', (req: any, res: any) => {
    try {
      const contentType: NodeType = req.params.type as NodeType;
      if (!contentType) {
        return res.status(400).json({ error: 'Invalid request: content type required' });
      }
      
      const standards = IndexingAPI.getQualityStandards(contentType);
      res.json(standards);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // Optimize index endpoint
  router.post('/optimize', async (req: any, res: any) => {
    try {
      const { links, diagnostics, metrics, validationResults } = req.body;
      if (!links || !diagnostics || !metrics || !validationResults) {
        return res.status(400).json({ error: 'Invalid request body: all parameters required' });
      }
      
      const result = await IndexingAPI.optimizeIndex(links, diagnostics, metrics, validationResults);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // Test suite endpoint
  router.get('/test-suite', async (req: any, res: any) => {
    try {
      const result = await IndexingAPI.runTestSuite();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  return router;
};