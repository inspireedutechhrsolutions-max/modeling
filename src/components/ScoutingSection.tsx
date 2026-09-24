import React, { useState } from 'react';
import { Camera, CheckCircle2, Upload, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export const ScoutingSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    country: '',
    height: '',
    bustChest: '',
    waist: '',
    hips: '',
    shoeSize: '',
    targetBoard: 'Women',
    instagram: '',
    notes: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSimulate = (shotType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setUploadedFiles((prev) => ({ ...prev, [shotType]: previewUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `MN-SCOUT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionId(generatedId);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="scouting" className="py-20 sm:py-28 bg-[#09090b] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] font-medium text-[#e2b868]">
            Scouting & Development
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#f5f5f7] tracking-tight">
            Become a Maison Noir Model
          </h2>
          <p className="text-sm sm:text-base text-[#9a9aa5] font-light leading-relaxed">
            Our scouting directors review unsolicited digital submissions weekly for our Paris, Milan, New York, and Tokyo boards. No prior professional agency experience is required.
          </p>
        </div>

        {/* Polaroid Guidelines (Crucial for high fashion authenticity) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#f5f5f7]">
              Official Polaroid & Digitals Requirements
            </h3>
            <span className="text-[11px] text-[#787884] font-mono">Strict standard</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-[#121216] border border-[#23232c] rounded-xl space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-mono text-[#e2b868]">01. Clean Skin</span>
              <h4 className="text-sm font-semibold text-[#f5f5f7]">Zero Makeup</h4>
              <p className="text-xs text-[#8d8d99] leading-relaxed">
                No foundation, mascara, false lashes, or filters. We need to evaluate your raw skin texture and natural bone structure.
              </p>
            </div>

            <div className="p-5 bg-[#121216] border border-[#23232c] rounded-xl space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-mono text-[#e2b868]">02. Daylight</span>
              <h4 className="text-sm font-semibold text-[#f5f5f7]">Natural Lighting</h4>
              <p className="text-xs text-[#8d8d99] leading-relaxed">
                Stand facing a large window during daylight hours. No flash, harsh yellow indoor lighting, or heavy studio lamps.
              </p>
            </div>

            <div className="p-5 bg-[#121216] border border-[#23232c] rounded-xl space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-mono text-[#e2b868]">03. Attire</span>
              <h4 className="text-sm font-semibold text-[#f5f5f7]">Fitted Clothing</h4>
              <p className="text-xs text-[#8d8d99] leading-relaxed">
                Plain black or white tank top with form-fitting skinny jeans, or simple solid black swimwear to gauge body proportions.
              </p>
            </div>

            <div className="p-5 bg-[#121216] border border-[#23232c] rounded-xl space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-mono text-[#e2b868]">04. Posture</span>
              <h4 className="text-sm font-semibold text-[#f5f5f7]">Natural Angles</h4>
              <p className="text-xs text-[#8d8d99] leading-relaxed">
                Provide front profile, left & right side profiles, and full-length vertical shot standing upright with neutral expression.
              </p>
            </div>
          </div>
        </div>

        {/* Application Form & Digital Uploads */}
        {submitted ? (
          <div className="p-8 sm:p-12 bg-[#121216] border border-[#2e2e38] rounded-2xl max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-[#1a2818] border border-[#3b5936] text-[#9ae68b] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#e2b868]">
                Application Received
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#f5f5f7] tracking-tight">
                Thank you, {formData.fullName || 'Candidate'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9c9ca8] max-w-md mx-auto leading-relaxed">
                Your polaroids and specifications have been forwarded to the Maison Noir Global Scouting Board. If your profile aligns with our current client roster requirements, our scouting division will contact you within 5 to 7 business days.
              </p>
            </div>

            <div className="p-4 bg-[#181820] rounded-lg border border-[#252530] text-xs font-mono text-[#b3b3be] max-w-sm mx-auto">
              Reference Code: <span className="text-[#f5f5f7] font-semibold">{submissionId}</span>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  age: '',
                  city: '',
                  country: '',
                  height: '',
                  bustChest: '',
                  waist: '',
                  hips: '',
                  shoeSize: '',
                  targetBoard: 'Women',
                  instagram: '',
                  notes: '',
                });
                setUploadedFiles({});
              }}
              className="px-6 py-2.5 text-xs uppercase tracking-wider text-[#d1d1d6] hover:text-white bg-[#1e1e24] hover:bg-[#282832] rounded-md transition-colors cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#121216] border border-[#23232c] rounded-2xl p-6 sm:p-10 space-y-10">
            
            <div className="border-b border-[#1f1f26] pb-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#f5f5f7]">
                Digital Scouting Application Form
              </h3>
              <p className="text-xs text-[#7d7d8a] mt-1">All fields marked with an asterisk (*) are mandatory.</p>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Maya Rostova"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@domain.com"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Phone (with country code) *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Age *
                </label>
                <input
                  type="number"
                  required
                  min="16"
                  max="60"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g. 19"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  City of Residence *
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Paris"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="e.g. France"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>
            </div>

            {/* Board & Physical Measurements */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 pt-4 border-t border-[#1f1f26]">
              <div className="col-span-2 space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Desired Division *
                </label>
                <select
                  name="targetBoard"
                  value={formData.targetBoard}
                  onChange={handleInputChange}
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                >
                  <option value="Women">Women Main Board</option>
                  <option value="Men">Men Main Board</option>
                  <option value="Runway">Runway / Haute Couture</option>
                  <option value="New Faces">New Faces / Development</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Height *
                </label>
                <input
                  type="text"
                  required
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="5'11 / 180cm"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Bust/Chest
                </label>
                <input
                  type="text"
                  name="bustChest"
                  value={formData.bustChest}
                  onChange={handleInputChange}
                  placeholder="32 in / 81 cm"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Waist
                </label>
                <input
                  type="text"
                  name="waist"
                  value={formData.waist}
                  onChange={handleInputChange}
                  placeholder="24 in / 61 cm"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Hips
                </label>
                <input
                  type="text"
                  name="hips"
                  value={formData.hips}
                  onChange={handleInputChange}
                  placeholder="35 in / 89 cm"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>
            </div>

            {/* Social & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1f1f26]">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Instagram Handle / Portfolio
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@yourhandle"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#8b8b98]">
                  Additional Notes / Agency History
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Prior representation or mother agency if applicable"
                  className="w-full bg-[#181820] border border-[#2b2b35] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#e2b868]"
                />
              </div>
            </div>

            {/* Polaroid Digitals Upload Slots */}
            <div className="space-y-4 pt-4 border-t border-[#1f1f26]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#f5f5f7]">
                    Upload 4 Digital Polaroids
                  </h4>
                  <p className="text-[11px] text-[#7d7d8a] mt-0.5">
                    Click each slot to select an image from your device.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: 'headshot', label: '1. Headshot Front', hint: 'Direct eye contact, neutral' },
                  { id: 'profile', label: '2. Profile Side', hint: 'Ear & jawline visible' },
                  { id: 'threeQuarter', label: '3. 3/4 Turn', hint: 'Subtle angle, natural hair' },
                  { id: 'fullLength', label: '4. Full Length', hint: 'Head to toe proportion' },
                ].map((slot) => {
                  const preview = uploadedFiles[slot.id];
                  return (
                    <div
                      key={slot.id}
                      className="relative aspect-[3/4] bg-[#181820] border border-dashed border-[#31313d] hover:border-[#e2b868] rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-3 transition-colors cursor-pointer group"
                    >
                      {preview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={preview}
                            alt={slot.label}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white">
                            Change Photo
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 pointer-events-none">
                          <Camera className="w-5 h-5 text-[#868694] mx-auto group-hover:text-[#e2b868] transition-colors" />
                          <div>
                            <div className="text-xs font-medium text-[#d1d1d8]">{slot.label}</div>
                            <div className="text-[10px] text-[#70707c] mt-0.5">{slot.hint}</div>
                          </div>
                        </div>
                      )}
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSimulate(slot.id, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        title={slot.label}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-[#1f1f26] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#787885]">
                <AlertCircle className="w-4 h-4 text-[#e2b868] shrink-0" />
                <span>Maison Noir never charges application or evaluation fees to prospective models.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-8 text-xs uppercase tracking-[0.16em] font-medium text-black bg-[#e2b868] hover:bg-[#ebd08c] disabled:opacity-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {isSubmitting ? 'Transmitting Polaroids...' : 'Submit Digital Application'}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
