
import React, { useMemo } from 'react';
import { ForensicNode } from '../types';
import { ClassificationBadge } from './UI';
import { Fingerprint, Zap, Target, CornerRightDown, Network, ShieldCheck, ChevronRight, Lock } from 'lucide-react';

interface DocumentProps {
  node: ForensicNode;
  onNavigate: (id: string) => void;
  onReturnToMap: () => void;
  allNodes: ForensicNode[];
}

export const DocumentView: React.FC<DocumentProps> = ({ node, onNavigate, onReturnToMap, allNodes }) => {
  const structuralLinks = allNodes.filter(n => node.linksTo?.includes(n.id));
  
  const semanticInferences = useMemo(() => {
    return allNodes.filter(n => {
      if (n.id === node.id || node.linksTo?.includes(n.id)) return false;
      return (node.metadata.anchors || []).some(a => n.metadata.anchors?.includes(a));
    });
  }, [node, allNodes]);

  return (
    <div className="px-8 py-20 bg-[#050505] min-h-full">
      <div className="max-w-5xl mx-auto space-y-24 pb-40">
        
        {/* Header Block - Pure Anton Italic */}
        <div className="space-y-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full luxe-border bg-[#C5A059]/10 flex items-center justify-center gold-glow">
              <Lock size={28} className="text-[#C5A059]" />
            </div>
            <div className="space-y-2">
               <span className="text-[10px] mono font-bold text-[#C5A059] tracking-[0.4em] uppercase">Private_Intelligence_Ledger</span>
               <div className="flex gap-4">
                  <ClassificationBadge level={node.metadata.classification} />
                  <span className="px-4 py-1.5 luxe-border bg-white/5 rounded-full text-[9px] mono text-white/40 tracking-widest uppercase">{node.metadata.date}</span>
               </div>
            </div>
          </div>

          <h1 className="text-command text-[140px] italic text-white leading-[0.75] tracking-tighter">
            {node.title.split(':').pop()?.trim()}
          </h1>

          <div className="flex gap-4">
            {node.themes.map(t => (
               <span key={t} className="text-[10px] mono font-bold px-4 py-1.5 luxe-border text-[#C5A059]/60 uppercase tracking-widest bg-white/[0.02]">#{t}</span>
            ))}
          </div>
        </div>

        {/* Content Body - High-End Editorial Style */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-3 space-y-12">
            <div className="w-24 h-1 bg-[#C5A059] gold-glow" />
            <div 
              className="text-4xl leading-[1.6] text-white/90 font-light serif italic prose prose-invert max-w-none px-2"
              dangerouslySetInnerHTML={{ __html: node.content.replace(/\n/g, '<br/><br/>') }}
            />
            <div className="w-full h-px bg-white/5 mt-20" />
          </div>

          {/* Sidebar - System Preference Style Panels */}
          <div className="space-y-8">
            <div className="luxe-panel rounded-[32px] p-8 space-y-6">
               <h4 className="text-[10px] mono font-black text-[#C5A059] tracking-[0.3em] uppercase mb-4">Tactical_Meta</h4>
               <div className="space-y-4">
                 <div>
                   <span className="text-[8px] mono text-white/30 uppercase block mb-1">Vector</span>
                   <p className="text-xs font-bold text-white tracking-widest">{node.metadata.vector}</p>
                 </div>
                 <div>
                   <span className="text-[8px] mono text-white/30 uppercase block mb-1">Record_Hash</span>
                   <p className="text-[9px] mono text-[#C5A059] break-all">{node.metadata.recordHash}</p>
                 </div>
               </div>
            </div>

            <div className="luxe-panel rounded-[32px] p-8 space-y-4">
              <h4 className="text-[10px] mono font-black text-white/40 tracking-[0.3em] uppercase">Anchors</h4>
              <div className="flex flex-wrap gap-2">
                {node.metadata.anchors.map(a => (
                  <span key={a} className="text-[9px] mono px-3 py-1 bg-white/5 rounded-full text-white/60 luxe-border">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connected Graph Nodes - Horizontal Scroll */}
        {structuralLinks.length > 0 && (
          <div className="space-y-10">
            <h4 className="text-command text-5xl italic text-white opacity-20 tracking-tighter uppercase">Convergent_Paths</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {structuralLinks.map(link => (
                <button 
                  key={link.id} 
                  onClick={() => onNavigate(link.id)}
                  className="group relative h-40 luxe-border bg-black p-8 hover:bg-[#111111] transition-all text-left flex items-center justify-between"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] mono font-bold text-[#C5A059]/60 uppercase tracking-widest">{link.type}</span>
                    <h4 className="text-3xl condensed text-white group-hover:text-[#C5A059] transition-colors italic tracking-tighter uppercase">
                      {link.title.split(':').pop()?.trim()}
                    </h4>
                  </div>
                  <ChevronRight size={24} className="text-white/10 group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
