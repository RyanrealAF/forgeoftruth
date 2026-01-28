import { D1Database } from '@cloudflare/workers-types';

// Import types and interfaces
import { 
  ContentMetadata, 
  QualityMetrics, 
  ValidationResults, 
  SemanticEntities,
  CrossReferences 
} from './types';

// Import indexing engine modules
import { IndexingEngine } from './indexing-engine/indexing-engine';
import { QualityFramework } from './indexing-engine/quality-framework';
import { SemanticAnalyzer } from './indexing-engine/semantic-analyzer';
import { TemporalIndexer } from './indexing-engine/temporal-indexer';
import { EntityResolver } from './indexing-engine/entity-resolver';

export interface IndexingIntegration {
  db: D1Database;
  engine: IndexingEngine;
  qualityFramework: QualityFramework;
  semanticAnalyzer: SemanticAnalyzer;
  temporalIndexer: TemporalIndexer;
  entityResolver: EntityResolver;
}

/**
 * Integration layer between the tactical curriculum database and the NotebookLM indexing engine
 */
export class IndexingIntegration {
  constructor(db: D1Database) {
    this.db = db;
    this.engine = new IndexingEngine();
    this.qualityFramework = new QualityFramework();
    this.semanticAnalyzer = new SemanticAnalyzer();
    this.temporalIndexer = new TemporalIndexer();
    this.entityResolver = new EntityResolver();
  }

  /**
   * Process all existing curriculum content through the indexing pipeline
   */
  async processAllContent(): Promise<{
    processed: number;
    indexed: number;
    errors: string[];
  }> {
    console.log('🚀 Starting comprehensive content indexing...');

    try {
      // Get all lesson content
      const contentResults = await this.db.prepare(`
        SELECT lc.id, lc.content_text, lc.content_type, lc.lesson_id, l.title as lesson_title
        FROM lesson_content lc
        JOIN lessons l ON lc.lesson_id = l.id
        WHERE lc.content_text IS NOT NULL AND lc.content_text != ''
      `).all();

      const contentItems = contentResults.results || [];
      console.log(`📋 Found ${contentItems.length} content items to process`);

      let processed = 0;
      let indexed = 0;
      const errors: string[] = [];

      for (const content of contentItems) {
        try {
          processed++;
          console.log(`🔄 Processing content ${processed}/${contentItems.length}: ${content.lesson_title}`);

          // Process through indexing pipeline
          const result = await this.processContent(content);
          
          if (result.success) {
            indexed++;
            console.log(`✅ Indexed: ${content.lesson_title}`);
          } else {
            errors.push(`Failed to index ${content.lesson_title}: ${result.error}`);
          }

        } catch (error) {
          errors.push(`Error processing ${content.lesson_title}: ${error}`);
          console.error(`❌ Error processing content:`, error);
        }
      }

      console.log(`📊 Indexing complete: ${indexed}/${processed} successful`);
      return { processed, indexed, errors };

    } catch (error) {
      console.error('❌ Failed to process all content:', error);
      throw error;
    }
  }

  /**
   * Process a single content item through the indexing pipeline
   */
  async processContent(content: {
    id: string;
    content_text: string;
    content_type: string;
    lesson_id: string;
    lesson_title: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      // Step 1: Create indexing metadata
      const metadataId = crypto.randomUUID();
      await this.createIndexingMetadata(metadataId, content.id, content.content_type);

      // Step 2: Quality assessment
      const qualityMetrics = await this.assessQuality(content.content_text, metadataId);
      
      // Step 3: Semantic analysis
      const semanticEntities = await this.analyzeSemantics(content.content_text, metadataId);

      // Step 4: Temporal indexing
      const temporalIndex = await this.createTemporalIndex(content.content_text, metadataId);

      // Step 5: Entity resolution and cross-referencing
      const crossReferences = await this.createCrossReferences(content.id, semanticEntities, metadataId);

      // Step 6: Update indexing status
      await this.updateIndexingStatus(metadataId, 'completed', qualityMetrics.overallScore);

      // Step 7: Store all results
      await this.storeIndexingResults(metadataId, {
        qualityMetrics,
        semanticEntities,
        temporalIndex,
        crossReferences
      });

      return { success: true };

    } catch (error) {
      console.error(`❌ Failed to process content ${content.id}:`, error);
      await this.updateIndexingStatus(content.id, 'failed', 0);
      return { success: false, error: error as string };
    }
  }

