import { ForensicNode, NodeType } from '../types';

export interface EntityResolution {
  entities: ResolvedEntity[];
  aliases: EntityAlias[];
  relationships: EntityRelationship[];
  confidenceMatrix: ConfidenceMatrix;
}

export interface ResolvedEntity {
  entityId: string;
  primaryName: string;
  entityType: 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'CONCEPT';
  aliases: string[];
  confidence: number;
  sourceNodes: string[];
  lastUpdated: string;
}

export interface EntityAlias {
  entityId: string;
  alias: string;
  sourceContext: string;
  confidence: number;
  timestamp: string;
}

export interface EntityRelationship {
  fromEntity: string;
  toEntity: string;
  relationshipType: string;
  strength: number;
  evidence: string[];
  timestamp: string;
}

export interface ConfidenceMatrix {
  entityResolution: number;
  aliasMatching: number;
  relationshipStrength: number;
  temporalConsistency: number;
}

/**
 * ADVANCED ENTITY RESOLUTION ENGINE
 * Cross-document entity disambiguation and identity correlation
 */
export class EntityResolver {
  
  /**
   * Resolves entities across all nodes with high precision
   */
  static resolveEntities(nodes: ForensicNode[]): EntityResolution {
    const resolution: EntityResolution = {
      entities: [],
      aliases: [],
      relationships: [],
      confidenceMatrix: {
        entityResolution: 0,
        aliasMatching: 0,
        relationshipStrength: 0,
        temporalConsistency: 0
      }
    };

    // Extract and cluster entities
    const entityClusters = this.extractAndClusterEntities(nodes);
    
    // Resolve entity identities
    resolution.entities = this.resolveEntityIdentities(entityClusters);
    
    // Extract aliases
    resolution.aliases = this.extractAliases(nodes, resolution.entities);
    
    // Build relationship graph
    resolution.relationships = this.buildRelationshipGraph(nodes, resolution.entities);
    
    // Calculate confidence metrics
    resolution.confidenceMatrix = this.calculateConfidenceMatrix(
      resolution.entities, 
      resolution.aliases, 
      resolution.relationships
    );

    return resolution;
  }

  /**
   * Extracts and clusters entities from all nodes
   */
  private static extractAndClusterEntities(nodes: ForensicNode[]): Map<string, EntityCluster> {
    const clusters = new Map<string, EntityCluster>();
    
    nodes.forEach(node => {
      // Extract person entities
      const persons = this.extractPersonEntities(node.content);
      persons.forEach(person => {
        this.addToCluster(clusters, person.name, {
          type: 'PERSON',
          name: person.name,
          context: person.context,
          sourceNode: node.id,
          confidence: person.confidence
        });
      });

      // Extract organization entities
      const orgs = this.extractOrganizationEntities(node.content);
      orgs.forEach(org => {
        this.addToCluster(clusters, org.name, {
          type: 'ORGANIZATION',
          name: org.name,
          context: org.context,
          sourceNode: node.id,
          confidence: org.confidence
        });
      });

      // Extract location entities
      const locations = this.extractLocationEntities(node.content);
      locations.forEach(loc => {
        this.addToCluster(clusters, loc.name, {
          type: 'LOCATION',
          name: loc.name,
          context: loc.context,
          sourceNode: node.id,
          confidence: loc.confidence
        });
      });
    });

    return clusters;
  }

  /**
   * Resolves entity identities from clusters
   */
  private static resolveEntityIdentities(clusters: Map<string, EntityCluster>): ResolvedEntity[] {
    const entities: ResolvedEntity[] = [];
    
    clusters.forEach((cluster, primaryName) => {
      const resolvedEntity: ResolvedEntity = {
        entityId: this.generateEntityId(primaryName),
        primaryName: primaryName,
        entityType: cluster.type,
        aliases: this.extractUniqueAliases(cluster),
        confidence: this.calculateEntityConfidence(cluster),
        sourceNodes: cluster.members.map(m => m.sourceNode),
        lastUpdated: new Date().toISOString()
      };
      
      entities.push(resolvedEntity);
    });

    return entities;
  }

  /**
   * Extracts aliases for resolved entities
   */
  private static extractAliases(nodes: ForensicNode[], entities: ResolvedEntity[]): EntityAlias[] {
    const aliases: EntityAlias[] = [];

    entities.forEach(entity => {
      nodes.forEach(node => {
        // Look for alternative names in context
        const alternativeNames = this.findAlternativeNames(node.content, entity.primaryName);
        alternativeNames.forEach(altName => {
          aliases.push({
            entityId: entity.entityId,
            alias: altName.name,
            sourceContext: altName.context,
            confidence: altName.confidence,
            timestamp: new Date().toISOString()
          });
        });
      });
    });

    return aliases;
  }

