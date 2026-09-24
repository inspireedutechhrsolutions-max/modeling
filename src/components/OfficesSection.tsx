import React, { useEffect, useState } from 'react';
import { AGENCY_OFFICES } from '../data/modelsData';
import { MapPin, Mail, Phone, Clock, Globe } from 'lucide-react';

export const OfficesSection: React.FC = () => {
  const [timezones, setTimezones] = useState<{ [city: string]: string }>({});

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimezones({
        Paris: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' }),
        Milan: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit' }),
        'New York': now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        Tokyo: now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="offices" className="py-20 sm:py-28 bg-[#09090b] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1f1f25] pb-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#e2b868]">
              International Presence
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#f5f5f7] tracking-tight">
              Global Booking Hubs
            </h2>
            <p className="text-xs sm:text-sm text-[#8f8f9b] font-light max-w-xl">
              Direct connection with our licensed model managers and board directors across the fashion capitals.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#797985] font-mono">
            <Globe className="w-3.5 h-3.5 text-[#e2b868]" />
            <span>Four Direct Bureaus</span>
          </div>
        </div>

        {/* 4 Office Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENCY_OFFICES.map((office) => (
            <div
              key={office.city}
              className="p-6 bg-[#111115] border border-[#22222b] rounded-xl flex flex-col justify-between space-y-6 hover:border-[#383846] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#f5f5f7]">
                      {office.city}
                    </h3>
                    <div className="text-[11px] uppercase tracking-wider text-[#e2b868] mt-0.5">
                      {office.country}
                    </div>
                  </div>

                  {/* Live Bureau Clock */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#a5a5b2] bg-[#181820] px-2.5 py-1 rounded border border-[#252530]">
                    <Clock className="w-3 h-3 text-[#e2b868]" />
                    <span className="tabular-nums">{timezones[office.city] || '--:--'}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#9898a5] pt-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#6c6c78] shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#6c6c78] shrink-0" />
                    <a
                      href={`tel:${office.phone}`}
                      className="hover:text-white transition-colors font-mono"
                    >
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#6c6c78] shrink-0" />
                    <a
                      href={`mailto:${office.email}`}
                      className="hover:text-[#e2b868] transition-colors truncate"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1c1c24] text-[11px] text-[#7d7d8a]">
                <span className="text-[#a0a0ae] font-medium">Head Agent:</span> {office.headAgent}
              </div>

            </div>
          ))}
        </div>

        {/* Ethics & Model Protection Charter */}
        <div className="p-6 sm:p-8 bg-[#131317] border border-[#252530] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h4 className="font-editorial text-xl text-[#f5f5f7]">
              Maison Noir Ethics & Model Health Charter
            </h4>
            <p className="text-xs text-[#8e8e9c] leading-relaxed">
              We strictly adhere to the Paris Fashion Week Model Welfare Charter, mandating medical certifications, certified nutritional support, safe working hour caps, and certified chaperones for all junior development talent.
            </p>
          </div>

          <div className="shrink-0 text-xs font-mono text-[#e2b868] border border-[#e2b868]/40 px-3.5 py-2 rounded-lg">
            ISO-9001 & PFW COMPLIANT
          </div>
        </div>

      </div>
    </section>
  );
};
