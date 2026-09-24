import React from 'react';
import { ArrowUp, Instagram, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-[#1f1f25] text-[#8e8e9c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info (Col 5) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-editorial text-3xl tracking-[0.2em] uppercase text-[#f5f5f7] block font-light">
              MAISON NOIR
            </span>
            <p className="text-xs sm:text-sm text-[#7e7e8c] font-light max-w-sm leading-relaxed">
              International Model Management and Vanguard Creative Representation. Licensed across Paris, Milan, New York, and Tokyo.
            </p>
            <div className="text-[11px] text-[#636370] pt-2">
              Member of CSAM (Chambre Syndicale des Agences de Mannequins)
            </div>
          </div>

          {/* Quick Nav (Col 2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#d1d1d6]">
              Boards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('roster')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women&apos;s Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roster')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men&apos;s Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roster')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Haute Runway
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roster')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Faces
                </button>
              </li>
            </ul>
          </div>

          {/* Discover (Col 2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#d1d1d6]">
              Agency
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('campaigns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Editorial Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scouting')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Digital Scouting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offices')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Global Bureaus
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#e2b868] transition-colors cursor-pointer text-[#e2b868]"
                >
                  Book Talent Direct
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social (Col 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#d1d1d6]">
              Central Inquiries
            </h4>
            <div className="space-y-1 text-xs">
              <div>Editorial: <a href="mailto:editorial@maisonnoir-mgmt.com" className="hover:text-white">editorial@maisonnoir-mgmt.com</a></div>
              <div>Commercial: <a href="mailto:booking@maisonnoir-mgmt.com" className="hover:text-white">booking@maisonnoir-mgmt.com</a></div>
              <div>Scouting: <a href="mailto:scouting@maisonnoir-mgmt.com" className="hover:text-white">scouting@maisonnoir-mgmt.com</a></div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#16161b] border border-[#23232c] flex items-center justify-center text-[#868694] hover:text-[#e2b868] hover:border-[#383846] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#16161b] border border-[#23232c] flex items-center justify-center text-[#868694] hover:text-[#e2b868] hover:border-[#383846] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#16161b] border border-[#23232c] flex items-center justify-center text-[#868694] hover:text-[#e2b868] hover:border-[#383846] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-row */}
        <div className="pt-8 border-t border-[#18181e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5f5f6b]">
          <div>
            © {new Date().getFullYear()} MAISON NOIR MODEL MANAGEMENT SAS. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#8e8e9c] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#8e8e9c] cursor-pointer">Terms of Representation</span>
            <span className="hover:text-[#8e8e9c] cursor-pointer">Model Health Protocol</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[#8e8e9c]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
