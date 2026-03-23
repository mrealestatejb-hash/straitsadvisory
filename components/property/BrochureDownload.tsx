import { Download } from 'lucide-react';

interface BrochureDownloadProps {
  title: string;
  description: string;
  url: string;
}

export function BrochureDownload({ title, description, url }: BrochureDownloadProps) {
  return (
    <div className="mt-5 px-6 py-5 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-between flex-wrap gap-3">
      <div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-[13px] text-gray-700">{description}</p>
      </div>
      <a
        href={url}
        download
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a1a2e] text-white rounded-lg text-sm font-semibold hover:bg-[#2d2d5e] transition-colors"
      >
        <Download className="w-4 h-4" />
        Download Brochure
      </a>
    </div>
  );
}