  /**
   * Create indexing metadata record
   */
  private async createIndexingMetadata(metadataId: string, contentId: string, contentType: string): Promise<void> {
    await this.db.prepare(`
      INSERT INTO indexing_metadata (id, content_id, content_type, indexing_status, created_at, updated_at)
      VALUES (?, ?, ?, 'processing', datetime('now'), datetime('now'))
    `).bind(metadataId, contentId, contentType).run();
  }

  /**
   * Assess content quality using the quality framework
   */
  private async assessQuality(contentText: string, metadataId: string): Promise<QualityMetrics> {
    // Use the quality framework to assess content
    const qualityResult = await this.qualityFramework.assessContent(contentText);
    
    // Store quality metrics
    for (const [metricType, metricValue] of Object.entries(qualityResult.metrics)) {
      await this.db.prepare(`
        INSERT INTO quality_metrics (id, metadata_id, metric_type, metric_value, metric_weight, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `).bind(crypto.randomUUID(), metadataId, metricType, metricValue, 1.0).run();
    }

    // Store validation results
    for (const validation of qualityResult.validations) {
      await this.db.prepare(`
        INSERT INTO validation_results (id, metadata_id, validation_type, validation_result, validation_details, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `).bind(crypto.randomUUID(), metadataId, validation.type, validation.result, validation.details).run();
    }

    return qualityResult;
  }

  /**
   * Analyze content semantics
   */
  private async analyzeSemantics(contentText: string, metadataId: string): Promise<SemanticEntities[]> {
    const entities = await this.semanticAnalyzer.extractEntities(contentText);
    
    // Store semantic entities
    for (const entity of entities) {
      await this.db.prepare(`
        INSERT INTO semantic_entities (id, metadata_id, entity_type, entity_value, entity_confidence, entity_context, created_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(crypto.randomUUID(), metadataId, entity.type, entity.value, entity.confidence, entity.context).run();
    }

    return entities;
  }

  /**
   * Create temporal index
   */
  private async createTemporalIndex(contentText: string, metadataId: string): Promise<string> {
    const temporalData = await this.temporalIndexer.indexContent(contentText);
    
    // Store temporal index in metadata
    await this.db.prepare(`
      UPDATE indexing_metadata 
      SET temporal_index = ?
      WHERE id = ?
    `).bind(JSON.stringify(temporalData), metadataId).run();

    return JSON.stringify(temporalData);
  }

  /**
   * Create cross-references between content items
   */
  private async createCrossReferences(sourceContentId: string, entities: SemanticEntities[], metadataId: string): Promise<CrossReferences[]> {
    const references: CrossReferences[] = [];

    // Find related content based on semantic entities
    for (const entity of entities) {
      const relatedContent = await this.findRelatedContent(entity.value, sourceContentId);
      
      for (const related of relatedContent) {
        const referenceId = crypto.randomUUID();
        const strength = this.calculateReferenceStrength(entity, related);
        
        references.push({
          id: referenceId,
          source_content_id: sourceContentId,
          target_content_id: related.id,
          reference_type: 'semantic',
          reference_strength: strength,
          reference_context: `Related via entity: ${entity.value}`,
          created_at: new Date().toISOString()
        });

        // Store cross-reference
        await this.db.prepare(`
          INSERT INTO cross_references (id, source_content_id, target_content_id, reference_type, reference_strength, reference_context, created_at)
          VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(referenceId, sourceContentId, related.id, 'semantic', strength, `Related via entity: ${entity.value}`).run();
      }
    }

    return references;
  }

