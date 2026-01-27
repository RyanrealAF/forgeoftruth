import { ForensicNode, NodeType } from '../types';
import { IndexingOrchestrator } from './indexing-orchestrator';
import { TemporalIndexer } from './temporal-indexer';
import { EntityResolver } from './entity-resolver';
import { SemanticAnalyzer } from './semantic-analyzer';

/**
 * COMPREHENSIVE INDEXING TEST SUITE
 * Validates all expanded indexing capabilities
 */
export class IndexingTests {
  
  /**
   * Runs the complete test suite
   */
  static async runAllTests(): Promise<TestResults> {
    console.log('🧪 Starting Comprehensive Indexing Tests...\n');
    
    const results: TestResults = {
      temporalIndexing: await this.testTemporalIndexing(),
      entityResolution: await this.testEntityResolution(),
      semanticAnalysis: await this.testSemanticAnalysis(),
      integrationPipeline: await this.testIntegrationPipeline(),
      performanceBenchmark: await this.testPerformanceBenchmark(),
      overallScore: 0
    };

    // Calculate overall score
    results.overallScore = this.calculateOverallScore(results);

    console.log('\n📊 Test Results Summary:');
    console.log(`Temporal Indexing: ${results.temporalIndexing.score}/100`);
    console.log(`Entity Resolution: ${results.entityResolution.score}/100`);
    console.log(`Semantic Analysis: ${results.semanticAnalysis.score}/100`);
    console.log(`Integration Pipeline: ${results.integrationPipeline.score}/100`);
    console.log(`Performance Benchmark: ${results.performanceBenchmark.score}/100`);
    console.log(`\n🎯 Overall Score: ${results.overallScore}/100\n`);

    return results;
  }

  /**
   * Tests temporal indexing capabilities
   */
  private static async testTemporalIndexing(): Promise<TestResult> {
    console.log('⏰ Testing Temporal Indexing...');
    
    const testNodes = this.createTemporalTestNodes();
    const startTime = Date.now();
    
    try {
      const temporalIndex = TemporalIndexer.analyzeTemporalPatterns(testNodes);
      const duration = Date.now() - startTime;

      const tests = [
        this.validateTemporalTimeline(temporalIndex, testNodes),
        this.validatePatternShifts(temporalIndex),
        this.validateAnomalyDetection(temporalIndex),
        this.validateDateParsing(temporalIndex)
      ];

      const score = this.calculateTestScore(tests);
      
      return {
        score: score,
        duration: duration,
        passed: score >= 80,
        details: tests.filter(t => !t.passed).map(t => t.description)
      };
    } catch (error) {
      return {
        score: 0,
        duration: Date.now() - startTime,
        passed: false,
        details: [`Temporal indexing failed: ${error}`]
      };
    }
  }

  /**
   * Tests entity resolution capabilities
   */
  private static async testEntityResolution(): Promise<TestResult> {
    console.log('🔍 Testing Entity Resolution...');
    
    const testNodes = this.createEntityTestNodes();
    const startTime = Date.now();
    
    try {
      const entityResolution = EntityResolver.resolveEntities(testNodes);
      const duration = Date.now() - startTime;

      const tests = [
        this.validateEntityExtraction(entityResolution, testNodes),
        this.validateEntityClustering(entityResolution),
        this.validateAliasDetection(entityResolution),
        this.validateRelationshipBuilding(entityResolution)
      ];

      const score = this.calculateTestScore(tests);
      
      return {
        score: score,
        duration: duration,
        passed: score >= 80,
        details: tests.filter(t => !t.passed).map(t => t.description)
      };
    } catch (error) {
      return {
        score: 0,
        duration: Date.now() - startTime,
        passed: false,
        details: [`Entity resolution failed: ${error}`]
      };
    }
  }

