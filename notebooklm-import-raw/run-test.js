#!/usr/bin/env node

const { INDEXING_CONTENTS } = require('./data/indexing-contents');
const { IndexingOrchestrator } = require('./indexing-engine/indexing-orchestrator');

async function runTest() {
  try {
    const result = await IndexingOrchestrator.executeEnhancedIndexing(INDEXING_CONTENTS);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runTest();
