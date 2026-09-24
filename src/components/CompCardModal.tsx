import React, { useEffect, useState } from 'react';
import { Model } from '../data/modelsData';
import { X, Printer, Plus, Check, ArrowUpRight, Camera, Award, Instagram, ExternalLink } from 'lucide-react';

interface CompCardModalProps {
  model: Model | null;
  onClose: () => void;
  onToggleCasting: (model: Model) => void;
  isInCasting: boolean;
  onBookModel: (model: Model) => void;
}

export const CompCardModal: React.FC<CompCardModalProps> = ({
  model,
  onClose,
  onToggleCasting,
  isInCasting,
  onBookModel
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'polaroids'>('portfolio');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!model) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl bg-[#111114] border border-[#2b2b35] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header / Actions Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22222a] bg-[#16161b]">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-lg tracking-[0.2em] uppercase text-[#e2b868]">
              MAISON NOIR
            </span>
            <span className="text-xs text-[#6e6e7b]">/</span>
            <span className="text-xs uppercase tracking-[0.15em] text-[#d1d1d6] font-medium">
              Official Composite Card
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#b9b9c4] hover:text-white bg-[#1f1f26] hover:bg-[#282832] rounded-md transition-colors border border-[#2d2d38] cursor-pointer"
              title="Print Composite Card"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Card</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8c8c98] hover:text-white hover:bg-[#22222b] rounded-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          
          {/* Main Grid: Left Portrait & Right Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 5 Cols: Main Editorial Portrait */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#26262f] bg-[#16161b] shadow-lg">
                <img
                  src={model.image}
                  alt={model.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Polaroid stamp watermark */}
                <div className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest bg-black/60 backdrop-blur-sm text-[#e2b868] px-2 py-0.5 rounded">
                  {model.board} DIVISION
                </div>
              </div>

              {/* Quick Tab Switcher: Editorial vs Digital Polaroids */}
              <div className="flex items-center gap-1 p-1 bg-[#17171c] border border-[#282832] rounded-lg">
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`flex-1 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-colors cursor-pointer ${
                    activeTab === 'portfolio' ? 'bg-[#292934] text-white shadow-sm' : 'text-[#848492] hover:text-[#d1d1d6]'
                  }`}
                >
                  Portfolio & Bio
                </button>
                <button
                  onClick={() => setActiveTab('polaroids')}
                  className={`flex-1 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-colors cursor-pointer ${
                    activeTab === 'polaroids' ? 'bg-[#292934] text-white shadow-sm' : 'text-[#848492] hover:text-[#d1d1d6]'
                  }`}
                >
                  Digital Polaroids
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Exact Model Specifications & Bio */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Title & Division */}
              <div className="space-y-1 border-b border-[#212128] pb-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-4xl sm:text-5xl font-light text-[#f5f5f7] tracking-tight">
                    {model.name}
                  </h3>
                  <a
                    href={`https://instagram.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#8c8c98] hover:text-[#e2b868] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{model.instagram}</span>
                  </a>
                </div>
                
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#e2b868] font-medium pt-1">
                  <span>{model.representation}</span>
                  <span aria-hidden="true">·</span>
                  <span>{model.board} Board</span>
                </div>
              </div>

              {/* Exact Technical Measurements Table (Clean typography, no pills) */}
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7d7d8a]">
                  Technical Measurements
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Height</span>
                    <span className="font-mono text-sm font-semibold text-[#f5f5f7] tabular-nums mt-0.5 block">{model.height}</span>
                  </div>

                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Bust / Chest</span>
                    <span className="font-mono text-sm font-semibold text-[#f5f5f7] tabular-nums mt-0.5 block">{model.bustOrChest}</span>
                  </div>

                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Waist</span>
                    <span className="font-mono text-sm font-semibold text-[#f5f5f7] tabular-nums mt-0.5 block">{model.waist}</span>
                  </div>

                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Hips</span>
                    <span className="font-mono text-sm font-semibold text-[#f5f5f7] tabular-nums mt-0.5 block">{model.hips}</span>
                  </div>

                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Shoes</span>
                    <span className="font-mono text-sm font-semibold text-[#f5f5f7] tabular-nums mt-0.5 block">{model.shoes}</span>
                  </div>

                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Hair</span>
                    <span className="text-sm font-medium text-[#f5f5f7] mt-0.5 block">{model.hair}</span>
                  </div>

                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Eyes</span>
                    <span className="text-sm font-medium text-[#f5f5f7] mt-0.5 block">{model.eyes}</span>
                  </div>

                  <div className="p-3 bg-[#15151a] border border-[#212128] rounded-lg">
                    <span className="block text-[10px] uppercase tracking-wider text-[#6f6f7b]">Suit / Dress</span>
                    <span className="font-mono text-sm font-semibold text-[#f5f5f7] tabular-nums mt-0.5 block">{model.dressOrSuit || '34 FR / 2 US'}</span>
                  </div>
                </div>
              </div>

              {/* Bio or Polaroids based on tab */}
              {activeTab === 'portfolio' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7d7d8a]">
                      Agency Representation Statement
                    </div>
                    <p className="text-xs sm:text-sm text-[#b5b5c0] font-light leading-relaxed">
                      {model.bio}
                    </p>
                  </div>

                  {/* Editorial Campaigns & Runway Appearances */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-[#15151a] border border-[#212128] rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#e2b868]">
                        <Award className="w-3.5 h-3.5" />
                        <span>Select Campaigns</span>
                      </div>
                      <ul className="text-xs text-[#a0a0ae] space-y-1.5">
                        {model.campaigns.map((camp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#e2b868] mt-0.5">·</span>
                            <span>{camp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-[#15151a] border border-[#212128] rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#e2b868]">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Runway Exclusives</span>
                      </div>
                      <ul className="text-xs text-[#a0a0ae] space-y-1.5">
                        {model.runwayShows.map((show, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#e2b868] mt-0.5">·</span>
                            <span>{show}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                /* Digital Polaroids View */
                <div className="space-y-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7d7d8a]">
                    Agency Digital Polaroids (Raw & Unretouched)
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {model.polaroids.map((polaroid, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="aspect-[3/4] bg-[#1a1a20] rounded-lg overflow-hidden border border-[#292934] relative">
                          <img
                            src={model.secondaryImages[idx % model.secondaryImages.length] || model.image}
                            alt={polaroid.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover filter grayscale contrast-110"
                          />
                          <div className="absolute top-2 left-2 text-[9px] font-mono uppercase bg-black/70 px-1.5 py-0.5 text-white rounded">
                            {polaroid.label}
                          </div>
                        </div>
                        <p className="text-[10px] text-[#7d7d8a] leading-tight">
                          {polaroid.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#212128]">
                <button
                  onClick={() => onBookModel(model)}
                  className="flex-1 py-3 px-4 text-xs uppercase tracking-[0.16em] font-medium text-black bg-[#e2b868] hover:bg-[#ebd08c] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Book {model.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onToggleCasting(model)}
                  className={`py-3 px-5 text-xs uppercase tracking-[0.14em] font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    isInCasting
                      ? 'bg-[#253222] text-[#9ae68b] border border-[#3b5236]'
                      : 'bg-[#1c1c22] text-[#d1d1d6] hover:text-white border border-[#2e2e38]'
                  }`}
                >
                  {isInCasting ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#9ae68b]" />
                      <span>In Casting Deck</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-[#e2b868]" />
                      <span>Add to Casting Deck</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 border-t border-[#1e1e24] bg-[#121216] text-[11px] text-[#6d6d79] flex items-center justify-between">
          <span>Official booking representation governed by Maison Noir International Terms.</span>
          <span className="font-mono tabular-nums">ID: MN-{model.id.toUpperCase().slice(0, 8)}</span>
        </div>

      </div>

    </div>
  );
};
