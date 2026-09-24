import React from 'react';
import { Bookmark, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  castingCount: number;
  onOpenCastingDeck: () => void;
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  castingCount,
  onOpenCastingDeck,
  onOpenBooking,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0d]/90 backdrop-blur-md border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-editorial text-2xl sm:text-3xl tracking-[0.22em] uppercase font-light text-[#f3f3f5] group-hover:text-[#e2b868] transition-colors">
            MAISON NOIR
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#9c9ca4]">
          <button
            onClick={() => handleNavClick('roster')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeSection === 'roster' ? 'text-[#e2b868] font-semibold' : ''
            }`}
          >
            Talent Boards
          </button>
          <button
            onClick={() => handleNavClick('campaigns')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeSection === 'campaigns' ? 'text-[#e2b868] font-semibold' : ''
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => handleNavClick('scouting')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeSection === 'scouting' ? 'text-[#e2b868] font-semibold' : ''
            }`}
          >
            Scouting
          </button>
          <button
            onClick={() => handleNavClick('offices')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeSection === 'offices' ? 'text-[#e2b868] font-semibold' : ''
            }`}
          >
            Offices
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenCastingDeck}
            className="flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-[0.14em] font-medium text-[#d1d1d6] bg-[#1a1a1e] hover:bg-[#25252b] border border-[#2e2e36] rounded-md transition-colors whitespace-nowrap cursor-pointer"
            title="View Casting Shortlist"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#e2b868]" />
            <span>Casting Deck</span>
            {castingCount > 0 && (
              <span className="ml-1 text-[11px] font-mono tabular-nums bg-[#e2b868] text-black font-bold px-1.5 py-0.2 rounded-sm">
                {castingCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium text-black bg-[#e2b868] hover:bg-[#ebd08c] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Book Talent</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#9c9ca4] hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#232328] bg-[#111114] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-xs uppercase tracking-[0.18em]">
            <button
              onClick={() => handleNavClick('roster')}
              className="text-left text-[#d1d1d6] hover:text-[#e2b868] py-2"
            >
              Talent Boards
            </button>
            <button
              onClick={() => handleNavClick('campaigns')}
              className="text-left text-[#d1d1d6] hover:text-[#e2b868] py-2"
            >
              Campaigns & Editorial
            </button>
            <button
              onClick={() => handleNavClick('scouting')}
              className="text-left text-[#d1d1d6] hover:text-[#e2b868] py-2"
            >
              Become a Model (Scouting)
            </button>
            <button
              onClick={() => handleNavClick('offices')}
              className="text-left text-[#d1d1d6] hover:text-[#e2b868] py-2"
            >
              Offices & Agents
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-xs uppercase tracking-[0.15em] font-medium text-black bg-[#e2b868] rounded-md"
            >
              Book Talent Directly
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