  /**
   * Tests semantic analysis capabilities
   */
  private static async testSemanticAnalysis(): Promise<TestResult> {
    console.log('🧠 Testing Semantic Analysis...');
    
    const testNodes = this.createSemanticTestNodes();
    const startTime = Date.now();
    
    try {
      const semanticAnalysis = SemanticAnalyzer.analyzeSemantics(testNodes);
      const duration = Date.now() - startTime;

      const tests = [
        this.validateSemanticLayers(semanticAnalysis),
        this.validateConceptDrift(semanticAnalysis),
        this.validateCrossDomainLinks(semanticAnalysis),
        this.validateLatentPatterns(semanticAnalysis)
      ];

      const score = this.calculateTestScore(tests);
      
      return {
        score: score,
        duration: duration,
        passed: score >= 80,
        details: tests.filter(t => !t.passed).map(t => t.description)
      };
    } catch (error) {
      return {
        score: 0,
        duration: Date.now() - startTime,
        passed: false,
        details: [`Semantic analysis failed: ${error}`]
      };
    }
  }

  /**
   * Tests the complete integration pipeline
   */
  private static async testIntegrationPipeline(): Promise<TestResult> {
    console.log('🔗 Testing Integration Pipeline...');
    
    const testNodes = this.createIntegrationTestNodes();
    const startTime = Date.now();
    
    try {
      const result = await IndexingOrchestrator.executeEnhancedIndexing(testNodes);
      const duration = Date.now() - startTime;

      const tests = [
        this.validateEnhancedDiagnostics(result.enhancedDiagnostics),
        this.validateIntegrationMetrics(result.integrationMetrics),
        this.validateLinkQuality(result.links),
        this.validateIndexCompleteness(result)
      ];

      const score = this.calculateTestScore(tests);
      
      return {
        score: score,
        duration: duration,
        passed: score >= 85,
        details: tests.filter(t => !t.passed).map(t => t.description)
      };
    } catch (error) {
      return {
        score: 0,
        duration: Date.now() - startTime,
        passed: false,
        details: [`Integration pipeline failed: ${error}`]
      };
    }
  }

  /**
   * Tests performance benchmarks
   */
  private static async testPerformanceBenchmark(): Promise<TestResult> {
    console.log('⚡ Testing Performance Benchmark...');
    
    const testSizes = [50, 100, 200, 500];
    const results: PerformanceResult[] = [];
    
    for (const size of testSizes) {
      const testNodes = this.createPerformanceTestNodes(size);
      const startTime = Date.now();
      
      try {
        const result = await IndexingOrchestrator.executeEnhancedIndexing(testNodes);
        const duration = Date.now() - startTime;
        
        results.push({
          nodeCount: size,
          duration: duration,
          memoryUsage: this.estimateMemoryUsage(result),
          throughput: size / duration
        });
      } catch (error) {
        results.push({
          nodeCount: size,
          duration: -1,
          memoryUsage: -1,
          throughput: 0,
          error: error.toString()
        });
      }
    }

    const score = this.calculatePerformanceScore(results);
    
    return {
      score: score,
      duration: results.reduce((sum, r) => sum + r.duration, 0),
      passed: score >= 70,
      details: results.map(r => 
        r.error ? `Size ${r.nodeCount}: ${r.error}` : 
        `Size ${r.nodeCount}: ${r.duration}ms, ${r.throughput.toFixed(2)} nodes/ms`
      )
    };
  }

  // Validation methods

  private static validateTemporalTimeline(index: any, nodes: ForensicNode[]): ValidationResult {
    const hasTimeline = index.nodeTimeline && index.nodeTimeline.size > 0;
    const correctCount = index.nodeTimeline.size === nodes.length;
    
    return {
      passed: hasTimeline && correctCount,
      description: 'Temporal timeline validation',
      score: hasTimeline && correctCount ? 100 : 0
    };
  }

  private static validatePatternShifts(index: any): ValidationResult {
    const hasShifts = index.patternEvolution && index.patternEvolution.size > 0;
    const correctTypes = index.patternEvolution.has('DOCTRINAL') || 
                        index.patternEvolution.has('TACTICAL') ||
                        index.patternEvolution.has('PROFILE');
    
    return {
      passed: hasShifts && correctTypes,
      description: 'Pattern shift detection validation',
      score: hasShifts && correctTypes ? 100 : 0
    };
  }

  private static validateAnomalyDetection(index: any): ValidationResult {
    const hasAnomalies = Array.isArray(index.behavioralAnomalies);
    const reasonableCount = index.behavioralAnomalies.length >= 0;
    
    return {
      passed: hasAnomalies && reasonableCount,
      description: 'Anomaly detection validation',
      score: hasAnomalies && reasonableCount ? 100 : 0
    };
  }

