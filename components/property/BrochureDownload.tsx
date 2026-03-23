import { Download } from 'lucide-react';

interface BrochureDownloadProps {
  title: string;
  description: string;
  url: string;
}

export function BrochureDownload({ title, description, url }: BrochureDownloadProps) {
  return (
    <div className="mt-5 px-6 py-5 glass-tint-green glass-specular rounded-xl flex items-center justify-between flex-wrap gap-3">
      <div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-[13px] text-gray-700">{description}</p>
      </div>
      <a
        href={url}
        download
        className="inline-flex items-center gap-2 px-6 py-2.5 glass-dark text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
      >
        <Download className="w-4 h-4" />
        Download Brochure
      </a>
    </div>
  );
}
