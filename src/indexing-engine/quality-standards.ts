import { ForensicNode, NodeType } from '../types';

export interface QualityStandard {
  id: string;
  name: string;
  description: string;
  category: 'ACCURACY' | 'COMPLETENESS' | 'CONSISTENCY' | 'RELEVANCE' | 'STRUCTURE';
  weight: number;
  validators: QualityValidator[];
}

export interface QualityValidator {
  id: string;
  name: string;
  description: string;
  validate: (node: ForensicNode) => ValidationResult;
}

export interface ValidationResult {
  passed: boolean;
  score: number;
  confidence: number;
  issues: QualityIssue[];
  suggestions: QualitySuggestion[];
}

export interface QualityIssue {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  description: string;
  location?: string;
  evidence: string[];
}

export interface QualitySuggestion {
  type: 'CORRECTION' | 'ENHANCEMENT' | 'RESTRUCTURING';
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  action: string;
}

export interface ContentQualityReport {
  nodeId: string;
  overallScore: number;
  confidence: number;
  categoryScores: Record<string, number>;
  standards: StandardResult[];
  issues: QualityIssue[];
  suggestions: QualitySuggestion[];
  timestamp: string;
}

export interface StandardResult {
  standardId: string;
  passed: boolean;
  score: number;
  confidence: number;
  issues: QualityIssue[];
  suggestions: QualitySuggestion[];
}

/**
 * CONTENT QUALITY STANDARDS FRAMEWORK
 * Defines granular standards for content quality assessment
 */
export class QualityStandards {
  
  /**
   * Core quality standards for different content types
   */
  static getStandardsForType(nodeType: NodeType): QualityStandard[] {
    switch (nodeType) {
      case NodeType.DOCTRINE:
        return this.getDoctrinalStandards();
      case NodeType.TACTIC:
        return this.getTacticalStandards();
      case NodeType.PROFILE:
        return this.getProfileStandards();
      default:
        return this.getGeneralStandards();
    }
  }

  /**
   * Doctrinal content quality standards
   */
  private static getDoctrinalStandards(): QualityStandard[] {
    return [
      {
        id: 'DOCTRINE_ACCURACY_001',
        name: 'Historical Accuracy',
        description: 'Doctrinal content must be historically accurate and verifiable',
        category: 'ACCURACY',
        weight: 0.3,
        validators: [this.validators.historicalAccuracy]
      },
      {
        id: 'DOCTRINE_STRUCTURE_001',
        name: 'Logical Structure',
        description: 'Doctrinal content must follow logical argumentative structure',
        category: 'STRUCTURE',
        weight: 0.25,
        validators: [this.validators.logicalStructure]
      },
      {
        id: 'DOCTRINE_COMPLETENESS_001',
        name: 'Conceptual Completeness',
        description: 'Doctrinal content must cover all essential aspects of the doctrine',
        category: 'COMPLETENESS',
        weight: 0.2,
        validators: [this.validators.conceptualCompleteness]
      },
      {
        id: 'DOCTRINE_CONSISTENCY_001',
        name: 'Internal Consistency',
        description: 'Doctrinal content must be internally consistent without contradictions',
        category: 'CONSISTENCY',
        weight: 0.15,
        validators: [this.validators.internalConsistency]
      },
      {
        id: 'DOCTRINE_RELEVANCE_001',
        name: 'Strategic Relevance',
        description: 'Doctrinal content must be relevant to current strategic context',
        category: 'RELEVANCE',
        weight: 0.1,
        validators: [this.validators.strategicRelevance]
      }
    ];
  }