  private static validateDateParsing(index: any): ValidationResult {
    const allEventsHaveDates = Array.from(index.nodeTimeline.values())
      .flat()
      .every(event => event.timestamp && new Date(event.timestamp) instanceof Date);
    
    return {
      passed: allEventsHaveDates,
      description: 'Date parsing validation',
      score: allEventsHaveDates ? 100 : 0
    };
  }

  private static validateEntityExtraction(resolution: any, nodes: ForensicNode[]): ValidationResult {
    const hasEntities = resolution.entities && resolution.entities.length > 0;
    const hasCorrectTypes = resolution.entities.every((e: any) => 
      ['PERSON', 'ORGANIZATION', 'LOCATION', 'CONCEPT'].includes(e.entityType)
    );
    
    return {
      passed: hasEntities && hasCorrectTypes,
      description: 'Entity extraction validation',
      score: hasEntities && hasCorrectTypes ? 100 : 0
    };
  }

  private static validateEntityClustering(resolution: any): ValidationResult {
    const hasClusters = resolution.entities.every((e: any) => 
      e.sourceNodes && Array.isArray(e.sourceNodes)
    );
    const reasonableClusters = resolution.entities.every((e: any) => 
      e.sourceNodes.length > 0
    );
    
    return {
      passed: hasClusters && reasonableClusters,
      description: 'Entity clustering validation',
      score: hasClusters && reasonableClusters ? 100 : 0
    };
  }

  private static validateAliasDetection(resolution: any): ValidationResult {
    const hasAliases = resolution.aliases && resolution.aliases.length > 0;
    const validAliases = resolution.aliases.every((a: any) => 
      a.entityId && a.alias && a.confidence
    );
    
    return {
      passed: hasAliases && validAliases,
      description: 'Alias detection validation',
      score: hasAliases && validAliases ? 100 : 0
    };
  }

  private static validateRelationshipBuilding(resolution: any): ValidationResult {
    const hasRelationships = resolution.relationships && resolution.relationships.length > 0;
    const validRelationships = resolution.relationships.every((r: any) => 
      r.fromEntity && r.toEntity && r.relationshipType
    );
    
    return {
      passed: hasRelationships && validRelationships,
      description: 'Relationship building validation',
      score: hasRelationships && validRelationships ? 100 : 0
    };
  }

  private static validateSemanticLayers(analysis: any): ValidationResult {
    const hasLayers = analysis.semanticLayers && analysis.semanticLayers.length > 0;
    const correctLayerTypes = analysis.semanticLayers.every((layer: any) => 
      ['SURFACE', 'CONTEXTUAL', 'LATENT'].includes(layer.layerType)
    );
    
    return {
      passed: hasLayers && correctLayerTypes,
      description: 'Semantic layers validation',
      score: hasLayers && correctLayerTypes ? 100 : 0
    };
  }

  private static validateConceptDrift(analysis: any): ValidationResult {
    const hasDrifts = Array.isArray(analysis.conceptDrift);
    const validDrifts = analysis.conceptDrift.every((d: any) => 
      d.concept && d.fromMeaning && d.toMeaning && d.driftType
    );
    
    return {
      passed: hasDrifts && validDrifts,
      description: 'Concept drift validation',
      score: hasDrifts && validDrifts ? 100 : 0
    };
  }

  private static validateCrossDomainLinks(analysis: any): ValidationResult {
    const hasLinks = analysis.crossDomainKnowledge && analysis.crossDomainKnowledge.length > 0;
    const validLinks = analysis.crossDomainKnowledge.every((l: any) => 
      l.fromDomain && l.toDomain && l.connectionType
    );
    
    return {
      passed: hasLinks && validLinks,
      description: 'Cross-domain links validation',
      score: hasLinks && validLinks ? 100 : 0
    };
  }

  private static validateLatentPatterns(analysis: any): ValidationResult {
    const hasPatterns = Array.isArray(analysis.latentPatterns);
    const validPatterns = analysis.latentPatterns.every((p: any) => 
      p.patternId && p.patternType && p.description
    );
    
    return {
      passed: hasPatterns && validPatterns,
      description: 'Latent patterns validation',
      score: hasPatterns && validPatterns ? 100 : 0
    };
  }

