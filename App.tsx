
import React, { useState, useEffect } from 'react';
import Scene from './components/Scene';
import { FurnitureType, FurnitureVariant } from './types';
import { generateLore } from './services/geminiService';
import { 
  Armchair, 
  Monitor, 
  RectangleVertical, 
  Bed, 
  Leaf, 
  RefreshCcw,
  Info,
  Layers
} from 'lucide-react';

const CATEGORIES: { type: FurnitureType; icon: React.ReactNode; label: string }[] = [
  { type: 'couch', icon: <Armchair size={20} />, label: 'Seating' },
  { type: 'desk', icon: <Monitor size={20} />, label: 'Surface' },
  { type: 'bed', icon: <Bed size={20} />, label: 'Sleeping' },
  { type: 'rug', icon: <RectangleVertical size={20} />, label: 'Textiles' },
  { type: 'plant', icon: <Leaf size={20} />, label: 'Nature' },
];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FurnitureType>('couch');
  const [variants, setVariants] = useState<FurnitureVariant[]>([]);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLore = async () => {
      setLoading(true);
      const data = await generateLore(activeCategory);
      setVariants(data);
      setActiveVariantIndex(0);
      setLoading(false);
    };
    fetchLore();
  }, [activeCategory]);

  const activeVariant = variants[activeVariantIndex];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 border-r border-zinc-800 bg-[#0d0d0d] flex flex-col p-4">
        <div className="mb-10 mt-4">
          <h1 className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 mono">
            Berlin Lab // V0.5
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-100 flex items-center justify-center rounded">
              <span className="text-black font-bold text-xs">BU</span>
            </div>
            <span className="hidden md:block font-bold text-lg tracking-tight">UNDERGROUND</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.type}
              onClick={() => setActiveCategory(cat.type)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                activeCategory === cat.type 
                  ? 'bg-zinc-100 text-black' 
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat.icon}
              <span className="hidden md:block font-medium">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="hidden md:block text-[10px] text-zinc-600 mono uppercase">
            System status: Operational<br/>
            Location: Kreuzberg_Hub_01
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col">
        {/* Top Info Bar */}
        <header className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-start pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 pointer-events-auto max-w-sm">
            {loading ? (
              <div className="flex items-center gap-3">
                <RefreshCcw className="animate-spin text-zinc-500" size={18} />
                <span className="text-zinc-400 text-sm mono">Retrieving design files...</span>
              </div>
            ) : activeVariant ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 mono">
                    REV_{activeVariant.seed.toString(16).toUpperCase().slice(0, 4)}
                  </span>
                  <span className="text-xs text-zinc-500 mono uppercase tracking-wider">
                    Generation 0{activeVariant.id + 1}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2 tracking-tight uppercase italic text-zinc-100">
                  {activeVariant.name}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {activeVariant.description}
                </p>
              </>
            ) : null}
          </div>

          <div className="flex gap-2 pointer-events-auto">
             <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-zinc-400">
               <Info size={18} />
             </button>
          </div>
        </header>

        {/* 3D Scene Container */}
        <div className="flex-1">
          {activeVariant && (
             <Scene 
               type={activeCategory} 
               variant={activeVariantIndex} 
               seed={activeVariant.seed} 
             />
          )}
        </div>

        {/* Bottom Variant Selector */}
        <footer className="p-6 flex flex-col items-center gap-4">
          <div className="text-[10px] text-zinc-500 mono flex items-center gap-2 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/5">
            <Layers size={12} /> Select Model Architecture
          </div>
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-1.5 rounded-2xl flex gap-1.5">
            {variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setActiveVariantIndex(idx)}
                className={`px-8 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${
                  activeVariantIndex === idx 
                    ? 'bg-zinc-100 text-black shadow-xl shadow-white/5' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                V-{idx < 9 ? '0' : ''}{idx + 1}
              </button>
            ))}
          </div>
        </footer>

        {/* Aesthetics Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-4 rounded-3xl" />
        
        {/* Gritty Corner Details */}
        <div className="absolute bottom-6 left-6 pointer-events-none opacity-40">
           <div className="text-[10px] mono text-zinc-500 leading-tight">
             FURN_MOD_V5<br/>
             BERLIN_UNDERGROUND_PROC_LAB<br/>
             41.3851° N, 2.1734° E
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
