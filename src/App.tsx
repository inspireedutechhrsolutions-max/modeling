/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TalentBoard } from './components/TalentBoard';
import { CompCardModal } from './components/CompCardModal';
import { CastingDeckDrawer } from './components/CastingDeckDrawer';
import { ScoutingSection } from './components/ScoutingSection';
import { CampaignsSection } from './components/CampaignsSection';
import { BookingModal } from './components/BookingModal';
import { OfficesSection } from './components/OfficesSection';
import { Footer } from './components/Footer';
import { ChatBot, openMaisonChat } from './components/ChatBot';
import { MODELS_ROSTER, Model } from './data/modelsData';

export default function App() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [castingDeck, setCastingDeck] = useState<Model[]>([
    MODELS_ROSTER[0], // Pre-populate with 1 model so user immediately discovers the Casting Deck feature
  ]);
  const [isCastingDrawerOpen, setIsCastingDrawerOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPreSelectedModel, setBookingPreSelectedModel] = useState<Model | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Shortlist toggle
  const handleToggleCasting = (model: Model) => {
    setCastingDeck((prev) => {
      const exists = prev.some((m) => m.id === model.id);
      if (exists) {
        return prev.filter((m) => m.id !== model.id);
      } else {
        return [...prev, model];
      }
    });
  };

  const handleRemoveFromDeck = (modelId: string) => {
    setCastingDeck((prev) => prev.filter((m) => m.id !== modelId));
  };

  const handleClearDeck = () => {
    setCastingDeck([]);
  };

  const handleOpenBooking = (model?: Model) => {
    setBookingPreSelectedModel(model || null);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingForDeck = () => {
    setBookingPreSelectedModel(null);
    setIsCastingDrawerOpen(false);
    setIsBookingModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0d] text-[#e8e8ea] flex flex-col font-sans-clean selection:bg-[#e2b868] selection:text-black">
      
      {/* Navigation Top Bar Contract */}
      <Navbar
        castingCount={castingDeck.length}
        onOpenCastingDeck={() => setIsCastingDrawerOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenChat={openMaisonChat}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Editorial Split Hero Section */}
        <Hero
          onExploreRoster={() => handleNavigate('roster')}
          onOpenScouting={() => handleNavigate('scouting')}
          onOpenChat={openMaisonChat}
        />

        {/* Talent Roster & Main Boards */}
        <TalentBoard
          models={MODELS_ROSTER}
          onSelectModel={(model) => setSelectedModel(model)}
          onToggleCasting={handleToggleCasting}
          castingDeckIds={castingDeck.map((m) => m.id)}
          onOpenBookingForModel={(model) => handleOpenBooking(model)}
        />

        {/* Campaigns & Editorial Lookbook */}
        <CampaignsSection />

        {/* Digital Scouting & Become a Model Application Portal */}
        <ScoutingSection />

        {/* Global Bureaus & Live Timezones */}
        <OfficesSection />
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Official Composite Card Modal */}
      {selectedModel && (
        <CompCardModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onToggleCasting={handleToggleCasting}
          isInCasting={castingDeck.some((m) => m.id === selectedModel.id)}
          onBookModel={(model) => {
            setSelectedModel(null);
            handleOpenBooking(model);
          }}
        />
      )}

      {/* Casting Deck Shortlist Drawer */}
      <CastingDeckDrawer
        isOpen={isCastingDrawerOpen}
        onClose={() => setIsCastingDrawerOpen(false)}
        castingDeck={castingDeck}
        onRemoveModel={handleRemoveFromDeck}
        onClearDeck={handleClearDeck}
        onSelectModel={(model) => {
          setIsCastingDrawerOpen(false);
          setSelectedModel(model);
        }}
        onOpenBookingForDeck={handleOpenBookingForDeck}
      />

      {/* Direct Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedModel={bookingPreSelectedModel}
        castingDeck={castingDeck}
        allModels={MODELS_ROSTER}
      />

      {/* Luxury n8n AI Concierge Chatbot */}
      <ChatBot />

    </div>
  );
}
