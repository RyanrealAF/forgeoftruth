
import { VAULT_NODES } from './data/archive';
import { INDEXING_CONTENTS } from './data/indexing-contents';
import { NodeType } from './types';
import { EntityResolver } from './indexing-engine/entity-resolver';
import { SemanticAnalyzer } from './indexing-engine/semantic-analyzer';
import * as fs from 'fs';
import * as path from 'path';

function escapeSql(str: string): string {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

async function main() {
  console.log('🚀 Generating D1 Seed SQL (Kinetic Codex Edition)...');

  let sql = '-- D1 Seed Data for Tactical Index\n';
  sql += '-- Generated from Forensic Nodes and Semantic Analysis\n\n';

  // 1. Modules
  sql += 'INSERT INTO modules (id, sequence, title, phase, focus) VALUES \n';
  sql += "('mod-doctrine', 1, 'Core Doctrine', 'DOCTRINE', 'Foundational principles and cognitive firewalls'),\n";
  sql += "('mod-reflection', 2, 'Analytical Reflection', 'REFLECTION', 'Deconstructing patterns and case studies'),\n";
  sql += "('mod-endgame', 3, 'Strategic Endgame', 'ENDGAME', 'Advanced counter-tactics and network neutralization');\n\n";

  const allNodes = [...VAULT_NODES, ...INDEXING_CONTENTS];

  // 2. Lessons
  sql += 'INSERT INTO lessons (id, module_id, sequence, title, tactical_concept, historical_validator, content_json, difficulty_level, estimated_duration_minutes) VALUES \n';

  const lessonValues: string[] = [];
  allNodes.forEach((node, index) => {
    let moduleId = 'mod-reflection';
    if (node.type === NodeType.DOCTRINE) moduleId = 'mod-doctrine';
    else if (node.type === NodeType.TACTIC) moduleId = 'mod-endgame';

    const sequence = index + 1;
    const title = escapeSql(node.title);
    const tactical_concept = escapeSql(node.excerpt);
    const historical_validator = escapeSql(node.metadata.recordHash || (node.metadata as any).date);
    const content_json = escapeSql(JSON.stringify({
      content: node.content,
      themes: node.themes,
      linksTo: node.linksTo,
      metadata: node.metadata
    }));
    const difficulty = node.metadata.tier || 1;
    const duration = 30 + (difficulty * 15);

    lessonValues.push(`('${node.id}', '${moduleId}', ${sequence}, '${title}', '${tactical_concept}', '${historical_validator}', '${content_json}', ${difficulty}, ${duration})`);
  });

  sql += lessonValues.join(',\n') + ';\n\n';

  // 3. Concepts (Extracted via EntityResolver)
  console.log('🔍 Extracting concepts...');
  const entityResolution = EntityResolver.resolveEntities(allNodes);
  if (entityResolution.entities.length > 0) {
    sql += 'INSERT OR IGNORE INTO concepts (term, definition, category) VALUES \n';
    const conceptValues = entityResolution.entities.map(entity => {
      return `('${escapeSql(entity.primaryName)}', '${escapeSql(entity.primaryName)}', '${escapeSql(entity.entityType)}')`;
    });
    sql += conceptValues.join(',\n') + ';\n\n';
  }

  // 4. Concept Relationships (Extracted via SemanticAnalyzer)
  console.log('🧠 Analyzing relationships...');
  const semanticAnalysis = SemanticAnalyzer.analyzeSemantics(allNodes);
  if (semanticAnalysis.crossDomainKnowledge.length > 0) {
    sql += 'INSERT OR IGNORE INTO concept_relationships (source_term, target_term, relationship_type, rationale) VALUES \n';
    const relationValues = semanticAnalysis.crossDomainKnowledge.map(link => {
      return `('${escapeSql(link.fromDomain)}', '${escapeSql(link.toDomain)}', '${escapeSql(link.connectionType)}', '${escapeSql(link.explanation)}')`;
    });
    sql += relationValues.join(',\n') + ';\n\n';
  }

  // 5. Tactical References
  sql += 'INSERT INTO tactical_references (id, lesson_id, reference_type, title, description) VALUES \n';
  const refValues: string[] = [];
  allNodes.forEach(node => {
    if (node.metadata.anchors && node.metadata.anchors.length > 0) {
      node.metadata.anchors.forEach((anchor, i) => {
        const refId = `ref-${node.id}-${i}`;
        const refTitle = escapeSql(anchor);
        const type = 'CASE_STUDY';
        refValues.push(`('${refId}', '${node.id}', '${type}', '${refTitle}', 'Anchor for ${escapeSql(node.title)}')`);
      });
    }
  });

  sql += refValues.join(',\n') + ';\n';

  const outputPath = path.join(__dirname, '..', 'seed_kinetic_codex.sql');
  fs.writeFileSync(outputPath, sql);
  console.log(`✅ D1 Seed generated at ${outputPath}`);
}

main().catch(console.error);
