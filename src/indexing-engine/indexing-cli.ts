#!/usr/bin/env node

import { ForensicNode, NodeType, TacticalVector } from '../types';
import { IndexingOrchestrator, EnhancedIndexingResult } from './indexing-orchestrator';
import { ValidationFramework } from './validation-framework';
import { MonitoringDashboard } from './monitoring-dashboard';
import { IndexingTests } from './indexing-tests';
import { IndexingAPI } from './indexing-api';
import * as fs from 'fs';
import * as path from 'path';

/**
 * COMPREHENSIVE INDEXING CLI
 * Command-line interface for the enhanced indexing system
 */
export class IndexingCLI {
  
  /**
   * Main CLI entry point
   */
  static async run(): Promise<void> {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command) {
      this.showHelp();
      return;
    }

    try {
      switch (command) {
        case 'index':
          await this.executeIndexing(args.slice(1));
          break;
        case 'validate':
          await this.validateContent(args.slice(1));
          break;
        case 'dashboard':
          await this.generateDashboard(args.slice(1));
          break;
        case 'test':
          await this.runTestSuite(args.slice(1));
          break;
        case 'batch-validate':
          await this.batchValidate(args.slice(1));
          break;
        case 'batch-index':
          await this.batchIndex(args.slice(1));
          break;
        case 'optimize':
          await this.optimizeIndex(args.slice(1));
          break;
        case 'health':
          this.showHealth();
          break;
        case 'metrics':
          this.showMetrics();
          break;
        case 'help':
        case '--help':
        case '-h':
          this.showHelp();
          break;
        default:
          console.error(`❌ Unknown command: ${command}`);
          this.showHelp();
          process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Command failed: ${error}`);
      process.exit(1);
    }
  }

  /**
   * Execute indexing pipeline
   */
  private static async executeIndexing(args: string[]): Promise<void> {
    const inputFile = this.getOption(args, '--input', '-i');
    const outputFile = this.getOption(args, '--output', '-o');
    const format = this.getOption(args, '--format', '-f') || 'json';

    if (!inputFile) {
      console.error('❌ Input file required. Use --input or -i');
      process.exit(1);
    }

    console.log(`🚀 Executing indexing for ${inputFile}...`);

    const nodes = this.loadNodesFromFile(inputFile);
    const result = await IndexingAPI.executeIndexing(nodes);

    if (outputFile) {
      this.saveResultToFile(outputFile, result, format);
      console.log(`✅ Results saved to ${outputFile}`);
    } else {
      console.log('✅ Indexing complete:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Validate individual content
   */
  private static async validateContent(args: string[]): Promise<void> {
    const inputFile = this.getOption(args, '--input', '-i');
    const outputFile = this.getOption(args, '--output', '-o');
    const format = this.getOption(args, '--format', '-f') || 'json';

    if (!inputFile) {
      console.error('❌ Input file required. Use --input or -i');
      process.exit(1);
    }

    console.log(`✅ Validating content from ${inputFile}...`);

    const node = this.loadNodeFromFile(inputFile);
    const result = await IndexingAPI.validateContent(node);

    if (outputFile) {
      this.saveResultToFile(outputFile, result, format);
      console.log(`✅ Results saved to ${outputFile}`);
    } else {
      console.log('✅ Validation complete:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Generate monitoring dashboard
   */
  private static async generateDashboard(args: string[]): Promise<void> {
    const inputFile = this.getOption(args, '--input', '-i');
    const outputFile = this.getOption(args, '--output', '-o');
    const format = this.getOption(args, '--format', '-f') || 'json';

    if (!inputFile) {
      console.error('❌ Input file required. Use --input or -i');
      process.exit(1);
    }

    console.log(`📊 Generating dashboard for ${inputFile}...`);

    const nodes = this.loadNodesFromFile(inputFile);
    const result = await IndexingAPI.generateDashboard(nodes);

    if (outputFile) {
      this.saveResultToFile(outputFile, result, format);
      console.log(`✅ Dashboard saved to ${outputFile}`);
    } else {
      console.log('✅ Dashboard generated:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Run test suite
   */
  private static async runTestSuite(args: string[]): Promise<void> {
    const outputFile = this.getOption(args, '--output', '-o');
    const format = this.getOption(args, '--format', '-f') || 'json';

    console.log('🧪 Running comprehensive test suite...');

    const result = await IndexingAPI.runTestSuite();

    if (outputFile) {
      this.saveResultToFile(outputFile, result, format);
      console.log(`✅ Test results saved to ${outputFile}`);
    } else {
      console.log('✅ Test suite complete:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Batch validate multiple nodes
   */
  private static async batchValidate(args: string[]): Promise<void> {
    const inputFile = this.getOption(args, '--input', '-i');
    const outputFile = this.getOption(args, '--output', '-o');
    const format = this.getOption(args, '--format', '-f') || 'json';

    if (!inputFile) {
      console.error('❌ Input file required. Use --input or -i');
      process.exit(1);
    }

    console.log(`✅ Batch validating ${inputFile}...`);

    const nodes = this.loadNodesFromFile(inputFile);
    const result = await IndexingAPI.batchValidate(nodes);

    if (outputFile) {
      this.saveResultToFile(outputFile, result, format);
      console.log(`✅ Batch validation results saved to ${outputFile}`);
    } else {
      console.log('✅ Batch validation complete:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Batch index multiple nodes
   */
  private static async batchIndex(args: string[]): Promise<void> {
    const inputFile = this.getOption(args, '--input', '-i');
    const outputFile = this.getOption(args, '--output', '-o');
    const format = this.getOption(args, '--format', '-f') || 'json';

    if (!inputFile) {
      console.error('❌ Input file required. Use --input or -i');
      process.exit(1);
    }

    console.log(`🚀 Batch indexing ${inputFile}...`);

    const nodes = this.loadNodesFromFile(inputFile);
    const result = await IndexingAPI.batchIndex(nodes);

    if (outputFile) {
      this.saveResultToFile(outputFile, result, format);
      console.log(`✅ Batch indexing results saved to ${outputFile}`);
    } else {
      console.log('✅ Batch indexing complete:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Optimize existing index
   */
  private static async optimizeIndex(args: string[]): Promise<void> {
    const inputFile = this.getOption(args, '--input', '-i');
    const outputFile = this.getOption(args, '--output', '-o');
    const format = this.getOption(args, '--format', '-f') || 'json';

    if (!inputFile) {
      console.error('❌ Input file required. Use --input or -i');
      process.exit(1);
    }

    console.log(`🔧 Optimizing index from ${inputFile}...`);

    const optimizationData = this.loadOptimizationDataFromFile(inputFile);
    const result = await IndexingAPI.optimizeIndex(
      optimizationData.links,
      optimizationData.diagnostics,
      optimizationData.metrics,
      optimizationData.validationResults
    );

    if (outputFile) {
      this.saveResultToFile(outputFile, result, format);
      console.log(`✅ Optimized index saved to ${outputFile}`);
    } else {
      console.log('✅ Index optimization complete:');
      console.log(JSON.stringify(result, null, 2));
    }
  }

  /**
   * Show system health
   */
  private static showHealth(): void {
    const health = IndexingAPI.getHealthStatus();
    console.log('🏥 System Health Status:');
    console.log(JSON.stringify(health, null, 2));
  }

  /**
   * Show system metrics
   */
  private static showMetrics(): void {
    const metrics = IndexingAPI.getSystemMetrics();
    console.log('📊 System Metrics:');
    console.log(JSON.stringify(metrics, null, 2));
  }

  /**
   * Show help information
   */
  private static showHelp(): void {
    console.log(`
🎯 FORGE OF TRUTH - INDEXING CLI

Usage: indexing-cli <command> [options]

Commands:
  index [options]              Execute complete indexing pipeline
  validate [options]           Validate individual content node
  dashboard [options]          Generate monitoring dashboard
  test [options]               Run comprehensive test suite
  batch-validate [options]     Validate multiple content nodes
  batch-index [options]        Execute indexing for multiple nodes
  optimize [options]           Optimize existing index
  health                       Show system health status
  metrics                      Show system metrics
  help, --help, -h             Show this help message

Options:
  --input, -i <file>           Input file path
  --output, -o <file>          Output file path
  --format, -f <format>        Output format (json, yaml) [default: json]

Examples:
  indexing-cli index --input nodes.json --output result.json
  indexing-cli validate --input node.json --output validation.json
  indexing-cli dashboard --input nodes.json --output dashboard.json
  indexing-cli test --output test-results.json
  indexing-cli batch-validate --input nodes.json --output batch-results.json
  indexing-cli health
  indexing-cli metrics

File Formats:
  Input files should be JSON arrays of ForensicNode objects
  Output files will be saved in the specified format

Exit Codes:
  0    Success
  1    Error occurred
  2    Invalid arguments
    `);
  }

  /**
   * Load nodes from JSON file
   */
  private static loadNodesFromFile(filePath: string): ForensicNode[] {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Input file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    try {
      const data = JSON.parse(content);
      if (!Array.isArray(data)) {
        throw new Error('Input file must contain a JSON array');
      }
      return data as ForensicNode[];
    } catch (error) {
      throw new Error(`Failed to parse JSON file: ${error}`);
    }
  }

  /**
   * Load single node from JSON file
   */
  private static loadNodeFromFile(filePath: string): ForensicNode {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Input file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    try {
      const data = JSON.parse(content);
      if (Array.isArray(data)) {
        throw new Error('Input file contains an array, expected a single object');
      }
      return data as ForensicNode;
    } catch (error) {
      throw new Error(`Failed to parse JSON file: ${error}`);
    }
  }

  /**
   * Load optimization data from JSON file
   */
  private static loadOptimizationDataFromFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Input file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to parse JSON file: ${error}`);
    }
  }

  /**
   * Save result to file
   */
  private static saveResultToFile(filePath: string, result: any, format: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let content: string;
    if (format.toLowerCase() === 'yaml' || format.toLowerCase() === 'yml') {
      try {
        const yaml = require('yaml');
        content = yaml.stringify(result);
      } catch (error) {
        console.warn('⚠️  YAML format requested but yaml package not available, using JSON');
        content = JSON.stringify(result, null, 2);
      }
    } else {
      content = JSON.stringify(result, null, 2);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }

  /**
   * Get option value from command line arguments
   */
  private static getOption(args: string[], longForm: string, shortForm?: string): string | null {
    for (let i = 0; i < args.length; i++) {
      if (args[i] === longForm || (shortForm && args[i] === shortForm)) {
        return args[i + 1] || null;
      }
    }
    return null;
  }
}

// CLI entry point
if (require.main === module) {
  IndexingCLI.run().catch(error => {
    console.error('❌ CLI execution failed:', error);
    process.exit(1);
  });
}

export default IndexingCLI;