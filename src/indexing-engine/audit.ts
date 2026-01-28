
import { ForensicNode, DiagnosticsReport, GraphLink, SynapticRepair } from '../types';

/**
 * Calculates metrics for the indexing structure
 */
export const auditIndexingStructure = (
  nodes: ForensicNode[], 
  links: GraphLink[], 
  repairs: SynapticRepair[]
): DiagnosticsReport => {
  let orphanCount = 0;
  const brokenLinks: string[] = [];
  const allIds = new Set(nodes.map(n => n.id));

  nodes.forEach(node => {
    const inbound = links.some(l => l.target === node.id);
    const outbound = links.some(l => l.source === node.id);
    
    if (!inbound && !outbound) {
      orphanCount++;
    }

    node.linksTo?.forEach(targetId => {
      if (!allIds.has(targetId)) {
        brokenLinks.push(`${node.id} -> ${targetId}`);
      }
    });
  });

  const totalPossibleConnections = nodes.length * (nodes.length - 1);
  const connectionDensity = totalPossibleConnections > 0 ? links.length / totalPossibleConnections : 0;
  
  const unrepairablePenalty = brokenLinks.length * 10;
  const orphanPenalty = orphanCount * 5;
  const integrityScore = Math.max(0, 100 - ((unrepairablePenalty + orphanPenalty) / (nodes.length || 1)) * 10);

  return {
    orphanCount,
    brokenLinks,
    repairs,
    integrityScore: Math.round(integrityScore),
    totalNodes: nodes.length,
    connectionDensity: Number(connectionDensity.toFixed(4)),
    convergenceNodes: nodes.filter(n => n.metadata.isHighSignal).length
  };
};