  /**
   * Builds relationship graph between entities
   */
  private static buildRelationshipGraph(
    nodes: ForensicNode[], 
    entities: ResolvedEntity[]
  ): EntityRelationship[] {
    const relationships: EntityRelationship[] = [];

    nodes.forEach(node => {
      // Extract relationships from content
      const nodeRelationships = this.extractRelationships(node.content, entities);
      relationships.push(...nodeRelationships);
    });

    return relationships;
  }

  /**
   * Extracts person entities from text
   */
  private static extractPersonEntities(content: string): Array<{name: string, context: string, confidence: number}> {
    const entities: Array<{name: string, context: string, confidence: number}> = [];
    
    // Pattern for capitalized names (likely persons)
    const namePattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g;
    const matches = content.match(namePattern);
    
    if (matches) {
      matches.forEach(match => {
        // Filter out common words that aren't likely names
        if (this.isLikelyPersonName(match)) {
          entities.push({
            name: match,
            context: `Found in: ${content.substring(0, 100)}...`,
            confidence: 0.8
          });
        }
      });
    }

    return entities;
  }

  /**
   * Extracts organization entities from text
   */
  private static extractOrganizationEntities(content: string): Array<{name: string, context: string, confidence: number}> {
    const entities: Array<{name: string, context: string, confidence: number}> = [];
    
    // Pattern for organizations (often contain specific keywords)
    const orgKeywords = ['Inc', 'Corp', 'LLC', 'Ltd', 'Foundation', 'Agency', 'Department', 'Institute'];
    const orgPattern = new RegExp(`\\b([A-Z][a-zA-Z\\s&]+(?:${orgKeywords.join('|')})\\b)`, 'g');
    const matches = content.match(orgPattern);
    
    if (matches) {
      matches.forEach(match => {
        entities.push({
          name: match.trim(),
          context: `Found in: ${content.substring(0, 100)}...`,
          confidence: 0.9
        });
      });
    }

    return entities;
  }

  /**
   * Extracts location entities from text
   */
  private static extractLocationEntities(content: string): Array<{name: string, context: string, confidence: number}> {
    const entities: Array<{name: string, context: string, confidence: number}> = [];
    
    // Pattern for locations (cities, states, countries)
    const locationPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)(?:,\s*([A-Z]{2,3}))?\b/g;
    let match;
    
    while ((match = locationPattern.exec(content)) !== null) {
      const locationName = match[1];
      const stateCode = match[2];
      
      if (this.isLikelyLocation(locationName)) {
        entities.push({
          name: stateCode ? `${locationName}, ${stateCode}` : locationName,
          context: `Found in: ${content.substring(0, 100)}...`,
          confidence: 0.7
        });
      }
    }

