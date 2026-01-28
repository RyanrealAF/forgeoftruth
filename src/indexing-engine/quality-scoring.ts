import { ForensicNode, NodeType } from '../types';
import { QualityStandards, QualityStandard, QualityValidator, ValidationResult, ContentQualityReport, StandardResult, QualityIssue, QualitySuggestion } from './quality-standards';

/**
 * MULTI-DIMENSIONAL QUALITY SCORING SYSTEM
 * Calculates comprehensive quality scores across multiple dimensions
 */
export class QualityScoring {
  
  /**
   * Calculates overall quality score for a node
   */
  static calculateQualityScore(node: ForensicNode): ContentQualityReport {
    const standards = QualityStandards.getStandardsForType(node.type);
    const standardResults: StandardResult[] = [];
    const allIssues: QualityIssue[] = [];
    const allSuggestions: QualitySuggestion[] = [];
    const categoryScores: Record<string, number> = {};

    // Evaluate each standard
    standards.forEach(standard => {
      const standardResult = this.evaluateStandard(node, standard);
      standardResults.push(standardResult);
      
      // Collect issues and suggestions
      allIssues.push(...standardResult.issues);
      allSuggestions.push(...standardResult.suggestions);
      
      // Track category scores
      if (!categoryScores[standard.category]) {
        categoryScores[standard.category] = 0;
      }
      categoryScores[standard.category] += standardResult.score * standard.weight;
    });

    // Calculate weighted overall score
    const totalWeight = standards.reduce((sum, s) => sum + s.weight, 0);
    const weightedScore = standardResults.reduce((sum, result, index) => {
      const standard = standards[index];
      return sum + (result.score * standard.weight);
    }, 0);
    
    const overallScore = totalWeight > 0 ? weightedScore / totalWeight : 0;
    
    // Calculate confidence
    const confidence = this.calculateConfidence(standardResults);

    return {
      nodeId: node.id,
      overallScore: Math.round(overallScore * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      categoryScores: this.normalizeCategoryScores(categoryScores, standards),
      standards: standardResults,
      issues: allIssues,
      suggestions: allSuggestions,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Evaluates a single quality standard
   */
  private static evaluateStandard(node: ForensicNode, standard: QualityStandard): StandardResult {
    const validatorResults: ValidationResult[] = [];
    
    // Run all validators for this standard
    standard.validators.forEach(validator => {
      try {
        const result = validator.validate(node);
        validatorResults.push(result);
      } catch (error) {
        validatorResults.push({
          passed: false,
          score: 0,
          confidence: 0,
          issues: [{
            severity: 'CRITICAL',
            category: 'VALIDATION_ERROR',
            description: `Validator error: ${error}`,
            evidence: [validator.name]
          }],
          suggestions: []
        });
      }
    });

    // Calculate standard score
    const totalValidators = validatorResults.length;
    const passedValidators = validatorResults.filter(r => r.passed).length;
    const validatorScores = validatorResults.map(r => r.score);
    const averageScore = validatorScores.reduce((sum, score) => sum + score, 0) / totalValidators;
    
    // Weight the score by standard importance
    const weightedScore = averageScore * standard.weight;
    
    // Calculate confidence
    const confidence = this.calculateValidatorConfidence(validatorResults);

    // Collect issues and suggestions
    const issues: QualityIssue[] = [];
    const suggestions: QualitySuggestion[] = [];
    
    validatorResults.forEach(result => {
      issues.push(...result.issues);
      suggestions.push(...result.suggestions);
    });

    return {
      standardId: standard.id,
      passed: passedValidators === totalValidators,
      score: weightedScore,
      confidence: confidence,
      issues: issues,
      suggestions: suggestions
    };
  }

  /**
   * Calculates confidence based on validator results
   */
  private static calculateConfidence(standardResults: StandardResult[]): number {
    const confidences = standardResults.map(r => r.confidence);
    return confidences.reduce((sum, confidence) => sum + confidence, 0) / confidences.length;
  }

  /**
   * Calculates confidence for validator results
   */
  private static calculateValidatorConfidence(validatorResults: ValidationResult[]): number {
    const confidences = validatorResults.map(r => r.confidence);
    return confidences.reduce((sum, confidence) => sum + confidence, 0) / confidences.length;
  }

  /**
   * Normalizes category scores
   */
  private static normalizeCategoryScores(categoryScores: Record<string, number>, standards: QualityStandard[]): Record<string, number> {
    const categoryWeights: Record<string, number> = {};
    
    // Calculate total weight per category
    standards.forEach(standard => {
      if (!categoryWeights[standard.category]) {
        categoryWeights[standard.category] = 0;
      }
      categoryWeights[standard.category] += standard.weight;
    });

    // Normalize scores
    const normalizedScores: Record<string, number> = {};
    Object.keys(categoryScores).forEach(category => {
      const totalWeight = categoryWeights[category] || 1;
      normalizedScores[category] = categoryScores[category] / totalWeight;
    });

    return normalizedScores;
  }

  /**
   * Generates quality improvement recommendations
   */
  static generateRecommendations(report: ContentQualityReport): QualityRecommendation[] {
    const recommendations: QualityRecommendation[] = [];
    
    // Analyze issues by severity
    const criticalIssues = report.issues.filter(i => i.severity === 'CRITICAL');
    const highIssues = report.issues.filter(i => i.severity === 'HIGH');
    const mediumIssues = report.issues.filter(i => i.severity === 'MEDIUM');
    
    // Generate recommendations based on issues
    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        category: 'IMMEDIATE_ACTION',
        description: `${criticalIssues.length} critical quality issues detected`,
        actions: criticalIssues.map(issue => ({
          action: `Fix ${issue.category} issue: ${issue.description}`,
          impact: 'High - Content may be unusable or misleading'
        }))
      });
    }

    if (highIssues.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'MAJOR_IMPROVEMENT',
        description: `${highIssues.length} high-priority quality issues detected`,
        actions: highIssues.map(issue => ({
          action: `Address ${issue.category} issue: ${issue.description}`,
          impact: 'Significant quality improvement needed'
        }))
      });
    }

    if (mediumIssues.length > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'QUALITY_ENHANCEMENT',
        description: `${mediumIssues.length} medium-priority quality improvements available`,
        actions: mediumIssues.map(issue => ({
          action: `Improve ${issue.category}: ${issue.description}`,
          impact: 'Quality enhancement for better usability'
        }))
      });
    }

    // Generate category-specific recommendations
    Object.entries(report.categoryScores).forEach(([category, score]) => {
      if (score < 0.7) {
        recommendations.push({
          priority: score < 0.5 ? 'HIGH' : 'MEDIUM',
          category: category,
          description: `Low quality score in ${category}: ${Math.round(score * 100)}%`,
          actions: this.getCategoryRecommendations(category, score)
        });
      }
    });

    return recommendations;
  }

  /**
   * Gets category-specific recommendations
   */
  private static getCategoryRecommendations(category: string, score: number): QualityAction[] {
    switch (category) {
      case 'ACCURACY':
        return [
          {
            action: 'Verify all factual claims and references',
            impact: 'Ensures content reliability and trustworthiness'
          },
          {
            action: 'Add proper citations for all claims',
            impact: 'Improves credibility and verifiability'
          }
        ];
      
      case 'COMPLETENESS':
        return [
          {
            action: 'Review content for missing essential information',
            impact: 'Ensures users have all necessary information'
          },
          {
            action: 'Add missing sections or details',
            impact: 'Improves content comprehensiveness'
          }
        ];
      
      case 'CONSISTENCY':
        return [
          {
            action: 'Review content for contradictory statements',
            impact: 'Ensures logical coherence and reliability'
          },
          {
            action: 'Standardize terminology and formatting',
            impact: 'Improves readability and professionalism'
          }
        ];
      
      case 'RELEVANCE':
        return [
          {
            action: 'Review content relevance to intended purpose',
            impact: 'Ensures content meets user needs'
          },
          {
            action: 'Update content for current applicability',
            impact: 'Maintains content currency and usefulness'
          }
        ];
      
      case 'STRUCTURE':
        return [
          {
            action: 'Improve content organization and flow',
            impact: 'Enhances readability and comprehension'
          },
          {
            action: 'Add clear headings and logical structure',
            impact: 'Improves content navigation and usability'
          }
        ];
      
      default:
        return [
          {
            action: 'Review content against quality standards',
            impact: 'General quality improvement'
          }
        ];
    }
  }

  /**
   * Calculates quality trend over time
   */
  static calculateQualityTrend(reports: ContentQualityReport[]): QualityTrend {
    if (reports.length < 2) {
      return {
        trend: 'STABLE',
        direction: 'NONE',
        change: 0,
        confidence: 0,
        reports: reports
      };
    }

    // Sort by timestamp
    const sortedReports = reports.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Calculate trend
    const scores = sortedReports.map(r => r.overallScore);
    const changes = [];
    
    for (let i = 1; i < scores.length; i++) {
      changes.push(scores[i] - scores[i - 1]);
    }

    const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const trendDirection = avgChange > 0.05 ? 'IMPROVING' : avgChange < -0.05 ? 'DECLINING' : 'STABLE';
    
    // Calculate confidence based on consistency
    const stdDev = this.calculateStandardDeviation(changes);
    const confidence = stdDev < 0.1 ? 0.9 : stdDev < 0.2 ? 0.7 : 0.5;

    return {
      trend: trendDirection,
      direction: avgChange > 0 ? 'UP' : avgChange < 0 ? 'DOWN' : 'FLAT',
      change: Math.round(avgChange * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      reports: sortedReports
    };
  }

  /**
   * Calculates standard deviation
   */
  private static calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  /**
   * Generates quality benchmark comparison
   */
  static generateBenchmarkComparison(reports: ContentQualityReport[], benchmark: QualityBenchmark): QualityComparison {
    const avgScore = reports.reduce((sum, r) => sum + r.overallScore, 0) / reports.length;
    const categoryAverages = this.calculateCategoryAverages(reports);
    
    return {
      benchmarkName: benchmark.name,
      currentScore: Math.round(avgScore * 100) / 100,
      benchmarkScore: benchmark.targetScore,
      difference: Math.round((avgScore - benchmark.targetScore) * 100) / 100,
      categoryComparison: this.compareCategories(categoryAverages, benchmark.categoryTargets),
      status: avgScore >= benchmark.targetScore ? 'MEETS_STANDARD' : 'BELOW_STANDARD',
      recommendations: this.generateBenchmarkRecommendations(avgScore, benchmark.targetScore, categoryAverages, benchmark.categoryTargets)
    };
  }

  /**
   * Calculates category averages across reports
   */
  private static calculateCategoryAverages(reports: ContentQualityReport[]): Record<string, number> {
    const categorySums: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    reports.forEach(report => {
      Object.entries(report.categoryScores).forEach(([category, score]) => {
        if (!categorySums[category]) {
          categorySums[category] = 0;
          categoryCounts[category] = 0;
        }
        categorySums[category] += score;
        categoryCounts[category]++;
      });
    });

    const averages: Record<string, number> = {};
    Object.keys(categorySums).forEach(category => {
      averages[category] = categorySums[category] / categoryCounts[category];
    });

    return averages;
  }

  /**
   * Compares categories against benchmark targets
   */
  private static compareCategories(current: Record<string, number>, targets: Record<string, number>): CategoryComparison[] {
    const comparisons: CategoryComparison[] = [];
    
    Object.keys(targets).forEach(category => {
      const currentScore = current[category] || 0;
      const targetScore = targets[category];
      const difference = currentScore - targetScore;
      
      comparisons.push({
        category: category,
        currentScore: Math.round(currentScore * 100) / 100,
        targetScore: targetScore,
        difference: Math.round(difference * 100) / 100,
        status: currentScore >= targetScore ? 'MEETS' : 'BELOW'
      });
    });

    return comparisons;
  }

  /**
   * Generates benchmark-specific recommendations
   */
  private static generateBenchmarkRecommendations(
    currentScore: number, 
    targetScore: number, 
    categoryAverages: Record<string, number>, 
    categoryTargets: Record<string, number>
  ): QualityRecommendation[] {
    const recommendations: QualityRecommendation[] = [];
    
    if (currentScore < targetScore) {
      recommendations.push({
        priority: 'HIGH',
        category: 'OVERALL_IMPROVEMENT',
        description: `Overall score below benchmark by ${Math.round((targetScore - currentScore) * 100)}%`,
        actions: [
          {
            action: `Focus on improving categories with largest gaps`,
            impact: 'Achieve benchmark compliance'
          }
        ]
      });
    }

    // Find categories with largest gaps
    const gaps = Object.entries(categoryTargets).map(([category, target]) => ({
      category,
      gap: target - (categoryAverages[category] || 0)
    })).filter(gap => gap.gap > 0.1).sort((a, b) => b.gap - a.gap);

    if (gaps.length > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'CATEGORY_FOCUS',
        description: `Focus on ${gaps.length} categories below target`,
        actions: gaps.map(gap => ({
          action: `Improve ${gap.category} by ${Math.round(gap.gap * 100)}%`,
          impact: 'Close gap to benchmark target'
        }))
      });
    }

    return recommendations;
  }
}

// Type definitions for quality scoring system
export interface QualityRecommendation {
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  description: string;
  actions: QualityAction[];
}

export interface QualityAction {
  action: string;
  impact: string;
}

export interface QualityTrend {
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  direction: 'UP' | 'DOWN' | 'FLAT';
  change: number;
  confidence: number;
  reports: ContentQualityReport[];
}

export interface QualityBenchmark {
  name: string;
  targetScore: number;
  categoryTargets: Record<string, number>;
  description?: string;
}

export interface QualityComparison {
  benchmarkName: string;
  currentScore: number;
  benchmarkScore: number;
  difference: number;
  categoryComparison: CategoryComparison[];
  status: 'MEETS_STANDARD' | 'BELOW_STANDARD';
  recommendations: QualityRecommendation[];
}

export interface CategoryComparison {
  category: string;
  currentScore: number;
  targetScore: number;
  difference: number;
  status: 'MEETS' | 'BELOW';
}