  /**
   * Find related content based on entity value
   */
  private async findRelatedContent(entityValue: string, excludeContentId: string): Promise<Array<{id: string; title: string}>> {
    const searchPattern = `%${entityValue}%`;
    
    const results = await this.db.prepare(`
      SELECT DISTINCT lc.id, l.title
      FROM lesson_content lc
      JOIN lessons l ON lc.lesson_id = l.id
      JOIN semantic_entities se ON lc.id IN (
        SELECT im.content_id FROM indexing_metadata im WHERE im.id = se.metadata_id
      )
      WHERE LOWER(se.entity_value) LIKE ? AND lc.id != ?
      LIMIT 10
    `).bind(searchPattern, excludeContentId).all();

    return results.results || [];
  }

  /**
   * Calculate reference strength based on entity confidence and context
   */
  private calculateReferenceStrength(entity: SemanticEntities, related: any): number {
    // Simple strength calculation based on entity confidence
    return entity.confidence || 0.5;
  }

  /**
   * Update indexing status
   */
  private async updateIndexingStatus(metadataId: string, status: string, qualityScore: number): Promise<void> {
    await this.db.prepare(`
      UPDATE indexing_metadata 
      SET indexing_status = ?, quality_score = ?, validation_status = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(status, qualityScore, status === 'completed' ? 'passed' : 'failed', metadataId).run();
  }

  /**
   * Store all indexing results
   */
  private async storeIndexingResults(metadataId: string, results: {
    qualityMetrics: QualityMetrics;
    semanticEntities: SemanticEntities[];
    temporalIndex: string;
    crossReferences: CrossReferences[];
  }): Promise<void> {
    // Update semantic analysis in metadata
    await this.db.prepare(`
      UPDATE indexing_metadata 
      SET semantic_analysis = ?
      WHERE id = ?
    `).bind(JSON.stringify(results.semanticEntities), metadataId).run();
  }

  /**
   * Get indexing status for all content
   */
  async getIndexingStatus(): Promise<Array<{
    content_id: string;
    indexing_status: string;
    quality_score: number;
    validation_status: string;
    created_at: string;
    updated_at: string;
  }>> {
    const results = await this.db.prepare(`
      SELECT im.content_id, im.indexing_status, im.quality_score, im.validation_status, im.created_at, im.updated_at
      FROM indexing_metadata im
      ORDER BY im.created_at DESC
    `).all();

    return results.results || [];
  }

  /**
   * Get quality metrics for specific content
   */
  async getQualityMetrics(contentId: string): Promise<{
    metadata: any;
    metrics: Array<{metric_type: string; metric_value: number; metric_weight: number}>;
    validations: Array<{validation_type: string; validation_result: string; validation_details: string}>;
  }> {
    // Get metadata
    const metadata = await this.db.prepare(`
      SELECT * FROM indexing_metadata WHERE content_id = ?
    `).bind(contentId).first();

    // Get metrics
    const metrics = await this.db.prepare(`
      SELECT metric_type, metric_value, metric_weight FROM quality_metrics WHERE metadata_id = ?
    `).bind(metadata.id).all();

    // Get validations
    const validations = await this.db.prepare(`
      SELECT validation_type, validation_result, validation_details FROM validation_results WHERE metadata_id = ?
    `).bind(metadata.id).all();

    return {
      metadata,
      metrics: metrics.results || [],
      validations: validations.results || []
    };
  }

  /**
   * Get semantic entities for specific content
   */
  async getSemanticEntities(contentId: string): Promise<SemanticEntities[]> {
    const metadata = await this.db.prepare(`
      SELECT id FROM indexing_metadata WHERE content_id = ?
    `).bind(contentId).first();

    if (!metadata) return [];

    const entities = await this.db.prepare(`
      SELECT entity_type, entity_value, entity_confidence, entity_context FROM semantic_entities WHERE metadata_id = ?
    `).bind(metadata.id).all();

    return entities.results || [];
  }

  /**
   * Get cross-references for specific content
   */
  async getCrossReferences(contentId: string): Promise<CrossReferences[]> {
    const references = await this.db.prepare(`
      SELECT * FROM cross_references WHERE source_content_id = ? OR target_content_id = ?
    `).bind(contentId, contentId).all();

    return references.results || [];
  }
}

// Export for use in the main API
export default IndexingIntegration;