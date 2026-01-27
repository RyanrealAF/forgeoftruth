
import { VAULT_NODES } from './data/archive';
import { INDEXING_CONTENTS } from './data/indexing-contents';
import { IndexingOrchestrator } from './indexing-engine/indexing-orchestrator';

async function main() {
  console.log('🚀 Running Full Indexing Pipeline...');
  const allNodes = [...VAULT_NODES, ...INDEXING_CONTENTS];
  console.log(`📦 Total nodes to process: ${allNodes.length}`);

  try {
    const result = await IndexingOrchestrator.executeEnhancedIndexing(allNodes);
    console.log('\n✅ Full Indexing Complete!');
    console.log(`🎯 Overall Health: ${(result.enhancedDiagnostics.overallHealth * 100).toFixed(1)}%`);
    console.log(`🔗 Total Links Generated: ${result.links.length}`);

    if (result.enhancedDiagnostics.issues.length > 0) {
      console.log('\n⚠️ Identified Issues:');
      result.enhancedDiagnostics.issues.forEach(issue => {
        console.log(`- [${issue.category}] ${issue.severity}: ${issue.description}`);
      });
    }
  } catch (error) {
    console.error('💥 Critical error during full indexing:', error);
    process.exit(1);
  }
}

main();