  /**
   * Tactical content quality standards
   */
  private static getTacticalStandards(): QualityStandard[] {
    return [
      {
        id: 'TACTIC_ACCURACY_001',
        name: 'Operational Accuracy',
        description: 'Tactical content must accurately describe operational procedures',
        category: 'ACCURACY',
        weight: 0.35,
        validators: [this.validators.operationalAccuracy]
      },
      {
        id: 'TACTIC_PRACTICALITY_001',
        name: 'Practical Applicability',
        description: 'Tactical content must be practically applicable in real scenarios',
        category: 'RELEVANCE',
        weight: 0.25,
        validators: [this.validators.practicalApplicability]
      },
      {
        id: 'TACTIC_STRUCTURE_001',
        name: 'Procedural Structure',
        description: 'Tactical content must follow clear procedural structure',
        category: 'STRUCTURE',
        weight: 0.2,
        validators: [this.validators.proceduralStructure]
      },
      {
        id: 'TACTIC_SAFETY_001',
        name: 'Safety Considerations',
        description: 'Tactical content must include appropriate safety considerations',
        category: 'COMPLETENESS',
        weight: 0.15,
        validators: [this.validators.safetyConsiderations]
      },
      {
        id: 'TACTIC_ADAPTABILITY_001',
        name: 'Contextual Adaptability',
        description: 'Tactical content must be adaptable to different contexts',
        category: 'RELEVANCE',
        weight: 0.05,
        validators: [this.validators.contextualAdaptability]
      }
    ];
  }

  /**
   * Profile content quality standards
   */
  private static getProfileStandards(): QualityStandard[] {
    return [
      {
        id: 'PROFILE_ACCURACY_001',
        name: 'Identity Verification',
        description: 'Profile content must accurately represent the subject identity',
        category: 'ACCURACY',
        weight: 0.3,
        validators: [this.validators.identityVerification]
      },
      {
        id: 'PROFILE_COMPLETENESS_001',
        name: 'Biographical Completeness',
        description: 'Profile content must include all relevant biographical information',
        category: 'COMPLETENESS',
        weight: 0.25,
        validators: [this.validators.biographicalCompleteness]
      },
      {
        id: 'PROFILE_CONSISTENCY_001',
        name: 'Temporal Consistency',
        description: 'Profile content must be temporally consistent',
        category: 'CONSISTENCY',
        weight: 0.2,
        validators: [this.validators.temporalConsistency]
      },
      {
        id: 'PROFILE_OBJECTIVITY_001',
        name: 'Objective Representation',
        description: 'Profile content must be objectively represented without bias',
        category: 'ACCURACY',
        weight: 0.15,
        validators: [this.validators.objectiveRepresentation]
      },
      {
        id: 'PROFILE_RELEVANCE_001',
        name: 'Strategic Significance',
        description: 'Profile content must demonstrate strategic significance',
        category: 'RELEVANCE',
        weight: 0.1,
        validators: [this.validators.strategicSignificance]
      }
    ];
  }

  /**
   * General content quality standards
   */
  private static getGeneralStandards(): QualityStandard[] {
    return [
      {
        id: 'GENERAL_READABILITY_001',
        name: 'Readability Standards',
        description: 'Content must meet minimum readability standards',
        category: 'STRUCTURE',
        weight: 0.3,
        validators: [this.validators.readability]
      },
      {
        id: 'GENERAL_CLARITY_001',
        name: 'Conceptual Clarity',
        description: 'Content must be conceptually clear and unambiguous',
        category: 'COMPLETENESS',
        weight: 0.25,
        validators: [this.validators.conceptualClarity]
      },
      {
        id: 'GENERAL_COHERENCE_001',
        name: 'Logical Coherence',
        description: 'Content must maintain logical coherence throughout',
        category: 'CONSISTENCY',
        weight: 0.25,
        validators: [this.validators.logicalCoherence]
      },
      {
        id: 'GENERAL_RELEVANCE_001',
        name: 'Content Relevance',
        description: 'Content must be relevant to its intended purpose',
        category: 'RELEVANCE',
        weight: 0.2,
        validators: [this.validators.contentRelevance]
      }
    ];
  }

