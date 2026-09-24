import React, { useState, useMemo } from 'react';
import { Model } from '../data/modelsData';
import { Search, Plus, Check, SlidersHorizontal, Eye, ArrowUpRight } from 'lucide-react';

interface TalentBoardProps {
  models: Model[];
  onSelectModel: (model: Model) => void;
  onToggleCasting: (model: Model) => void;
  castingDeckIds: string[];
  onOpenBookingForModel: (model: Model) => void;
}

export const TalentBoard: React.FC<TalentBoardProps> = ({
  models,
  onSelectModel,
  onToggleCasting,
  castingDeckIds,
  onOpenBookingForModel,
}) => {
  const [selectedBoard, setSelectedBoard] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'height-desc' | 'name-asc'>('featured');

  const boards = ['All', 'Women', 'Men', 'Runway', 'New Faces'];

  const filteredModels = useMemo(() => {
    return models
      .filter((model) => {
        const matchesBoard = selectedBoard === 'All' || model.board === selectedBoard;
        const matchesSearch =
          model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.representation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.campaigns.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesBoard && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'height-desc') return b.heightCm - a.heightCm;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // default featured order
      });
  }, [models, selectedBoard, searchQuery, sortBy]);

  return (
    <section id="roster" className="py-16 sm:py-24 bg-[#0c0c0d] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1f1f25] pb-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#e2b868]">
              Active Representation
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#f5f5f7] tracking-tight">
              Talent Roster & Main Boards
            </h2>
            <p className="text-xs sm:text-sm text-[#8f8f9b] font-light max-w-xl">
              Select any talent to review digital polaroids, comp card metrics, and editorial portfolio records.
            </p>
          </div>

          <div className="text-xs text-[#8f8f9b] font-mono tabular-nums">
            Showing <span className="text-[#f5f5f7] font-semibold">{filteredModels.length}</span> of {models.length} Signed Talents
          </div>
        </div>

        {/* Filter & Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Board Segmented Controls (Interactive buttons) */}
          <div className="flex items-center gap-1 p-1 bg-[#141418] border border-[#26262e] rounded-lg overflow-x-auto">
            {boards.map((board) => (
              <button
                key={board}
                onClick={() => setSelectedBoard(board)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedBoard === board
                    ? 'bg-[#272730] text-[#f5f5f7] shadow-sm'
                    : 'text-[#8f8f9b] hover:text-[#d1d1d6]'
                }`}
              >
                {board}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6c6c77]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, city, campaign..."
                className="w-full bg-[#141418] border border-[#26262e] rounded-lg pl-9 pr-3 py-2 text-xs text-[#f5f5f7] placeholder-[#6c6c77] focus:outline-none focus:border-[#e2b868] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8f8f9b] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-[#141418] border border-[#26262e] rounded-lg px-3 py-2 text-xs text-[#a0a0ab]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#6c6c77]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort models by"
                className="bg-transparent text-xs text-[#f5f5f7] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#141418] text-[#f5f5f7]">Featured Board</option>
                <option value="height-desc" className="bg-[#141418] text-[#f5f5f7]">Height (Tallest first)</option>
                <option value="name-asc" className="bg-[#141418] text-[#f5f5f7]">Name (A – Z)</option>
              </select>
            </div>

          </div>

        </div>

        {/* Model Cards Grid: Desktop 3-4 Columns */}
        {filteredModels.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#26262e] rounded-xl bg-[#101014] space-y-3">
            <p className="font-editorial text-2xl text-[#d1d1d6]">No models match your search criteria</p>
            <p className="text-xs text-[#7d7d88]">Try resetting your filter or searching for another keyword</p>
            <button
              onClick={() => {
                setSelectedBoard('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs uppercase tracking-wider text-[#e2b868] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredModels.map((model) => {
              const isInCasting = castingDeckIds.includes(model.id);

              return (
                <div
                  key={model.id}
                  className="group flex flex-col bg-[#121216] border border-[#22222a] rounded-xl overflow-hidden hover:border-[#3a3a46] transition-all duration-300"
                >
                  {/* Portrait Visual 3:4 */}
                  <div
                    onClick={() => onSelectModel(model)}
                    className="relative aspect-[3/4] overflow-hidden bg-[#1a1a20] cursor-pointer"
                  >
                    <img
                      src={model.image}
                      alt={model.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03]"
                    />

                    {/* Gradient shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Quick View Hover Cue */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium text-black bg-white rounded-md shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Comp Card</span>
                      </span>
                    </div>

                    {/* Overlay Details at bottom of photo */}
                    <div className="absolute bottom-3 left-4 right-4 text-xs">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#e2b868]">
                        {model.board} Board
                      </div>
                      <div className="font-editorial text-2xl text-[#f5f5f7] tracking-wide font-normal">
                        {model.name}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#a5a5b0] mt-0.5">
                        <span>{model.height}</span>
                        <span aria-hidden="true">·</span>
                        <span>{model.representation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Action Bar */}
                  <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                    
                    {/* Measurements summary */}
                    <div className="grid grid-cols-3 gap-2 text-center py-2 px-1 bg-[#17171d] rounded-md text-[11px] border border-[#212129]">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#6d6d79]">Bust/Chest</span>
                        <span className="font-mono text-[#dcdce2]">{model.bustOrChest.split('/')[0].trim()}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#6d6d79]">Waist</span>
                        <span className="font-mono text-[#dcdce2]">{model.waist.split('/')[0].trim()}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#6d6d79]">Eyes</span>
                        <span className="text-[#dcdce2] truncate block">{model.eyes}</span>
                      </div>
                    </div>

                    {/* Recent Campaign preview */}
                    <div className="text-[11px] text-[#868692] truncate">
                      <span className="text-[#a8a8b6] font-medium">Credits:</span> {model.campaigns[0]}
                    </div>

                    {/* Interactive Button Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onSelectModel(model)}
                        className="w-full py-2 px-2.5 text-[11px] uppercase tracking-[0.12em] font-medium text-[#d1d1d6] bg-[#1a1a20] hover:bg-[#262630] border border-[#2d2d38] rounded-md transition-colors text-center cursor-pointer whitespace-nowrap"
                      >
                        Comp Card
                      </button>

                      <button
                        onClick={() => onToggleCasting(model)}
                        className={`w-full py-2 px-2.5 text-[11px] uppercase tracking-[0.12em] font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                          isInCasting
                            ? 'bg-[#293626] text-[#9ae68b] border border-[#3e5639]'
                            : 'bg-[#1a1a20] text-[#d1d1d6] hover:text-[#f3f3f5] border border-[#2d2d38]'
                        }`}
                        title={isInCasting ? 'Remove from Casting Deck' : 'Add to Casting Deck'}
                      >
                        {isInCasting ? (
                          <>
                            <Check className="w-3 h-3 text-[#9ae68b]" />
                            <span>In Deck</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 text-[#e2b868]" />
                            <span>Deck +</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
