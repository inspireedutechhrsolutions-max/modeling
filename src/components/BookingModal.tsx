import React, { useState } from 'react';
import { Model } from '../data/modelsData';
import { X, CheckCircle2, Calendar, MapPin, Briefcase, FileText, Send } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedModel: Model | null;
  castingDeck: Model[];
  allModels: Model[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedModel,
  castingDeck,
  allModels
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const [bookingMode, setBookingMode] = useState<'single' | 'deck' | 'general'>(
    preSelectedModel ? 'single' : castingDeck.length > 0 ? 'deck' : 'general'
  );

  const [selectedModelId, setSelectedModelId] = useState<string>(
    preSelectedModel ? preSelectedModel.id : allModels[0]?.id || ''
  );

  const [formData, setFormData] = useState({
    clientName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: 'High Fashion Runway',
    shootingDates: '',
    location: '',
    usageTerritory: 'Worldwide Digital & Print (1 Year)',
    budgetRange: '€10,000 – €25,000',
    briefNotes: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `MN-BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(code);
      setSubmitted(true);
    }, 700);
  };

  const currentModel = allModels.find((m) => m.id === selectedModelId) || preSelectedModel;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#111114] border border-[#2b2b35] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#212128] bg-[#16161b]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#e2b868] font-medium">
              Booking Office & Agent Inquiry
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#f5f5f7]">
              Talent Direct Booking
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8b8b96] hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-12 text-center space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-[#1a2818] border border-[#3b5936] text-[#9ae68b] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#e2b868]">
                  Inquiry Dispatched
                </span>
                <h4 className="font-editorial text-3xl text-[#f5f5f7]">
                  Booking Request Confirmed
                </h4>
                <p className="text-xs sm:text-sm text-[#9c9ca8] leading-relaxed">
                  Your direct talent booking request has been routed to our Paris and Milan Senior Booking Tables. An assigned agent will reply with availability options, hold status, and rate calculation within 4 hours.
                </p>
              </div>

              <div className="p-3 bg-[#181820] rounded-lg border border-[#252530] text-xs font-mono text-[#b3b3be]">
                Inquiry Reference: <span className="text-[#f5f5f7] font-semibold">{bookingRef}</span>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 text-xs uppercase tracking-wider text-black bg-[#e2b868] hover:bg-[#ebd08c] font-medium rounded-lg transition-colors cursor-pointer"
              >
                Close Booking Portal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Target Selection Switcher */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98] block">
                  Talent Booking Target
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingMode('single')}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium rounded-lg border transition-colors cursor-pointer ${
                      bookingMode === 'single'
                        ? 'bg-[#252530] border-[#e2b868] text-[#f5f5f7]'
                        : 'bg-[#15151a] border-[#252530] text-[#868694] hover:text-[#d1d1d6]'
                    }`}
                  >
                    Specific Model
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingMode('deck')}
                    disabled={castingDeck.length === 0}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium rounded-lg border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                      bookingMode === 'deck'
                        ? 'bg-[#252530] border-[#e2b868] text-[#f5f5f7]'
                        : 'bg-[#15151a] border-[#252530] text-[#868694] hover:text-[#d1d1d6]'
                    }`}
                  >
                    Casting Deck ({castingDeck.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingMode('general')}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-medium rounded-lg border transition-colors cursor-pointer ${
                      bookingMode === 'general'
                        ? 'bg-[#252530] border-[#e2b868] text-[#f5f5f7]'
                        : 'bg-[#15151a] border-[#252530] text-[#868694] hover:text-[#d1d1d6]'
                    }`}
                  >
                    Open Casting Brief
                  </button>
                </div>

                {/* Sub-view for Specific Model */}
                {bookingMode === 'single' && (
                  <div className="pt-2">
                    <select
                      value={selectedModelId}
                      onChange={(e) => setSelectedModelId(e.target.value)}
                      className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                    >
                      {allModels.map((m) => (
                        <option key={m.id} value={m.id} className="bg-[#181820]">
                          {m.name} — {m.board} Board ({m.representation})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sub-view for Deck */}
                {bookingMode === 'deck' && (
                  <div className="p-3 bg-[#181820] border border-[#262630] rounded-lg text-xs text-[#b8b8c4]">
                    Selected from your Casting Deck:{' '}
                    <span className="text-[#e2b868] font-medium">
                      {castingDeck.map((m) => m.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Client & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f1f26]">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Client / Production House / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="e.g. Maison de Mode Paris"
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Contact Person & Title *
                  </label>
                  <input
                    type="text"
                    required
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="e.g. Jean Dupont, Casting Director"
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="casting@agency.com"
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Direct Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+33 1 40 00 00 00"
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  />
                </div>
              </div>

              {/* Project Scope & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f26]">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  >
                    <option value="High Fashion Runway">Runway / Fashion Week</option>
                    <option value="Editorial Magazine Shoot">Editorial / Cover Feature</option>
                    <option value="Worldwide Advertising Campaign">Global Advertising Campaign</option>
                    <option value="E-Commerce & Digital Lookbook">E-Commerce & Lookbook</option>
                    <option value="Brand Ambassadorship">Brand Ambassadorship</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Proposed Dates / Options *
                  </label>
                  <input
                    type="text"
                    required
                    name="shootingDates"
                    value={formData.shootingDates}
                    onChange={handleInputChange}
                    placeholder="e.g. Oct 14–16, 2026 (1st option)"
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Shoot Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Paris Studio 7 / On Location"
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  />
                </div>
              </div>

              {/* Usage & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f1f26]">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Usage & Territory Terms
                  </label>
                  <select
                    name="usageTerritory"
                    value={formData.usageTerritory}
                    onChange={handleInputChange}
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  >
                    <option value="Editorial Only (No commercial usage)">Editorial Only (Magazine publication)</option>
                    <option value="Worldwide Digital & Print (1 Year)">Worldwide Digital & Print (1 Year)</option>
                    <option value="Worldwide Digital & Print (2 Years)">Worldwide Digital & Print (2 Years)</option>
                    <option value="Runway Live & Press Replay Only">Runway Live & Press Replay Only</option>
                    <option value="Full Global Buyout">Full Global Buyout</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                    Estimated Talent Budget Range
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                  >
                    <option value="Under €5,000">Under €5,000 (Editorial standard)</option>
                    <option value="€5,000 – €15,000">€5,000 – €15,000</option>
                    <option value="€15,000 – €40,000">€15,000 – €40,000</option>
                    <option value="€40,000 – €100,000+">€40,000 – €100,000+ (Exclusive Campaign)</option>
                  </select>
                </div>
              </div>

              {/* Brief Notes */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Creative Brief / Moodboard Link / Usage Specifics
                </label>
                <textarea
                  rows={3}
                  name="briefNotes"
                  value={formData.briefNotes}
                  onChange={handleInputChange}
                  placeholder="Provide creative direction details, photographer name, stylist, wardrobe notes, or link to concept deck..."
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-[#1f1f26] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 text-xs uppercase tracking-wider text-[#9898a4] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-8 text-xs uppercase tracking-[0.16em] font-medium text-black bg-[#e2b868] hover:bg-[#ebd08c] disabled:opacity-50 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Send Booking Request'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
