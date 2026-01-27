
import React from 'react';
import { 
  ArrowLeft, Search, Network, Activity, 
  Cpu, LayoutGrid, ShieldCheck
} from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode | string;
  accessTier: number;
  onTierChange: (tier: number) => void;
  onBack: () => void;
  onSearch: () => void;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, accessTier, onTierChange, onBack, onSearch, onNavigate
}) => {
  const navItems = [
    { label: 'NETWORK', id: 'GRAPH' },
    { label: 'LEDGER', id: 'INDEX' },
    { label: 'SYNAPTIC', id: 'DISCOVERY' },
    { label: 'INTEGRITY', id: 'INTEGRITY' }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[60] pt-[env(safe-area-inset-top)] bg-black/60 backdrop-blur-3xl border-b border-white/5">
      <div className="flex items-center justify-between px-8 h-20">
        <div className="flex items-center gap-6">
          {currentView === 'DOCUMENT' ? (
            <button onClick={onBack} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full luxe-border flex items-center justify-center bg-white/5 group-active:scale-90 transition-transform">
                <ArrowLeft size={18} className="text-[#C5A059]" />
              </div>
              <span className="text-xs condensed tracking-widest text-white/50">RETURN_TO_ARCHIVE</span>
            </button>
          ) : (
            <div className="flex flex-col">
               <h1 className="text-xl condensed tracking-[0.2em] text-white">LEDGER <span className="text-[#C5A059]">v4.2</span></h1>
               <div className="flex items-center gap-2 mt-1">
                 <ShieldCheck size={10} className="text-green-500/80" />
                 <span className="text-[8px] mono font-bold tracking-widest text-white/30 uppercase italic">ENCLAVE_MODE: SECURE</span>
               </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-10">
             {navItems.map(tab => (
               <button 
                 key={tab.label} 
                 onClick={() => onNavigate(tab.id)}
                 className={`text-[10px] mono font-bold tracking-[0.3em] transition-colors relative h-20 px-2 ${
                   currentView === tab.id ? 'text-[#C5A059]' : 'text-white/30 hover:text-[#C5A059]'
                 }`}
               >
                 {tab.label}
                 {currentView === tab.id && <div className="nav-active-line" />}
               </button>
             ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-full luxe-border">
              {[1, 2, 3].map(t => (
                <button 
                  key={t}
                  onClick={() => onTierChange(t)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-[10px] mono font-black transition-all ${accessTier === t ? 'bg-[#C5A059] text-black gold-glow' : 'text-white/20'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button onClick={onSearch} className="w-10 h-10 luxe-border rounded-full flex items-center justify-center text-white/40 active:bg-[#C5A059]/20 active:text-[#C5A059] transition-all">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BottomNavProps {
  currentView: ViewMode | string;
  onViewChange: (view: ViewMode) => void;
  onShowIntegrity: () => void;
  onShowDiscovery: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  currentView, onViewChange, onShowIntegrity, onShowDiscovery 
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[60] pb-[env(safe-area-inset-bottom)] bg-black/80 backdrop-blur-3xl border-t border-white/5">
      <div className="flex items-center h-20 px-4">
        <NavIcon 
          active={currentView === 'GRAPH'} 
          onClick={() => onViewChange('GRAPH')} 
          icon={<Network size={22} />} 
          label="NETWORK" 
        />
        <NavIcon 
          active={currentView === 'INDEX'} 
          onClick={() => onViewChange('INDEX')} 
          icon={<LayoutGrid size={22} />} 
          label="LEDGER" 
        />
        <div className="w-px h-8 bg-white/5 mx-2" />
        <NavIcon 
          active={currentView === 'DISCOVERY'} 
          onClick={onShowDiscovery} 
          icon={<Cpu size={22} />} 
          label="SYNAPTIC" 
          accent
        />
        <NavIcon 
          active={currentView === 'INTEGRITY'} 
          onClick={onShowIntegrity} 
          icon={<Activity size={22} />} 
          label="INTEGRITY" 
        />
      </div>
    </div>
  );
};

const NavIcon: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; accent?: boolean }> = ({ 
  active, onClick, icon, label, accent 
}) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center justify-center h-full gap-2 transition-all relative ${active || accent ? 'text-[#C5A059]' : 'text-white/20'}`}
  >
    <div className={`${active ? 'scale-110 drop-shadow-[0_0_8px_#C5A059]' : 'scale-100'} transition-transform duration-500`}>
      {icon}
    </div>
    <span className="text-[9px] condensed tracking-[0.2em] font-medium">{label}</span>
    {active && <div className="nav-active-line" />}
  </button>
);

export const ClassificationBadge: React.FC<{ level: string }> = ({ level }) => (
  <div className="inline-flex items-center px-4 py-1.5 rounded-full luxe-border bg-[#C5A059]/5 gold-glow">
    <span className="text-[9px] condensed font-medium text-[#C5A059] tracking-[0.15em] uppercase">{level}</span>
  </div>
);
