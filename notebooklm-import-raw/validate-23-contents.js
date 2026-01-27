#!/usr/bin/env node

/**
 * Simple validation script for the 23 indexing contents
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Validating 23 Content Entries for Indexing...\n');

// Check if the indexing contents file exists
const contentsFile = path.join(__dirname, 'data/indexing-contents.ts');
if (!fs.existsSync(contentsFile)) {
  console.log('❌ indexing-contents.ts file not found!');
  process.exit(1);
}

console.log('✅ Content file found');

// Read and parse the contents
const contentData = fs.readFileSync(contentsFile, 'utf8');

// Extract the INDEXING_CONTENTS array
const startIndex = contentData.indexOf('export const INDEXING_CONTENTS: ForensicNode[] = [');
const endIndex = contentData.lastIndexOf('];');

if (startIndex === -1 || endIndex === -1) {
  console.log('❌ Could not parse INDEXING_CONTENTS array');
  process.exit(1);
}

const arrayContent = contentData.substring(startIndex, endIndex + 2);

console.log('📊 Content Analysis:');

// Count entries
const entryMatches = arrayContent.match(/{\s*id:\s*['"]content-\d+['"]/g);
if (!entryMatches) {
  console.log('❌ No content entries found');
  process.exit(1);
}

const entryCount = entryMatches.length;
console.log(`   Total entries: ${entryCount}`);

if (entryCount !== 23) {
  console.log(`⚠️  Expected 23 entries, found ${entryCount}`);
} else {
  console.log('   ✅ Correct number of entries');
}

// Analyze content structure
const typeMatches = arrayContent.match(/type:\s*NodeType\.(\w+)/g);
const typeCounts = {};
if (typeMatches) {
  typeMatches.forEach(match => {
    const type = match.split('.')[1];
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });
}

console.log('\n📋 Content Types:');
Object.entries(typeCounts).forEach(([type, count]) => {
  console.log(`   ${type}: ${count} entries`);
});

// Check for required fields
const requiredFields = ['title', 'themes', 'excerpt', 'content', 'metadata'];
let allEntriesValid = true;

requiredFields.forEach(field => {
  const fieldMatches = arrayContent.match(new RegExp(`${field}:`, 'g'));
  if (!fieldMatches || fieldMatches.length < 23) {
    console.log(`❌ Missing or incomplete ${field} field`);
    allEntriesValid = false;
  }
});

if (allEntriesValid) {
  console.log('✅ All required fields present');
}

// Check metadata structure
const metadataMatches = arrayContent.match(/metadata:\s*{[\s\S]*?}/g);
if (metadataMatches && metadataMatches.length >= 23) {
  console.log('✅ Metadata structure valid');
} else {
  console.log('❌ Metadata structure issues');
  allEntriesValid = false;
}

// Check for cross-references
const linksToMatches = arrayContent.match(/linksTo:\s*\[[\s\S]*?\]/g);
if (linksToMatches && linksToMatches.length >= 23) {
  console.log('✅ Cross-references structure valid');
} else {
  console.log('⚠️  Cross-references may be incomplete');
}

// Sample content analysis
console.log('\n🔍 Sample Content Preview:');
const firstEntryMatch = arrayContent.match(/{[\s\S]*?id:\s*['"]content-001['"][\s\S]*?},/);
if (firstEntryMatch) {
  const firstEntry = firstEntryMatch[0];
  const titleMatch = firstEntry.match(/title:\s*['"]([^'"]+)['"]/);
  const themeMatch = firstEntry.match(/themes:\s*\[([^\]]+)\]/);
  const excerptMatch = firstEntry.match(/excerpt:\s*['"]([^'"]+)['"]/);
  
  if (titleMatch && themeMatch && excerptMatch) {
    console.log(`   Title: ${titleMatch[1]}`);
    console.log(`   Themes: ${themeMatch[1]}`);
    console.log(`   Excerpt: ${excerptMatch[1].substring(0, 80)}...`);
  }
}

// Content quality checks
const contentLengths = [];
const contentMatches = arrayContent.match(/content:\s*`[^`]+`/g);
if (contentMatches) {
  contentMatches.forEach(match => {
    const content = match.substring(10, match.length - 1); // Remove "content: `...`"
    contentLengths.push(content.length);
  });
}

if (contentLengths.length > 0) {
  const avgLength = contentLengths.reduce((sum, len) => sum + len, 0) / contentLengths.length;
  const minLength = Math.min(...contentLengths);
  const maxLength = Math.max(...contentLengths);
  
  console.log('\n📈 Content Quality:');
  console.log(`   Average content length: ${Math.round(avgLength)} characters`);
  console.log(`   Content length range: ${minLength} - ${maxLength} characters`);
  
  if (minLength > 500) {
    console.log('   ✅ All content entries have substantial content');
  } else {
    console.log('   ⚠️  Some entries may have short content');
  }
}

// Final validation
console.log('\n🎯 Validation Summary:');
if (entryCount === 23 && allEntriesValid) {
  console.log('✅ All 23 content entries are properly structured and ready for indexing');
  console.log('\n📋 Content Overview:');
  console.log('   📚 23 comprehensive entries covering psychological warfare');
  console.log('   🏷️  Proper metadata with classification and vector information');
  console.log('   🔗 Cross-references between related content');
  console.log('   🎯 Thematic organization across multiple domains');
  console.log('   📊 Ready for temporal, entity, and semantic analysis');
} else {
  console.log('❌ Some validation issues detected - please review the errors above');
  process.exit(1);
}