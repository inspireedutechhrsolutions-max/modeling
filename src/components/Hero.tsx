import React from 'react';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/hero_fashion_editorial_1790271486872.jpg';

interface HeroProps {
  onExploreRoster: () => void;
  onOpenScouting: () => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRoster, onOpenScouting, onOpenChat }) => {
  return (
    <section id="hero" className="relative border-b border-[#232328] overflow-hidden bg-[#0c0c0d]">
      
      {/* Top micro kicker banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-[#868691] border-b border-[#1c1c21] pb-3">
          <div className="flex items-center gap-2">
            <span>Autumn / Winter 2026 Season</span>
            <span aria-hidden="true">·</span>
            <span>Paris Fashion Week Representation</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>Paris</span>
            <span aria-hidden="true">·</span>
            <span>Milano</span>
            <span aria-hidden="true">·</span>
            <span>New York</span>
            <span aria-hidden="true">·</span>
            <span>Tokyo</span>
          </div>
        </div>
      </div>

      {/* Main Split Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Bold Editorial Typography & Agency Statement */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#e2b868]">
                International Management Board
              </span>
              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-light text-[#f5f5f7] leading-[1.05] tracking-tight text-balance">
                The architecture of high fashion & runway vanguard.
              </h1>
              <p className="text-sm sm:text-base text-[#9f9fa9] font-light leading-relaxed max-w-xl">
                MAISON NOIR is an independent luxury management agency representing singular editorial, couture runway, and campaign talent. We define career longevity through selective placement with the world’s most prestigious ateliers.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreRoster}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-medium text-black bg-[#e2b868] hover:bg-[#ebd08c] rounded-md transition-colors cursor-pointer"
              >
                <span>Explore Talent Boards</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenScouting}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs uppercase tracking-[0.16em] font-medium text-[#d1d1d6] bg-[#16161a] hover:bg-[#222228] border border-[#2e2e36] rounded-md transition-colors cursor-pointer"
              >
                <span>Digital Scouting</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs uppercase tracking-[0.16em] font-medium text-[#e2b868] hover:text-white bg-[#191612] hover:bg-[#252018] border border-[#423419] rounded-md transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#e2b868]" />
                  <span>AI Concierge</span>
                </button>
              )}
            </div>

            {/* Strict Quantitative Evidence Adjacency */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1c1c21]">
              <div>
                <div className="font-editorial text-3xl sm:text-4xl text-[#f3f3f5] font-light tabular-nums">
                  140+
                </div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#81818d] mt-1">
                  Runway Exclusives
                </div>
              </div>
              <div>
                <div className="font-editorial text-3xl sm:text-4xl text-[#f3f3f5] font-light tabular-nums">
                  84
                </div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#81818d] mt-1">
                  Global Vogue Covers
                </div>
              </div>
              <div>
                <div className="font-editorial text-3xl sm:text-4xl text-[#f3f3f5] font-light tabular-nums">
                  4
                </div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#81818d] mt-1">
                  Continental Hubs
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-xl overflow-hidden border border-[#26262e] bg-[#141418] shadow-2xl">
              <img
                src={heroImage}
                alt="Maison Noir international editorial campaign"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.05]"
              />
              
              {/* Subtle luxury overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom caption inside visual frame */}
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#e2b868] font-medium">
                    Current Campaign
                  </div>
                  <div className="font-editorial text-xl text-[#f5f5f7] tracking-wide">
                    Monumental Form & Chiaroscuro
                  </div>
                  <div className="text-[11px] text-[#b3b3bd] font-light mt-0.5">
                    Elena Rostova & Mathias Vance for Paris Haute Couture Archive
                  </div>
                </div>

                <div className="hidden sm:block text-right text-[10px] font-mono text-[#8a8a96] tabular-nums">
                  PARIS FW26
                </div>
              </div>
            </div>

            {/* Corner aesthetic badge without pills */}
            <div className="hidden sm:flex items-center gap-2 absolute -bottom-3 right-6 bg-[#16161a] border border-[#2b2b34] px-3.5 py-1.5 rounded text-[11px] text-[#a4a4af]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e2b868]" />
              <span>Accredited with Fédération de la Haute Couture</span>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Marquee Ribbon Section Divider */}
      <div className="border-t border-[#1c1c21] py-3.5 bg-[#0f0f12] overflow-hidden whitespace-nowrap">
        <div className="flex gap-8 text-[11px] uppercase tracking-[0.28em] text-[#6b6b75] select-none">
          <span>Paris · Milan · New York · Tokyo · London</span>
          <span aria-hidden="true">—</span>
          <span>Haute Couture · Prêt-à-Porter · Editorial Vanguard · Global Campaigns</span>
          <span aria-hidden="true">—</span>
          <span>Full Cast Management · Polaroid Direct Scouting · Exclusive Representation</span>
          <span aria-hidden="true">—</span>
          <span>Paris · Milan · New York · Tokyo · London</span>
        </div>
      </div>

    </section>
  );
};
