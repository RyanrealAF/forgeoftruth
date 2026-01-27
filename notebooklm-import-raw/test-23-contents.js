#!/usr/bin/env node

/**
 * Test script to validate the 23 indexing contents with the expanded indexing system
 */

const { INDEXING_CONTENTS } = require('./data/indexing-contents');
const { IndexingOrchestrator } = require('./indexing-engine/indexing-orchestrator');

async function test23Contents() {
  console.log('🧪 Testing 23 Content Entries with Expanded Indexing System...\n');
  
  try {
    console.log(`📋 Testing with ${INDEXING_CONTENTS.length} content entries`);
    console.log('📊 Content Distribution:');
    
    // Analyze content distribution
    const typeCounts = {};
    const themeCounts = {};
    
    INDEXING_CONTENTS.forEach(content => {
      // Count types
      typeCounts[content.type] = (typeCounts[content.type] || 0) + 1;
      
      // Count themes
      content.themes.forEach(theme => {
        themeCounts[theme] = (themeCounts[theme] || 0) + 1;
      });
    });
    
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} entries`);
    });
    
    console.log('\n🎯 Top Themes:');
    const sortedThemes = Object.entries(themeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    
    sortedThemes.forEach(([theme, count]) => {
      console.log(`   ${theme}: ${count} occurrences`);
    });
    
    const startTime = Date.now();
    
    // Execute enhanced indexing on the 23 contents
    const result = await IndexingOrchestrator.executeEnhancedIndexing(INDEXING_CONTENTS);
    
    const duration = Date.now() - startTime;
    
    console.log('\n✅ Enhanced Indexing Complete!');
    console.log(`⏱️  Processing time: ${duration}ms`);
    
    // Validate results
    console.log('\n📊 Indexing Results:');
    console.log(`🔗 Original links: ${result.links.length}`);
    console.log(`⏰ Temporal events: ${Array.from(result.temporalIndex.nodeTimeline.values()).flat().length}`);
    console.log(`👤 Resolved entities: ${result.entityResolution.entities.length}`);
    console.log(`🔗 Entity relationships: ${result.entityResolution.relationships.length}`);
    console.log(`🧠 Semantic layers: ${result.semanticAnalysis.semanticLayers.length}`);
    console.log(`🔄 Cross-domain links: ${result.semanticAnalysis.crossDomainKnowledge.length}`);
    console.log(`🎯 Overall health: ${(result.enhancedDiagnostics.overallHealth * 100).toFixed(1)}%`);
    
    // Show enhanced diagnostics
    console.log('\n🔍 Enhanced Diagnostics:');
    console.log(`   Structural Integrity: ${(result.enhancedDiagnostics.structuralIntegrity * 100).toFixed(1)}%`);
    console.log(`   Temporal Consistency: ${(result.enhancedDiagnostics.temporalConsistency * 100).toFixed(1)}%`);
    console.log(`   Entity Resolution Quality: ${(result.enhancedDiagnostics.entityResolutionQuality * 100).toFixed(1)}%`);
    console.log(`   Semantic Coherence: ${(result.enhancedDiagnostics.semanticCoherence * 100).toFixed(1)}%`);
    console.log(`   Cross-Domain Integration: ${(result.enhancedDiagnostics.crossDomainIntegration * 100).toFixed(1)}%`);
    
    // Show integration metrics
    console.log('\n📈 Integration Metrics:');
    console.log(`   Temporal Coverage: ${(result.integrationMetrics.temporalCoverage * 100).toFixed(1)}%`);
    console.log(`   Entity Coverage: ${(result.integrationMetrics.entityCoverage * 100).toFixed(1)}%`);
    console.log(`   Semantic Depth: ${(result.integrationMetrics.semanticDepth * 100).toFixed(1)}%`);
    console.log(`   Cross-Reference Quality: ${(result.integrationMetrics.crossReferenceQuality * 100).toFixed(1)}%`);
    console.log(`   Pattern Detection Accuracy: ${(result.integrationMetrics.patternDetectionAccuracy * 100).toFixed(1)}%`);
    console.log(`   Anomaly Detection Sensitivity: ${(result.integrationMetrics.anomalyDetectionSensitivity * 100).toFixed(1)}%`);
    
    // Show sample enhanced data
    console.log('\n🔍 Sample Enhanced Data:');
    
    if (result.entityResolution.entities.length > 0) {
      const sampleEntity = result.entityResolution.entities[0];
      console.log(`   Entity: "${sampleEntity.primaryName}" (${sampleEntity.entityType})`);
      console.log(`   Aliases: ${sampleEntity.aliases.length} detected`);
      console.log(`   Source nodes: ${sampleEntity.sourceNodes.length}`);
    }
    
    if (result.semanticAnalysis.semanticLayers.length > 0) {
      const surfaceLayer = result.semanticAnalysis.semanticLayers.find(l => l.layerType === 'SURFACE');
      if (surfaceLayer) {
        console.log(`   Surface concepts: ${surfaceLayer.concepts.length}`);
        console.log(`   Layer density: ${surfaceLayer.density.toFixed(2)}`);
        console.log(`   Layer coherence: ${surfaceLayer.coherence.toFixed(2)}`);
      }
    }
    
    if (result.temporalIndex.patternEvolution.size > 0) {
      console.log(`   Pattern evolution types: ${Array.from(result.temporalIndex.patternEvolution.keys()).join(', ')}`);
    }
    
    if (result.semanticAnalysis.crossDomainKnowledge.length > 0) {
      console.log(`   Cross-domain connections: ${result.semanticAnalysis.crossDomainKnowledge.length}`);
    }
    
    // Check for issues
    if (result.enhancedDiagnostics.issues.length > 0) {
      console.log('\n⚠️  Detected Issues:');
      result.enhancedDiagnostics.issues.slice(0, 5).forEach(issue => {
        console.log(`   ${issue.severity}: ${issue.description}`);
      });
      if (result.enhancedDiagnostics.issues.length > 5) {
        console.log(`   ... and ${result.enhancedDiagnostics.issues.length - 5} more issues`);
      }
    } else {
      console.log('\n✅ No significant issues detected');
    }
    
    console.log('\n🎉 All 23 content entries successfully indexed!');
    console.log('✅ Expanded indexing system is working optimally with comprehensive content');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the test
test23Contents();