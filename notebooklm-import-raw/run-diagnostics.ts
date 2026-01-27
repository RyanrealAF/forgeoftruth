
import { IndexingTests } from './indexing-engine/indexing-tests';

async function main() {
  console.log('🚀 Launching Comprehensive Diagnostics...\n');
  try {
    const results = await IndexingTests.runAllTests();
    console.log('\n-------------------------------------------');
    if (results.overallScore >= 80) {
      console.log('✅ SYSTEM HEALTH: OPTIMAL');
      console.log(`🎯 Final Score: ${results.overallScore}/100`);
    } else {
      console.log('⚠️ SYSTEM HEALTH: DEGRADED');
      console.log(`🎯 Final Score: ${results.overallScore}/100`);
      process.exit(1);
    }
  } catch (error) {
    console.error('💥 CRITICAL ERROR during diagnostics:', error);
    process.exit(1);
  }
}

main();
