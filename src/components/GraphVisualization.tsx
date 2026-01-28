
import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { ForensicNode, NodeType } from '../types';
import { Zap, ChevronRight, Target, Share2 } from 'lucide-react';
import { ClassificationBadge } from './UI';
import { COLORS, TYPE_POSITIONS } from '../constants';

interface GraphProps {
  data: { nodes: ForensicNode[]; links: any[] };
  selectedNodeId: string | null;
  onNodeClick: (node: ForensicNode) => void;
  onNavigateToDocument: (nodeId: string) => void;
  accessTier: number;
}

const SIGNAL_GOLD = '#C5A059';

export const GraphVisualization: React.FC<GraphProps> = ({ 
  data, selectedNodeId, onNodeClick, onNavigateToDocument, accessTier 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<any>(null);

  const filteredNodes = useMemo(() => data.nodes.filter(n => n.metadata.tier >= accessTier), [data.nodes, accessTier]);
  const filteredLinks = useMemo(() => data.links.filter(l => 
    filteredNodes.some(n => n.id === (typeof l.source === 'string' ? l.source : l.source.id)) &&
    filteredNodes.some(n => n.id === (typeof l.target === 'string' ? l.target : l.target.id))
  ), [data.links, filteredNodes]);

  const currentNode = useMemo(() => filteredNodes.find(n => n.id === selectedNodeId), [selectedNodeId, filteredNodes]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    filteredNodes.forEach((n: any) => {
      if (n.x === undefined || isNaN(n.x)) n.x = width / 2 + (Math.random() - 0.5) * 200;
      if (n.y === undefined || isNaN(n.y)) n.y = height / 2 + (Math.random() - 0.5) * 200;
      if (!selectedNodeId) {
        n.fx = null;
        n.fy = null;
      }
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    
    const filter = defs.append('filter')
      .attr('id', 'gold-halo')
      .attr('x', '-100%')
      .attr('y', '-100%')
      .attr('width', '300%')
      .attr('height', '300%');
    filter.append('feGaussianBlur').attr('stdDeviation', '6').attr('result', 'blur');
    filter.append('feFlood').attr('flood-color', SIGNAL_GOLD).attr('flood-opacity', '0.4').attr('result', 'color');
    filter.append('feComposite').attr('in', 'color').attr('in2', 'blur').attr('operator', 'in').attr('result', 'glow');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'glow');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g').attr('class', 'main-group');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 8])
      .on('zoom', (event) => g.attr('transform', event.transform));

    zoomRef.current = zoom;
    svg.call(zoom);

    const simulation = d3.forceSimulation<any>(filteredNodes)
      .force('link', d3.forceLink<any, any>(filteredLinks).id(d => d.id).distance(180).strength(0.15))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX((d: any) => width * (TYPE_POSITIONS[d.type]?.x || 0.5)).strength(0.1))
      .force('y', d3.forceY((d: any) => height * (TYPE_POSITIONS[d.type]?.y || 0.5)).strength(0.1))
      .force('collide', d3.forceCollide().radius(60).strength(0.8))
      .velocityDecay(0.6)
      .alphaDecay(0.05);

    const link = g.append('g')
      .selectAll('line')
      .data(filteredLinks)
      .enter().append('line')
      .attr('stroke', d => {
        const sId = typeof d.source === 'string' ? d.source : d.source.id;
        const tId = typeof d.target === 'string' ? d.target : d.target.id;
        return (selectedNodeId && (sId === selectedNodeId || tId === selectedNodeId)) ? SIGNAL_GOLD : 'rgba(197, 160, 89, 0.12)';
      })
      .attr('stroke-width', d => {
        const sId = typeof d.source === 'string' ? d.source : d.source.id;
        const tId = typeof d.target === 'string' ? d.target : d.target.id;
        return (selectedNodeId && (sId === selectedNodeId || tId === selectedNodeId)) ? 3 : 0.8;
      })
      .style('opacity', d => {
        const sId = typeof d.source === 'string' ? d.source : d.source.id;
        const tId = typeof d.target === 'string' ? d.target : d.target.id;
        if (!selectedNodeId) return 0.8;
        return (sId === selectedNodeId || tId === selectedNodeId) ? 1 : 0.15;
      });

    const node = g.append('g')
      .selectAll('.node')
      .data(filteredNodes)
      .enter().append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer');

    node
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick(d as ForensicNode);
      })
      .call(d3.drag<any, any>()
        .on('start', (e, d) => {
          if (!e.active) simulation.alphaTarget(0.1).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e, d) => {
          if (!e.active) simulation.alphaTarget(0);
          if (selectedNodeId !== d.id) {
            d.fx = null;
            d.fy = null;
          }
        }));

    node.append('rect')
      .attr('width', d => d.id === selectedNodeId ? 16 : 8)
      .attr('height', d => d.id === selectedNodeId ? 16 : 8)
      .attr('x', d => d.id === selectedNodeId ? -8 : -4)
      .attr('y', d => d.id === selectedNodeId ? -8 : -4)
      .attr('fill', d => d.id === selectedNodeId ? SIGNAL_GOLD : (COLORS[d.type] || '#444'))
      .style('filter', d => d.id === selectedNodeId ? 'url(#gold-halo)' : 'none')
      .attr('stroke', '#000')
      .attr('stroke-width', 1);

    node.filter(d => d.id === selectedNodeId)
      .append('circle')
      .attr('class', 'node-pulse-circle')
      .attr('r', 10);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.id === selectedNodeId ? 30 : 25)
      .attr('fill', d => d.id === selectedNodeId ? SIGNAL_GOLD : 'rgba(255,255,255,0.4)')
      .attr('font-size', d => d.id === selectedNodeId ? '14px' : '10px')
      .attr('class', 'condensed')
      .style('text-transform', 'uppercase')
      .style('letter-spacing', '0.2em')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 2px 10px rgba(0,0,0,0.9)')
      .text(d => d.title.split(':').pop()?.trim().substring(0, 15) || '');

    simulation.on('tick', () => {
      link.attr('x1', (d: any) => d.source.x).attr('y1', (d: any) => d.source.y).attr('x2', (d: any) => d.target.x).attr('y2', (d: any) => d.target.y);
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    if (selectedNodeId) {
      const target = filteredNodes.find(n => n.id === selectedNodeId);
      if (target) {
        const t = target as any;
        svg.transition().duration(1200).ease(d3.easeCubicOut).call(zoom.transform, d3.zoomIdentity.translate(width / 2 - t.x * 1.5, height / 2 - t.y * 1.5).scale(1.5));
      }
    } else {
      svg.transition().duration(1200).call(zoom.transform, d3.zoomIdentity.translate(width/2, height/2).scale(0.5).translate(-width/2, -height/2));
    }

    return () => { simulation.stop(); };
  }, [filteredNodes, filteredLinks, onNodeClick, selectedNodeId, accessTier]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#050505]">
      <svg ref={svgRef} className="w-full h-full relative z-10 touch-none" />

      {currentNode && (
        <div 
          onClick={() => onNavigateToDocument(currentNode.id)}
          className="absolute top-32 right-8 w-[400px] luxe-panel p-8 z-50 animate-in slide-in-from-right-10 transition-all cursor-pointer group shadow-[0_40px_100px_rgba(0,0,0,0.9)] rounded-[24px] border-l-4 border-l-[#C5A059]"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full luxe-border flex items-center justify-center bg-[#C5A059]/10">
                  <Target size={18} className="text-[#C5A059]" />
                </div>
                <ClassificationBadge level={currentNode.metadata.classification} />
              </div>
              <Share2 size={14} className="text-[#C5A059]/40" />
            </div>

            <div>
              <span className="text-[9px] mono font-bold text-white/20 uppercase tracking-[0.4em] block mb-2">VECTOR::{currentNode.metadata.vector}</span>
              <h3 className="text-command text-5xl italic text-white group-hover:text-[#C5A059] transition-colors leading-[0.9] tracking-tighter">
                {currentNode.title.split(':').pop()?.trim()}
              </h3>
            </div>

            <p className="text-base text-white/50 leading-relaxed serif italic border-l border-white/10 pl-4">
              {currentNode.excerpt}
            </p>

            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
               <div className="flex items-center justify-between text-[9px] mono text-white/30 uppercase tracking-widest">
                  <span>Record_Hash</span>
                  <span>{currentNode.metadata.recordHash}</span>
               </div>
               <div className="flex items-center justify-between group-hover:text-[#C5A059] transition-colors">
                  <span className="text-xs condensed tracking-widest uppercase">Open_Dossier</span>
                  <ChevronRight size={20} className="transition-all group-hover:translate-x-1" />
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