  private static validateEnhancedDiagnostics(diagnostics: any): ValidationResult {
    const hasAllMetrics = diagnostics.structuralIntegrity !== undefined &&
                         diagnostics.temporalConsistency !== undefined &&
                         diagnostics.entityResolutionQuality !== undefined &&
                         diagnostics.semanticCoherence !== undefined &&
                         diagnostics.crossDomainIntegration !== undefined;
    
    const validRanges = Object.values(diagnostics).every(v => 
      typeof v === 'number' && v >= 0 && v <= 1
    );
    
    return {
      passed: hasAllMetrics && validRanges,
      description: 'Enhanced diagnostics validation',
      score: hasAllMetrics && validRanges ? 100 : 0
    };
  }

  private static validateIntegrationMetrics(metrics: any): ValidationResult {
    const hasAllMetrics = metrics.temporalCoverage !== undefined &&
                         metrics.entityCoverage !== undefined &&
                         metrics.semanticDepth !== undefined &&
                         metrics.crossReferenceQuality !== undefined &&
                         metrics.patternDetectionAccuracy !== undefined &&
                         metrics.anomalyDetectionSensitivity !== undefined;
    
    const validRanges = Object.values(metrics).every(v => 
      typeof v === 'number' && v >= 0 && v <= 1
    );
    
    return {
      passed: hasAllMetrics && validRanges,
      description: 'Integration metrics validation',
      score: hasAllMetrics && validRanges ? 100 : 0
    };
  }

  private static validateLinkQuality(links: any[]): ValidationResult {
    const hasLinks = links && links.length > 0;
    const validLinks = links.every(link => 
      link.source && link.target && typeof link.weight === 'number'
    );
    const reasonableWeights = links.every(link => 
      link.weight >= 0 && link.weight <= 1
    );
    
    return {
      passed: hasLinks && validLinks && reasonableWeights,
      description: 'Link quality validation',
      score: hasLinks && validLinks && reasonableWeights ? 100 : 0
    };
  }

  private static validateIndexCompleteness(result: any): ValidationResult {
    const hasAllComponents = result.links && 
                            result.temporalIndex &&
                            result.entityResolution &&
                            result.semanticAnalysis &&
                            result.enhancedDiagnostics &&
                            result.integrationMetrics;
    
    const noEmptyComponents = Object.values(result).every(component => 
      component !== null && component !== undefined
    );
    
    return {
      passed: hasAllComponents && noEmptyComponents,
      description: 'Index completeness validation',
      score: hasAllComponents && noEmptyComponents ? 100 : 0
    };
  }

  // Test data creation methods

  private static createTemporalTestNodes(): ForensicNode[] {
    return [
      {
        id: 'test-1',
        type: NodeType.DOCTRINE,
        title: 'Test Doctrine 1',
        themes: ['Test'],
        excerpt: 'Test excerpt',
        content: 'This is a test content with MMXXIV references.',
        metadata: { 
          classification: 'TEST', 
          date: 'MMXXIV.01', 
          vector: 'TEST',
          anchors: ['Test'],
          tier: 1,
          recordHash: 'test1'
        }
      },
      {
        id: 'test-2',
        type: NodeType.DOCTRINE,
        title: 'Test Doctrine 2',
        themes: ['Test'],
        excerpt: 'Test excerpt 2',
        content: 'This is another test with MMXXIV.02 references.',
        metadata: { 
          classification: 'TEST', 
          date: 'MMXXIV.02', 
          vector: 'TEST',
          anchors: ['Test'],
          tier: 1,
          recordHash: 'test2'
        }
      }
    ];
  }

