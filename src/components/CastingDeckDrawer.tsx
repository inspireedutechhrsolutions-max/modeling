import React from 'react';
import { Model } from '../data/modelsData';
import { X, Trash2, Printer, ArrowUpRight, UserCheck, Layers } from 'lucide-react';

interface CastingDeckDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  castingDeck: Model[];
  onRemoveModel: (modelId: string) => void;
  onClearDeck: () => void;
  onSelectModel: (model: Model) => void;
  onOpenBookingForDeck: () => void;
}

export const CastingDeckDrawer: React.FC<CastingDeckDrawerProps> = ({
  isOpen,
  onClose,
  castingDeck,
  onRemoveModel,
  onClearDeck,
  onSelectModel,
  onOpenBookingForDeck
}) => {
  if (!isOpen) return null;

  const handlePrintDeck = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#111114] border-l border-[#26262e] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#212128] bg-[#16161a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-[#e2b868]" />
              <div>
                <h3 className="font-editorial text-2xl text-[#f5f5f7] tracking-wide">
                  Casting Deck
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-[#81818d]">
                  {castingDeck.length} {castingDeck.length === 1 ? 'Talent' : 'Talents'} Selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#8b8b97] hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {castingDeck.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[#23232c] rounded-xl p-8 space-y-3">
                <UserCheck className="w-8 h-8 text-[#5c5c67] mx-auto" />
                <p className="font-editorial text-xl text-[#d1d1d8]">Your casting deck is empty</p>
                <p className="text-xs text-[#7d7d8a] leading-relaxed">
                  Browse the Talent Boards and click &ldquo;Deck +&rdquo; on any model to compile your curated casting shortlist.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {castingDeck.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center gap-4 p-3 bg-[#16161b] border border-[#23232b] rounded-xl hover:border-[#33333d] transition-colors"
                  >
                    <div
                      onClick={() => onSelectModel(model)}
                      className="w-16 h-20 bg-[#1d1d24] rounded-lg overflow-hidden shrink-0 cursor-pointer border border-[#2b2b35]"
                    >
                      <img
                        src={model.image}
                        alt={model.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => onSelectModel(model)}
                          className="font-editorial text-lg text-[#f5f5f7] hover:text-[#e2b868] transition-colors truncate text-left cursor-pointer"
                        >
                          {model.name}
                        </button>
                        <span className="text-[10px] uppercase font-mono text-[#e2b868]">
                          {model.board}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#868694] space-x-2 mt-0.5">
                        <span className="font-mono tabular-nums">{model.height}</span>
                        <span aria-hidden="true">·</span>
                        <span>{model.representation.split(' ')[0]}</span>
                      </div>

                      <div className="text-[10px] text-[#6d6d7a] font-mono mt-1">
                        B: {model.bustOrChest.split('/')[0].trim()} · W: {model.waist.split('/')[0].trim()} · H: {model.hips.split('/')[0].trim()}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveModel(model.id)}
                      className="p-2 text-[#6d6d7a] hover:text-[#e16868] transition-colors cursor-pointer"
                      title="Remove from deck"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          {castingDeck.length > 0 && (
            <div className="p-6 border-t border-[#212128] bg-[#16161a] space-y-3">
              <button
                onClick={onOpenBookingForDeck}
                className="w-full py-3 px-4 text-xs uppercase tracking-[0.16em] font-medium text-black bg-[#e2b868] hover:bg-[#ebd08c] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Booking for Casting Deck ({castingDeck.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrintDeck}
                  className="py-2 px-3 text-xs uppercase tracking-[0.12em] text-[#b2b2bd] hover:text-white bg-[#1c1c22] hover:bg-[#25252c] border border-[#2b2b35] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Deck</span>
                </button>

                <button
                  onClick={onClearDeck}
                  className="py-2 px-3 text-xs uppercase tracking-[0.12em] text-[#868692] hover:text-[#e16868] bg-[#1c1c22] hover:bg-[#25252c] border border-[#2b2b35] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