    return entities;
  }

  /**
   * Extracts relationships between entities
   */
  private static extractRelationships(content: string, entities: ResolvedEntity[]): EntityRelationship[] {
    const relationships: EntityRelationship[] = [];
    
    // Look for relationship patterns
    const relationshipPatterns = [
      /(\w+)\s+(?:works?|collaborates?|interacts?)\s+with\s+(\w+)/gi,
      /(\w+)\s+(?:reports?|answers?|reports?)\s+to\s+(\w+)/gi,
      /(\w+)\s+(?:contacts?|communicates?|talks?)\s+with\s+(\w+)/gi,
      /(\w+)\s+(?:meets?|encounters?)\s+with\s+(\w+)/gi
    ];

    relationshipPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const entity1 = match[1];
        const entity2 = match[2];
        
        const resolved1 = entities.find(e => e.primaryName.includes(entity1) || e.aliases.includes(entity1));
        const resolved2 = entities.find(e => e.primaryName.includes(entity2) || e.aliases.includes(entity2));
        
        if (resolved1 && resolved2) {
          relationships.push({
            fromEntity: resolved1.entityId,
            toEntity: resolved2.entityId,
            relationshipType: this.inferRelationshipType(match[0]),
            strength: 0.8,
            evidence: [match[0]],
            timestamp: new Date().toISOString()
          });
        }
      }
    });

    return relationships;
  }

  /**
   * Finds alternative names for entities
   */
  private static findAlternativeNames(content: string, primaryName: string): Array<{name: string, context: string, confidence: number}> {
    const alternatives: Array<{name: string, context: string, confidence: number}> = [];
    
    // Look for nicknames or abbreviations
    const nicknamePattern = new RegExp(`(${primaryName.split(' ')[0]}(?:\\s+[A-Z])?)`, 'gi');
    const matches = content.match(nicknamePattern);
    
    if (matches) {
      matches.forEach(match => {
        if (match !== primaryName) {
          alternatives.push({
            name: match,
            context: `Found in: ${content.substring(0, 100)}...`,
            confidence: 0.6
          });
        }
      });
    }

    return alternatives;
  }

  /**
   * Calculates entity confidence based on cluster properties
   */
  private static calculateEntityConfidence(cluster: EntityCluster): number {
    const baseConfidence = 0.5;
    const sourceCount = cluster.members.length;
    const highConfidenceSources = cluster.members.filter(m => m.confidence > 0.8).length;
    
    const confidence = baseConfidence + (sourceCount * 0.1) + (highConfidenceSources * 0.2);
    return Math.min(confidence, 1.0);
  }

  /**
   * Calculates overall confidence matrix
   */
  private static calculateConfidenceMatrix(
    entities: ResolvedEntity[],
    aliases: EntityAlias[],
    relationships: EntityRelationship[]
  ): ConfidenceMatrix {
    return {
      entityResolution: this.calculateEntityResolutionConfidence(entities),
      aliasMatching: this.calculateAliasMatchingConfidence(aliases),
      relationshipStrength: this.calculateRelationshipStrengthConfidence(relationships),
      temporalConsistency: this.calculateTemporalConsistencyConfidence(entities)
    };
  }

  // Helper methods
  private static addToCluster(
    clusters: Map<string, EntityCluster>, 
    name: string, 
    member: EntityMember
  ): void {
    if (!clusters.has(name)) {
      clusters.set(name, {
        type: member.type,
        members: []
      });
    }
    clusters.get(name)!.members.push(member);
  }

  private static extractUniqueAliases(cluster: EntityCluster): string[] {
    const aliases = new Set<string>();
    cluster.members.forEach(member => {
      if (member.name !== cluster.members[0].name) {
        aliases.add(member.name);
      }
    });
    return Array.from(aliases);
  }

  private static generateEntityId(name: string): string {
    return `ENT_${name.replace(/\s+/g, '_').toUpperCase()}_${Date.now()}`;
  }

  private static isLikelyPersonName(name: string): boolean {
    const commonWords = ['The', 'And', 'Or', 'But', 'In', 'On', 'At', 'To', 'For', 'Of', 'With', 'By'];
    return !commonWords.includes(name) && name.length > 2;
  }

  private static isLikelyLocation(name: string): boolean {
    const locationIndicators = ['City', 'Town', 'State', 'Country', 'County', 'Street', 'Avenue', 'Road', 'Park'];
    return locationIndicators.some(indicator => name.includes(indicator)) || name.length > 3;
  }

  private static inferRelationshipType(pattern: string): string {
    if (pattern.includes('works') || pattern.includes('collaborates')) return 'COLLABORATION';
    if (pattern.includes('reports') || pattern.includes('answers')) return 'HIERARCHICAL';
    if (pattern.includes('contacts') || pattern.includes('communicates')) return 'COMMUNICATION';
    if (pattern.includes('meets') || pattern.includes('encounters')) return 'ENCOUNTER';
    return 'UNKNOWN';
  }

  private static calculateEntityResolutionConfidence(entities: ResolvedEntity[]): number {
    const avgConfidence = entities.reduce((sum, e) => sum + e.confidence, 0) / entities.length;
    return Math.min(avgConfidence, 1.0);
  }

  private static calculateAliasMatchingConfidence(aliases: EntityAlias[]): number {
    const avgConfidence = aliases.reduce((sum, a) => sum + a.confidence, 0) / aliases.length;
    return Math.min(avgConfidence, 1.0);
  }

  private static calculateRelationshipStrengthConfidence(relationships: EntityRelationship[]): number {
    const avgStrength = relationships.reduce((sum, r) => sum + r.strength, 0) / relationships.length;
    return Math.min(avgStrength, 1.0);
  }

  private static calculateTemporalConsistencyConfidence(entities: ResolvedEntity[]): number {
    // Simplified temporal consistency check
    return 0.8; // Placeholder - would need temporal data to calculate properly
  }
}

// Type definitions for internal use
interface EntityCluster {
  type: 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'CONCEPT';
  members: EntityMember[];
}

interface EntityMember {
  type: 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'CONCEPT';
  name: string;
  context: string;
  sourceNode: string;
  confidence: number;
}