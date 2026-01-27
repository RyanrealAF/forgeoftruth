
import React, { useState } from 'react';
import { X, Cpu, Zap, Ghost, Share2, CornerDownRight, ShieldAlert } from 'lucide-react';
import { NeuralDiscoveryResult, ForensicNode, GraphLink, NodeType, TacticalVector } from '../types';
import { runNeuralScan, generateHash } from '../services/aiService';

export const DiscoveryDashboard: React.FC<{
  existingNodes: ForensicNode[];
  onApply: (newNodes: ForensicNode[], newLinks: GraphLink[]) => void;
  onClose: () => void;
}> = ({ existingNodes, onApply, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<NeuralDiscoveryResult | null>(null);

  const initiateScan = async () => {
    setIsScanning(true);
    try {
      const rawData = await runNeuralScan(existingNodes);
      const phantomNodes = await Promise.all(rawData.phantomNodes.map(async (p: any, i: number) => {
        const hash = await generateHash(p.content);
        return {
          id: `phantom-${Date.now()}-${i}`,
          type: NodeType.PHANTOM,
          title: `INFERRED: ${p.title}`,
          excerpt: p.excerpt,
          content: p.content,
          themes: ['AI-INFERRED', 'PATTERN-GAP'],
          metadata: {
            classification: 'SIGNATURE: PHANTOM',
            date: new Date().toISOString(),
            vector: p.vector || TacticalVector.UNKNOWN,
            anchors: p.anchors || [],
            tier: 2,
            recordHash: hash,
            isPhantom: true
          }
        };
      }));

      setResults({
        newLinks: rawData.proposedLinks.map((l: any) => ({
          source: l.sourceId, target: l.targetId, weight: l.confidence, type: 'INFERRED', reasoning: l.reasoning
        })),
        phantomNodes,
        scanTimestamp: new Date().toLocaleTimeString()
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 animate-in slide-in-from-bottom-8">
      <div className="flex justify-between items-center mb-10 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 luxe-border flex items-center justify-center bg-[#C5A059]/10 text-[#C5A059]">
             <Cpu size={20} />
          </div>
          <div>
            <h2 className="text-xl serif font-black italic text-white leading-none">Neural Discovery</h2>
            <span className="text-[8px] mono font-bold text-white/30 uppercase tracking-widest">v2.4.0 Enclave Analysis</span>
          </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors"><X size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-12 pb-20 scrollbar-hide">
        {!results && (
          <div className="h-full flex flex-col items-center justify-center text-center px-6 gap-8">
            <div className={`w-24 h-24 luxe-border rounded-full flex items-center justify-center relative ${isScanning ? 'gold-glow' : ''}`}>
               {isScanning && <div className="absolute inset-0 rounded-full border-2 border-[#C5A059] animate-ping" />}
               <Cpu size={40} className={isScanning ? 'text-[#C5A059]' : 'text-white/20'} />
            </div>
            <div className="space-y-2">
               <p className="text-lg serif font-bold text-white tracking-tight uppercase">Analyze Shadow Signatures</p>
               <p className="text-xs mono text-white/30 uppercase tracking-widest">Read-only pattern recognition within the secure archive boundaries.</p>
            </div>
            <button 
              onClick={initiateScan}
              disabled={isScanning}
              className="w-full h-16 luxe-border bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] active:bg-[#C5A059] active:scale-95 transition-all"
            >
              {isScanning ? 'SCANNING_CLOSED_LOOP...' : 'INITIATE_FORENSIC_ANALYSIS'}
            </button>
          </div>
        )}

        {results && (
          <div className="space-y-12">
            <div className="p-4 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-2xl flex items-center gap-4">
              <ShieldAlert size={16} className="text-[#C5A059]" />
              <p className="text-[9px] mono text-[#C5A059] uppercase tracking-widest leading-relaxed">
                DATA_ISOLATION_NOTICE: Discovery results are transient and cannot be exported or committed to permanent storage.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white/40 text-[10px] mono font-black uppercase tracking-widest border-b border-white/10 pb-2">
                <Ghost size={14} /> Phantom_Signatures_Detected
              </div>
              <div className="grid gap-3">
                {results.phantomNodes.map((p, i) => (
                  <div key={i} className="p-5 luxe-border bg-white/[0.02] group">
                    <h4 className="text-lg serif font-black italic text-white/60 group-hover:text-[#C5A059] transition-colors">{p.title.replace('INFERRED: ', '')}</h4>
                    <p className="text-[10px] mono text-white/20 uppercase tracking-widest mt-2">{p.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#C5A059] text-[10px] mono font-black uppercase tracking-widest border-b border-[#C5A059]/20 pb-2">
                <Share2 size={14} /> Proposed_Synaptic_Links
              </div>
              <div className="space-y-3">
                {results.newLinks.map((l, i) => (
                  <div key={i} className="p-5 luxe-border bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] mono font-bold text-white/70 uppercase">
                        <span>{l.source.slice(0, 10)}</span>
                        <Zap size={10} className="text-[#C5A059]" />
                        <span>{l.target.slice(0, 10)}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#C5A059] text-black text-[9px] mono font-black">SIG_{Math.round(l.weight * 100)}%</span>
                    </div>
                    <div className="flex gap-3">
                       <CornerDownRight size={14} className="text-white/20 flex-shrink-0" />
                       <p className="text-[11px] text-white/40 italic leading-relaxed">{l.reasoning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onApply(results.phantomNodes, results.newLinks)}
              className="w-full h-16 bg-[#C5A059] text-black font-black uppercase tracking-[0.4em] text-[10px] active:scale-95 transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)]"
            >
              PROJECT_DISCOVERIES_TO_MAP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
