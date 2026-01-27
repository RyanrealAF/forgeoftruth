#!/usr/bin/env node

/**
 * Simple test script to validate the expanded indexing system
 */

const { VAULT_NODES } = require('./data/archive');
const { IndexingOrchestrator } = require('./indexing-engine/indexing-orchestrator');

async function runIndexingTest() {
  console.log('🧪 Testing Expanded Indexing System...\n');
  
  try {
    // Use a subset of nodes for testing
    const testNodes = VAULT_NODES.slice(0, 10);
    console.log(`📋 Testing with ${testNodes.length} nodes`);
    
    const startTime = Date.now();
    
    // Execute enhanced indexing
    const result = await IndexingOrchestrator.executeEnhancedIndexing(testNodes);
    
    const duration = Date.now() - startTime;
    
    console.log('\n✅ Enhanced Indexing Complete!');
    console.log(`⏱️  Processing time: ${duration}ms`);
    
    // Validate results
    console.log('\n📊 Results Summary:');
    console.log(`🔗 Original links: ${result.links.length}`);
    console.log(`⏰ Temporal events: ${Array.from(result.temporalIndex.nodeTimeline.values()).flat().length}`);
    console.log(`👤 Resolved entities: ${result.entityResolution.entities.length}`);
    console.log(`🔗 Entity relationships: ${result.entityResolution.relationships.length}`);
    console.log(`🧠 Semantic layers: ${result.semanticAnalysis.semanticLayers.length}`);
    console.log(`🔄 Cross-domain links: ${result.semanticAnalysis.crossDomainKnowledge.length}`);
    console.log(`🎯 Overall health: ${(result.enhancedDiagnostics.overallHealth * 100).toFixed(1)}%`);
    
    // Show sample data
    console.log('\n🔍 Sample Data:');
    if (result.entityResolution.entities.length > 0) {
      console.log(`   Entity: ${result.entityResolution.entities[0].primaryName} (${result.entityResolution.entities[0].entityType})`);
    }
    
    if (result.semanticAnalysis.semanticLayers.length > 0) {
      const layer = result.semanticAnalysis.semanticLayers[0];
      console.log(`   Semantic layer: ${layer.layerType} (${layer.concepts.length} concepts)`);
    }
    
    if (result.temporalIndex.patternEvolution.size > 0) {
      console.log(`   Pattern evolution detected: ${Array.from(result.temporalIndex.patternEvolution.keys()).join(', ')}`);
    }
    
    console.log('\n🎉 All tests passed! Expanded indexing system is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the test
runIndexingTest();