  private static createEntityTestNodes(): ForensicNode[] {
    return [
      {
        id: 'entity-1',
        type: NodeType.PROFILE,
        title: 'John Doe Profile',
        themes: ['Person'],
        excerpt: 'Profile of John Doe',
        content: 'John Doe works with Jane Smith at Acme Corp. John is a key figure in the organization.',
        metadata: { 
          classification: 'TEST', 
          date: 'MMXXIV', 
          vector: 'TEST',
          anchors: ['Person'],
          tier: 1,
          recordHash: 'entity1'
        }
      },
      {
        id: 'entity-2',
        type: NodeType.PROFILE,
        title: 'Jane Smith Profile',
        themes: ['Person'],
        excerpt: 'Profile of Jane Smith',
        content: 'Jane Smith collaborates with John at Acme Corporation. She is also known as Janie.',
        metadata: { 
          classification: 'TEST', 
          date: 'MMXXIV', 
          vector: 'TEST',
          anchors: ['Person'],
          tier: 1,
          recordHash: 'entity2'
        }
      }
    ];
  }

  private static createSemanticTestNodes(): ForensicNode[] {
    return [
      {
        id: 'semantic-1',
        type: NodeType.DOCTRINE,
        title: 'Concept Analysis',
        themes: ['Analysis'],
        excerpt: 'Analysis of concepts',
        content: 'The mind is like a computer. This metaphor helps understand cognition.',
        metadata: { 
          classification: 'TEST', 
          date: 'MMXXIV', 
          vector: 'TEST',
          anchors: ['Analysis'],
          tier: 1,
          recordHash: 'semantic1'
        }
      },
      {
        id: 'semantic-2',
        type: NodeType.DOCTRINE,
        title: 'Cognitive Framework',
        themes: ['Framework'],
        excerpt: 'Framework for understanding',
        content: 'Understanding cognition is similar to understanding software. This analogy provides insight.',
        metadata: { 
          classification: 'TEST', 
          date: 'MMXXIV', 
          vector: 'TEST',
          anchors: ['Framework'],
          tier: 1,
          recordHash: 'semantic2'
        }
      }
    ];
  }

  private static createIntegrationTestNodes(): ForensicNode[] {
    // Use the actual VAULT_NODES for comprehensive testing
    const { VAULT_NODES } = require('../data/archive');
    return VAULT_NODES.slice(0, 20); // Test with first 20 nodes
  }

  private static createPerformanceTestNodes(count: number): ForensicNode[] {
    const nodes: ForensicNode[] = [];
    
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: `perf-${i}`,
        type: NodeType.DOCTRINE,
        title: `Performance Test ${i}`,
        themes: ['Performance'],
        excerpt: `Test node ${i}`,
        content: `This is performance test content ${i} with various patterns and entities.`,
        metadata: { 
          classification: 'PERF', 
          date: 'MMXXIV', 
          vector: 'PERF',
          anchors: ['Performance'],
          tier: 1,
          recordHash: `perf${i}`
        }
      });
    }
    
    return nodes;
  }

  // Utility methods

  private static calculateTestScore(tests: ValidationResult[]): number {
    const totalScore = tests.reduce((sum, test) => sum + test.score, 0);
    return Math.round(totalScore / tests.length);
  }

  private static calculateOverallScore(results: TestResults): number {
    const scores = [
      results.temporalIndexing.score,
      results.entityResolution.score,
      results.semanticAnalysis.score,
      results.integrationPipeline.score,
      results.performanceBenchmark.score
    ];
    
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  private static calculatePerformanceScore(results: PerformanceResult[]): number {
    const maxDuration = 10000; // 10 seconds max acceptable
    const scores = results.map(r => {
      if (r.error) return 0;
      if (r.duration > maxDuration) return 0;
      return Math.max(0, 100 - (r.duration / maxDuration * 100));
    });
    
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  private static estimateMemoryUsage(result: any): number {
    // Simple estimation based on result size
    const jsonString = JSON.stringify(result);
    return jsonString.length * 2; // Rough estimate in bytes
  }
}

// Type definitions
interface TestResults {
  temporalIndexing: TestResult;
  entityResolution: TestResult;
  semanticAnalysis: TestResult;
  integrationPipeline: TestResult;
  performanceBenchmark: TestResult;
  overallScore: number;
}

interface TestResult {
  score: number;
  duration: number;
  passed: boolean;
  details: string[];
}

interface ValidationResult {
  passed: boolean;
  description: string;
  score: number;
}

interface PerformanceResult {
  nodeCount: number;
  duration: number;
  memoryUsage: number;
  throughput: number;
  error?: string;
}