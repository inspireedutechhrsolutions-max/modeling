import React, { useState } from 'react';
import { CAMPAIGNS_LIST, Campaign } from '../data/modelsData';
import { Eye, ArrowUpRight, X } from 'lucide-react';

export const CampaignsSection: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  return (
    <section id="campaigns" className="py-20 sm:py-28 bg-[#0c0c0d] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1f1f25] pb-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#e2b868]">
              Archive & Runway
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#f5f5f7] tracking-tight">
              Selected Campaigns & Editorials
            </h2>
            <p className="text-xs sm:text-sm text-[#8f8f9b] font-light max-w-xl">
              High-fashion visual commissions and runway showcases featuring exclusive talent represented by Maison Noir.
            </p>
          </div>

          <div className="text-xs uppercase tracking-widest text-[#797985] font-mono">
            Seasonal Highlights 2026
          </div>
        </div>

        {/* Bento / Dynamic Grid for campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Showcase (Col 7) */}
          <div
            onClick={() => setSelectedCampaign(CAMPAIGNS_LIST[0])}
            className="lg:col-span-7 group relative aspect-[16/10] bg-[#141418] border border-[#22222a] rounded-2xl overflow-hidden cursor-pointer shadow-xl"
          >
            <img
              src={CAMPAIGNS_LIST[0].coverImage}
              alt={CAMPAIGNS_LIST[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#e2b868]">
                <span>{CAMPAIGNS_LIST[0].category}</span>
                <span aria-hidden="true">·</span>
                <span>{CAMPAIGNS_LIST[0].season}</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#f5f5f7]">
                {CAMPAIGNS_LIST[0].title}
              </h3>
              <p className="text-xs text-[#a0a0ab] line-clamp-2 max-w-lg">
                {CAMPAIGNS_LIST[0].description}
              </p>
              
              <div className="flex items-center gap-2 pt-2 text-[11px] text-[#e2b868] uppercase tracking-wider font-medium">
                <span>View Full Campaign Credits</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Secondary Stack (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {CAMPAIGNS_LIST.slice(1).map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                className="group relative flex-1 min-h-[220px] bg-[#141418] border border-[#22222a] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              >
                <img
                  src={campaign.coverImage}
                  alt={campaign.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#e2b868]">
                    <span>{campaign.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{campaign.season}</span>
                  </div>
                  <h4 className="font-editorial text-xl text-[#f5f5f7]">
                    {campaign.title}
                  </h4>
                  <div className="text-[11px] text-[#93939f]">
                    Photographer: {campaign.photographer}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#121216] border border-[#2b2b35] rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#212128] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#e2b868] font-medium">
                  {selectedCampaign.category} · {selectedCampaign.season}
                </span>
                <h3 className="font-editorial text-3xl text-[#f5f5f7] mt-1">
                  {selectedCampaign.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-2 text-[#8b8b96] hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#272731]">
              <img
                src={selectedCampaign.coverImage}
                alt={selectedCampaign.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#b0b0bb] leading-relaxed">
              {selectedCampaign.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#17171d] rounded-xl border border-[#23232c] text-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#6d6d79]">Client</span>
                <span className="text-[#f5f5f7] font-medium mt-0.5 block">{selectedCampaign.client}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#6d6d79]">Photographer</span>
                <span className="text-[#f5f5f7] font-medium mt-0.5 block">{selectedCampaign.photographer}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#6d6d79]">Stylist</span>
                <span className="text-[#f5f5f7] font-medium mt-0.5 block">{selectedCampaign.stylist}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#6d6d79]">Featured Talent</span>
                <span className="text-[#e2b868] font-medium mt-0.5 block">{selectedCampaign.featuredTalent.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
