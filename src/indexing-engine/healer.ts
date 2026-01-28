
import { ForensicNode, SynapticRepair } from '../types';

/**
 * Basic Levenshtein distance for string similarity calculation
 */
const getSimilarityScore = (s1: string, s2: string): number => {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return (longerLength - costs[s2.length]) / longerLength;
};

export const LedgerHealer = {
  findBestCandidate: (brokenId: string, nodes: ForensicNode[]): { id: string, confidence: number } | null => {
    let bestMatch = null;
    let maxConfidence = 0;

    for (const node of nodes) {
      const idConf = getSimilarityScore(brokenId.toLowerCase(), node.id.toLowerCase());
      const titleConf = getSimilarityScore(brokenId.toLowerCase(), node.title.toLowerCase());
      const confidence = Math.max(idConf, titleConf);
      
      if (confidence > maxConfidence && confidence > 0.6) {
        maxConfidence = confidence;
        bestMatch = node.id;
      }
    }
    return bestMatch ? { id: bestMatch, confidence: maxConfidence } : null;
  },

  repairIndex: (nodes: ForensicNode[]): { healedNodes: ForensicNode[], repairs: SynapticRepair[] } => {
    const repairs: SynapticRepair[] = [];
    const nodeIds = new Set(nodes.map(n => n.id));

    const healedNodes = nodes.map(node => {
      if (!node.linksTo) return node;
      const validLinks: string[] = [];

      node.linksTo.forEach(linkId => {
        if (nodeIds.has(linkId)) {
          validLinks.push(linkId);
        } else {
          const match = LedgerHealer.findBestCandidate(linkId, nodes);
          if (match) {
            validLinks.push(match.id);
            repairs.push({
              originalId: linkId,
              repairedId: match.id,
              confidence: match.confidence,
              sourceNodeId: node.id
            });
          }
        }
      });

      return { ...node, linksTo: validLinks };
    });

    return { healedNodes, repairs };
  }
};