  /**
   * Quality validators for different content aspects
   */
  static validators = {
    // Accuracy validators
    historicalAccuracy: {
      id: 'HISTORICAL_ACCURACY',
      name: 'Historical Accuracy Check',
      description: 'Validates historical facts and references',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for historical references
        const historicalRefs = node.content.match(/\b(?:[0-9]{4}|[IVX]+)\b/g);
        if (!historicalRefs || historicalRefs.length === 0) {
          issues.push({
            severity: 'MEDIUM',
            category: 'HISTORICAL',
            description: 'No historical references found in doctrinal content',
            evidence: ['Content appears to lack historical context']
          });
        }

        // Check for citation patterns
        const hasCitations = node.content.includes('[') && node.content.includes(']');
        if (!hasCitations && node.type === NodeType.DOCTRINE) {
          issues.push({
            severity: 'LOW',
            category: 'CITATION',
            description: 'Missing citations for historical claims',
            evidence: ['Historical claims should be properly cited']
          });
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.1));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.8,
          issues,
          suggestions
        };
      }
    },

    operationalAccuracy: {
      id: 'OPERATIONAL_ACCURACY',
      name: 'Operational Accuracy Check',
      description: 'Validates operational procedures and accuracy',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for procedural clarity
        const proceduralSteps = node.content.match(/(?:step|phase|stage)\s+\d+/gi);
        if (!proceduralSteps || proceduralSteps.length < 3) {
          issues.push({
            severity: 'HIGH',
            category: 'PROCEDURAL',
            description: 'Insufficient procedural detail in tactical content',
            evidence: ['Tactical content should include detailed procedural steps']
          });
        }

        // Check for ambiguity
        const ambiguousTerms = ['maybe', 'possibly', 'probably', 'seems', 'appears'];
        const foundAmbiguity = ambiguousTerms.some(term => 
          node.content.toLowerCase().includes(term)
        );
        
        if (foundAmbiguity) {
          issues.push({
            severity: 'MEDIUM',
            category: 'AMBIGUITY',
            description: 'Ambiguous language detected in tactical content',
            evidence: ['Tactical content should be precise and unambiguous']
          });
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.15));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.9,
          issues,
          suggestions
        };
      }
    },

    identityVerification: {
      id: 'IDENTITY_VERIFICATION',
      name: 'Identity Verification Check',
      description: 'Validates identity information accuracy',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for identity markers
        const hasName = node.content.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/);
        const hasRole = node.content.match(/\b(?:officer|agent|operative|leader|commander)\b/i);
        
        if (!hasName) {
          issues.push({
            severity: 'HIGH',
            category: 'IDENTITY',
            description: 'Missing proper name identification',
            evidence: ['Profile content should include proper name identification']
          });
        }

        if (!hasRole) {
          issues.push({
            severity: 'MEDIUM',
            category: 'ROLE',
            description: 'Missing role or position information',
            evidence: ['Profile content should include role information']
          });
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.2));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.85,
          issues,
          suggestions
        };
      }
    },

    // Completeness validators
    conceptualCompleteness: {
      id: 'CONCEPTUAL_COMPLETENESS',
      name: 'Conceptual Completeness Check',
      description: 'Validates conceptual completeness of content',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for key concept coverage
        const keyConcepts = ['purpose', 'method', 'application', 'limitations'];
        const coveredConcepts = keyConcepts.filter(concept => 
          node.content.toLowerCase().includes(concept)
        );
        
        if (coveredConcepts.length < 3) {
          issues.push({
            severity: 'MEDIUM',
            category: 'COMPLETENESS',
            description: 'Incomplete conceptual coverage',
            evidence: [`Missing coverage of: ${keyConcepts.filter(c => !coveredConcepts.includes(c)).join(', ')}`]
          });
        }

        const score = (coveredConcepts.length / keyConcepts.length);
        
        return {
          passed: score >= 0.6,
          score,
          confidence: 0.75,
          issues,
          suggestions
        };
      }
    },

    biographicalCompleteness: {
      id: 'BIOGRAPHICAL_COMPLETENESS',
      name: 'Biographical Completeness Check',
      description: 'Validates biographical information completeness',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for biographical elements
        const bioElements = ['birth', 'education', 'career', 'achievements', 'affiliations'];
        const presentElements = bioElements.filter(element => 
          node.content.toLowerCase().includes(element)
        );
        
        if (presentElements.length < 3) {
          issues.push({
            severity: 'HIGH',
            category: 'BIOGRAPHY',
            description: 'Incomplete biographical information',
            evidence: [`Missing: ${bioElements.filter(e => !presentElements.includes(e)).join(', ')}`]
          });
        }

        const score = (presentElements.length / bioElements.length);
        
        return {
          passed: score >= 0.6,
          score,
          confidence: 0.8,
          issues,
          suggestions
        };
      }
    },

    // Consistency validators
    internalConsistency: {
      id: 'INTERNAL_CONSISTENCY',
      name: 'Internal Consistency Check',
      description: 'Validates internal consistency of content',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for contradictory statements
        const contradictions = [
          ['must', 'optional'],
          ['always', 'sometimes'],
          ['never', 'frequently'],
          ['required', 'unnecessary']
        ];
        
        let foundContradiction = false;
        contradictions.forEach(([term1, term2]) => {
          if (node.content.toLowerCase().includes(term1) && 
              node.content.toLowerCase().includes(term2)) {
            foundContradiction = true;
          }
        });
        
        if (foundContradiction) {
          issues.push({
            severity: 'HIGH',
            category: 'CONSISTENCY',
            description: 'Internal contradictions detected',
            evidence: ['Content contains contradictory statements']
          });
        }

        const score = foundContradiction ? 0.5 : 1.0;
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.9,
          issues,
          suggestions
        };
      }
    },

    temporalConsistency: {
      id: 'TEMPORAL_CONSISTENCY',
      name: 'Temporal Consistency Check',
      description: 'Validates temporal consistency in content',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Extract dates from content
        const dates = node.content.match(/\b(?:[0-9]{4}|[IVX]+)\b/g) || [];
        
        // Check for temporal logic
        if (dates.length > 1) {
          // Simple chronological check
          const numericDates = dates.map(d => {
            if (d.includes('M')) return parseInt(d.replace(/[IVX]/g, ''), 10) + 2000;
            return parseInt(d, 10);
          }).filter(d => !isNaN(d));
          
          const isChronological = numericDates.every((date, i) => 
            i === 0 || date >= numericDates[i - 1]
          );
          
          if (!isChronological) {
            issues.push({
              severity: 'MEDIUM',
              category: 'TEMPORAL',
              description: 'Temporal sequence inconsistency detected',
              evidence: ['Dates in content are not in chronological order']
            });
          }
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.2));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.85,
          issues,
          suggestions
        };
      }
    },

    // Structure validators
    logicalStructure: {
      id: 'LOGICAL_STRUCTURE',
      name: 'Logical Structure Check',
      description: 'Validates logical structure of content',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for logical connectors
        const logicalConnectors = ['therefore', 'because', 'however', 'furthermore', 'consequently'];
        const hasConnectors = logicalConnectors.some(connector => 
          node.content.toLowerCase().includes(connector)
        );
        
        if (!hasConnectors) {
          issues.push({
            severity: 'MEDIUM',
            category: 'STRUCTURE',
            description: 'Missing logical connectors',
            evidence: ['Content lacks logical flow indicators']
          });
        }

        // Check for introduction and conclusion patterns
        const hasIntro = node.content.toLowerCase().includes('introduction') || 
                        node.content.toLowerCase().includes('overview');
        const hasConclusion = node.content.toLowerCase().includes('conclusion') || 
                             node.content.toLowerCase().includes('summary');
        
        if (!hasIntro || !hasConclusion) {
          issues.push({
            severity: 'LOW',
            category: 'STRUCTURE',
            description: 'Missing structural elements',
            evidence: ['Consider adding introduction and conclusion sections']
          });
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.1));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.8,
          issues,
          suggestions
        };
      }
    },

    proceduralStructure: {
      id: 'PROCEDURAL_STRUCTURE',
      name: 'Procedural Structure Check',
      description: 'Validates procedural structure of tactical content',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for step-by-step structure
        const stepPattern = /(?:step|phase|stage)\s+\d+/gi;
        const steps = node.content.match(stepPattern) || [];
        
        if (steps.length < 2) {
          issues.push({
            severity: 'HIGH',
            category: 'PROCEDURE',
            description: 'Insufficient procedural structure',
            evidence: ['Tactical content should have clear step-by-step structure']
          });
        }

        // Check for prerequisites
        const hasPrerequisites = node.content.toLowerCase().includes('prerequisite') ||
                               node.content.toLowerCase().includes('requirement');
        
        if (!hasPrerequisites) {
          issues.push({
            severity: 'MEDIUM',
            category: 'PROCEDURE',
            description: 'Missing prerequisites information',
            evidence: ['Procedural content should specify prerequisites']
          });
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.15));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.9,
          issues,
          suggestions
        };
      }
    },

    // Relevance validators
    strategicRelevance: {
      id: 'STRATEGIC_RELEVANCE',
      name: 'Strategic Relevance Check',
      description: 'Validates strategic relevance of content',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for strategic terminology
        const strategicTerms = ['strategy', 'tactics', 'operations', 'doctrine', 'policy'];
        const hasStrategicTerms = strategicTerms.some(term => 
          node.content.toLowerCase().includes(term)
        );
        
        if (!hasStrategicTerms) {
          issues.push({
            severity: 'MEDIUM',
            category: 'RELEVANCE',
            description: 'Lacks strategic context',
            evidence: ['Content should demonstrate strategic relevance']
          });
        }

        // Check for current applicability
        const currentTerms = ['current', 'modern', 'contemporary', 'present-day'];
        const hasCurrentContext = currentTerms.some(term => 
          node.content.toLowerCase().includes(term)
        );
        
        if (!hasCurrentContext) {
          issues.push({
            severity: 'LOW',
            category: 'RELEVANCE',
            description: 'Missing current context',
            evidence: ['Consider updating content for current relevance']
          });
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.1));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.75,
          issues,
          suggestions
        };
      }
    },

    practicalApplicability: {
      id: 'PRACTICAL_APPLICABILITY',
      name: 'Practical Applicability Check',
      description: 'Validates practical applicability of tactical content',
      validate: (node: ForensicNode): ValidationResult => {
        const issues: QualityIssue[] = [];
        const suggestions: QualitySuggestion[] = [];
        
        // Check for practical examples
        const hasExamples = node.content.toLowerCase().includes('example') ||
                           node.content.toLowerCase().includes('case study') ||
                           node.content.toLowerCase().includes('scenario');
        
        if (!hasExamples) {
          issues.push({
            severity: 'MEDIUM',
            category: 'APPLICABILITY',
            description: 'Lacks practical examples',
            evidence: ['Tactical content should include practical examples']
          });
        }

        // Check for implementation guidance
        const implementationTerms = ['implement', 'apply', 'execute', 'deploy', 'use'];
        const hasImplementation = implementationTerms.some(term => 
          node.content.toLowerCase().includes(term)
        );
        
        if (!hasImplementation) {
          issues.push({
            severity: 'HIGH',
            category: 'APPLICABILITY',
            description: 'Missing implementation guidance',
            evidence: ['Tactical content should include implementation details']
          });
        }

        const score = issues.length === 0 ? 1.0 : Math.max(0, 1.0 - (issues.length * 0.2));
        
        return {
          passed: score >= 0.7,
          score,
          confidence: 0.85,
          issues,
          suggestions
        };
      }
    }
  };
}