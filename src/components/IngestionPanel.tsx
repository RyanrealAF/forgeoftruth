
import React, { useState } from 'react';
import { Zap, Loader2, Database, X, ShieldAlert } from 'lucide-react';
import { analyzeIntelligence, generateHash } from '../services/aiService';
import { ForensicNode } from '../types';

interface IngestionProps {
  onComplete: (node: ForensicNode) => void;
  onClose: () => void;
}

export const IngestionPanel: React.FC<IngestionProps> = ({ onComplete, onClose }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const handleIngest = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    try {
      setStatus('Analyzing Signal...');
      const analyzed = await analyzeIntelligence(input);
      const hash = await generateHash(analyzed.content || '');
      
      const newNode: ForensicNode = {
        id: `node-${Date.now()}`,
        title: analyzed.title || 'Untitled Record',
        type: analyzed.type as any,
        themes: analyzed.themes || [],
        excerpt: analyzed.excerpt || '',
        content: analyzed.content || '',
        metadata: {
          ...analyzed.metadata as any,
          recordHash: hash
        }
      };

      setStatus('Vaulting...');
      setTimeout(() => onComplete(newNode), 500);
    } catch (err) {
      setStatus('Interrupt Error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col p-6 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-between items-center mb-8 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-3">
          <Database size={20} className="text-[#C5A059]" />
          <h2 className="text-xl font-['Playfair_Display'] text-white italic">Ingestion</h2>
        </div>
        <button onClick={onClose} className="p-2 text-white/30"><X /></button>
      </div>

      <textarea 
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste raw breadcrumbs here..."
        className="flex-1 w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white text-lg focus:outline-none focus:border-[#C5A059]/40 placeholder:text-white/10 resize-none font-serif"
      />

      <div className="py-6 flex flex-col gap-4 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-3 px-2">
          {isProcessing ? (
            <Loader2 className="animate-spin text-[#C5A059]" size={14} />
          ) : (
            <ShieldAlert size={14} className="text-white/20" />
          )}
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{isProcessing ? status : 'SHA-256 Validated'}</span>
        </div>

        <button 
          onClick={handleIngest}
          disabled={isProcessing || !input.trim()}
          className="w-full h-16 rounded-2xl bg-[#C5A059] text-black font-black text-xs uppercase tracking-[0.4em] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          {isProcessing ? 'Synthesizing...' : 'Commit to Ledger'}
          <Zap size={16} />
        </button>
      </div>
    </div>
  );
};
