
import React from 'react';
import { ForensicNode } from '../types';
import { ChevronRight, Lock } from 'lucide-react';
import { COLORS } from '../constants';

interface IndexProps {
  nodes: ForensicNode[];
  onSelect: (node: ForensicNode) => void;
}

export const ForensicIndex: React.FC<IndexProps> = ({ nodes, onSelect }) => {
  return (
    <div className="px-8 py-12 pb-40">
      <div className="flex flex-col gap-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[#C5A059]/40">
               <div className="h-px w-12 bg-[#C5A059]/40" />
               <span className="text-[10px] mono font-bold tracking-[0.4em] uppercase">Archive_Protocol_Active</span>
            </div>
            <h1 className="text-command text-8xl italic text-white tracking-tighter leading-none">THE WORK</h1>
            <p className="text-white/30 serif italic text-xl max-w-2xl leading-relaxed">
              A high-resolution map of forensic signatures, strategic doctrines, and shadow intelligence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nodes.map((node, i) => {
            const nodeColor = COLORS[node.type] || '#C5A059';
            return (
              <div 
                key={node.id}
                onClick={() => onSelect(node)}
                className="forensic-card group relative h-[420px] luxe-border bg-black hover:bg-[#111111] hover:border-[#C5A059]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col shadow-2xl hover:shadow-[#C5A059]/10"
              >
                {/* Background ID Watermark */}
                <div className="absolute top-12 -right-8 opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                   <span className="text-command text-[180px] leading-none italic">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span 
                      className="text-[10px] mono font-black px-4 py-1 text-black uppercase tracking-widest"
                      style={{ backgroundColor: nodeColor }}
                    >
                      {node.type}
                    </span>
                    <Lock size={14} className="text-white/10" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-command text-5xl text-white group-hover:text-[#C5A059] transition-colors leading-[0.9] tracking-tighter mb-6">
                      {node.title.split(':').pop()?.trim() || node.title}
                    </h3>
                    
                    <p className="text-lg serif italic text-white/40 line-clamp-3 leading-relaxed group-hover:text-white/60 transition-colors mb-6">
                      {node.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {node.metadata.anchors.slice(0, 3).map(anchor => (
                        <span key={anchor} className="text-[7px] mono text-[#C5A059] uppercase tracking-tighter border border-[#C5A059]/20 px-2 py-0.5 rounded-sm">
                          {anchor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {node.themes.slice(0, 2).map(theme => (
                        <span key={theme} className="text-[8px] mono font-bold text-white/20 uppercase tracking-widest border border-white/5 px-3 py-1 group-hover:border-[#C5A059]/20 group-hover:text-[#C5A059]/50 transition-all">
                          #{theme}
                        </span>
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full luxe-border flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                       <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
                
                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity gold-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
