
import React from 'react';
import { X, ShieldCheck, Activity, Link2Off, RefreshCw, AlertTriangle, Lock } from 'lucide-react';
import { DiagnosticsReport } from '../types';

interface IntegrityProps {
  report: DiagnosticsReport;
  onClose: () => void;
}

export const IntegrityOverlay: React.FC<IntegrityProps> = ({ report, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/95 z-[300] flex items-center justify-center p-8 backdrop-blur-3xl animate-in fade-in duration-500">
      <div className="w-full max-w-4xl bg-[#050505] border border-[#C5A059]/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(197,160,89,0.1)]">
        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 flex items-center justify-center border border-[#C5A059]/20">
              <ShieldCheck size={24} className="text-[#C5A059]" />
            </div>
            <div>
              <h2 className="text-3xl font-['Playfair_Display'] text-white italic">Synaptic Integrity Audit</h2>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono mt-1">Autonomous Repair Engine v4.2.0</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.4em]">Archival Cohesion</span>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-['Playfair_Display'] text-white">{report.integrityScore}%</span>
                <div className="mb-2 h-4 w-px bg-white/10" />
                <span className="text-[10px] text-white/40 mb-2 font-mono uppercase">Stable</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                <Activity size={16} className="text-[#C5A059]" />
                <div className="flex flex-col">
                   <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{report.connectionDensity}</span>
                   <span className="text-[8px] text-white/20 uppercase tracking-widest">Network Density</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                <Lock size={16} className="text-green-500/60" />
                <div className="flex flex-col">
                   <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">ENABLED</span>
                   <span className="text-[8px] text-white/20 uppercase tracking-widest">Data_Isolation</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-red-500/10 flex items-center gap-4">
                <Link2Off size={16} className="text-red-500/40" />
                <div className="flex flex-col">
                   <span className="text-[10px] text-red-500/60 font-bold uppercase tracking-widest">DISABLED</span>
                   <span className="text-[8px] text-white/20 uppercase tracking-widest">External_Download</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Active Repair Log</span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20">
                <RefreshCw size={10} className="text-[#C5A059] animate-spin" />
                <span className="text-[8px] font-bold text-[#C5A059] uppercase tracking-widest">Neural Healing Active</span>
              </div>
            </div>

            <div className="h-64 overflow-y-auto pr-4 space-y-3 custom-scrollbar">
              {report.repairs.length === 0 ? (
                <div className="h-full flex items-center justify-center border border-dashed border-white/5 rounded-2xl">
                  <p className="text-[10px] text-white/20 uppercase tracking-widest italic">No repairs required. Ledger integrity nominal.</p>
                </div>
              ) : (
                report.repairs.map((repair, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-[#C5A059]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-[#C5A059]/5 flex items-center justify-center text-[#C5A059]/40 font-mono text-[10px]">
                        {Math.round(repair.confidence * 100)}%
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-white/20 uppercase tracking-widest">Source: {repair.sourceNodeId}</span>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] text-red-500/40 line-through font-mono uppercase">{repair.originalId}</span>
                           <span className="text-[10px] text-white/40">→</span>
                           <span className="text-[10px] text-[#C5A059] font-mono uppercase tracking-widest font-bold">{repair.repairedId}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[8px] text-green-500/40 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all">Healed</span>
                  </div>
                ))
              )}

              {report.brokenLinks.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-red-500/40 mb-4">
                    <AlertTriangle size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Critical Synaptic Failures</span>
                  </div>
                  {report.brokenLinks.map((link, i) => (
                    <div key={i} className="p-4 rounded-xl bg-red-500/[0.02] border border-red-500/10 flex items-center justify-between">
                      <span className="text-[10px] text-red-500/60 font-mono uppercase tracking-widest">{link}</span>
                      <span className="text-[8px] text-red-500/30 uppercase tracking-widest">Unresolved</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
