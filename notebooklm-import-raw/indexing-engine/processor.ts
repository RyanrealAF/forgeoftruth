
import { ForensicNode, GraphLink, NodeType } from '../types';

export interface IndexingResult {
  links: GraphLink[];
}

/**
 * HEURISTIC CONNECTION ENGINE (The "Structure" Logic)
 * Scans a set of nodes to build a dense forensic web based on multiple trails.
 */
export const processIndexingStructure = (nodes: ForensicNode[]): IndexingResult => {
  const links: GraphLink[] = [];
  
  nodes.forEach(n1 => {
    nodes.forEach(n2 => {
      if (n1.id === n2.id) return;

      // 1. Explicit Structural Links (Weight 1.0)
      if (n1.linksTo?.includes(n2.id)) {
        links.push({ 
          source: n1.id, 
          target: n2.id, 
          weight: 1.0, 
          type: 'EXPLICIT' 
        });
      }

      // 2. Semantic Signature Matching (Weight 0.8)
      const n2TitleParts = n2.title.split(':');
      const n2TitleLower = (n2TitleParts.length > 1 ? n2TitleParts[1] : n2TitleParts[0]).trim().toLowerCase();
      
      if (n2TitleLower.length > 5 && n1.content.toLowerCase().includes(n2TitleLower)) {
        links.push({ 
          source: n1.id, 
          target: n2.id, 
          weight: 0.8, 
          type: 'MENTION' 
        });
      }

      // 3. Vector Signature Convergence (Weight 0.95)
      if (n1.metadata.isHighSignal && n2.metadata.isHighSignal && n1.metadata.vector === n2.metadata.vector) {
        links.push({ 
          source: n1.id, 
          target: n2.id, 
          weight: 0.95, 
          type: 'SIGNATURE' 
        });
      }

      // 4. Thematic Overlap (Weight 0.6)
      const sharedThemes = n1.themes.filter(t => n2.themes.includes(t));
      if (sharedThemes.length > 1) {
        links.push({ 
          source: n1.id, 
          target: n2.id, 
          weight: 0.6, 
          type: 'INFERRED', 
          reasoning: `Thematic: ${sharedThemes.join(', ')}` 
        });
      }

      // 5. Anchor Convergence (Weight 0.7)
      const sharedAnchors = (n1.metadata.anchors || []).filter(a => (n2.metadata.anchors || []).includes(a));
      if (sharedAnchors.length > 1) {
        links.push({ 
          source: n1.id, 
          target: n2.id, 
          weight: 0.7, 
          type: 'INFERRED', 
          reasoning: `Anchor: ${sharedAnchors.join(', ')}` 
        });
      }
    });
  });

  return { links };
};
