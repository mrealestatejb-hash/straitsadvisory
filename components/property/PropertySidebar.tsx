'use client';

import { Download } from 'lucide-react';

interface PropertySidebarProps {
  developer: string;
  whatsappNumber: string;
  brochureUrl?: string;
  propertyName?: string;
}

export function PropertySidebar({
  developer,
  whatsappNumber,
  brochureUrl,
  propertyName = '',
}: PropertySidebarProps) {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${propertyName}. Could you share more details?`
  );
  const enquiryMessage = encodeURIComponent(
    `Hi, I'd like to enquire about ${propertyName}.`
  );

  // Extract developer abbreviation for logo
  const devAbbrev = developer
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="sticky top-20">
      <div className="glass-card rounded-xl p-6">
        {/* Developer info */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-14 h-14 rounded-xl glass-dark flex items-center justify-center text-[22px] text-white font-extrabold flex-shrink-0">
            {devAbbrev}
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">{developer}</h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-semibold mt-1">
              &#9733; Developer
            </span>
          </div>
        </div>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-[10px] glass-button-green text-[15px] font-bold hover:-translate-y-px transition-all mb-2.5"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 flex-shrink-0"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.562 4.145 1.543 5.888L0 24l6.304-1.654A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.53-5.445-1.455l-.39-.232-4.047 1.062 1.08-3.946-.254-.404A9.715 9.715 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
          </svg>
          WhatsApp
        </a>

        {/* Enquire Now button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${enquiryMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3 px-5 rounded-[10px] glass-button text-[#06457F] text-sm font-semibold hover:bg-[#06457F] hover:text-white transition-all mb-4"
        >
          Enquire Now
        </a>

        {/* Download brochure */}
        {brochureUrl && (
          <a
            href={brochureUrl}
            download
            className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-[10px] bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors mb-4"
          >
            <Download className="w-4 h-4" />
            Download Brochure
          </a>
        )}

        {/* Privacy notice */}
        <p className="text-[11px] text-muted-foreground leading-relaxed text-center mt-3">
          I confirm that I have read the{' '}
          <a href="#" className="text-foreground underline font-semibold">
            privacy policy
          </a>{' '}
          and allow my information to be shared with this developer who may contact me later.
        </p>
      </div>
    </div>
  );
}
