
import { VAULT_NODES } from './data/archive';
import { INDEXING_CONTENTS } from './data/indexing-contents';
import * as fs from 'fs';
import * as path from 'path';

function main() {
  console.log('🚀 Generating Exhaustive Indexing List...\n');

  let report = '# Exhaustive Tactical Indexing Report\n\n';
  report += `*Generated on: ${new Date().toISOString()}*\n\n`;

  report += '## 1. Summary Metrics\n\n';
  report += `- **Total Vault Nodes:** ${VAULT_NODES.length}\n`;
  report += `- **Total Indexing Contents:** ${INDEXING_CONTENTS.length}\n`;
  report += `- **Unique Tactical IDs:** ${new Set([...VAULT_NODES.map(n => n.id), ...INDEXING_CONTENTS.map(n => n.id)]).size}\n`;

  report += '\n## 2. Primary Vault Nodes\n\n';
  report += '| ID | Title | Type | Vector |\n';
  report += '|----|-------|------|--------|\n';
  VAULT_NODES.forEach(node => {
    report += `| ${node.id} | ${node.title} | ${node.type} | ${node.metadata.vector} |\n`;
  });

  report += '\n## 3. Comprehensive Indexing Contents\n\n';
  report += '| ID | Title | Type | Vector |\n';
  report += '|----|-------|------|--------|\n';
  INDEXING_CONTENTS.forEach(node => {
    report += `| ${node.id} | ${node.title} | ${node.type} | ${node.metadata.vector} |\n`;
  });

  report += '\n## 4. Indexable Raw Documents (notebooklm-import-raw)\n\n';
  const rawDir = __dirname;
  const files = fs.readdirSync(rawDir);
  const docFiles = files.filter(f => f.endsWith('.txt') || (f.endsWith('.md') && f !== 'INDEX_REPORT.md'));

  report += '| Filename | Size (KB) | Potential Nodes |\n';
  report += '|----------|-----------|-----------------|\n';
  docFiles.forEach(file => {
    const stats = fs.statSync(path.join(rawDir, file));
    const sizeKB = (stats.size / 1024).toFixed(2);
    // Heuristic for potential nodes: count occurrences of "TACTIC:", "DOCTRINE:", etc.
    const content = fs.readFileSync(path.join(rawDir, file), 'utf8');
    const nodeMatches = content.match(/(?:TACTIC|DOCTRINE|PROFILE|CASE STUDY):/gi);
    const potentialCount = nodeMatches ? nodeMatches.length : 'Unstructured';

    report += `| ${file} | ${sizeKB} | ${potentialCount} |\n`;
  });

  const outputPath = path.join(rawDir, '..', 'INDEX_REPORT.md');
  fs.writeFileSync(outputPath, report);
  console.log(`✅ Exhaustive indexing list generated: ${outputPath}`);
}

main();
