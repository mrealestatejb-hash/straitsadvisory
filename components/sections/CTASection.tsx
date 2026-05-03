import { MessageCircle, Home, Eye, CheckSquare, FileText, Key } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Start a Conversation',
    desc: 'WhatsApp us your requirements — budget, unit size, investment goals',
    time: '5 mins',
    color: 'from-[#5289AD] to-[#3a6d8c]',
  },
  {
    icon: Home,
    title: 'Virtual or Physical Viewing',
    desc: 'Tour the property from Singapore or schedule an on-site visit',
    time: '1-2 days',
    color: 'from-[#5289AD] to-[#3a6d8c]',
  },
  {
    icon: CheckSquare,
    title: 'Unit Selection & Reservation',
    desc: 'Choose your unit and secure it with a booking fee',
    time: 'Same day',
    color: 'from-[#5289AD] to-[#3a6d8c]',
  },
  {
    icon: FileText,
    title: 'Documentation & SPA',
    desc: 'We guide you through legal paperwork — can be done remotely',
    time: '2-4 weeks',
    color: 'from-[#5289AD] to-[#3a6d8c]',
  },
  {
    icon: Key,
    title: 'Completion & Handover',
    desc: 'Receive your keys and start earning rental income',
    time: 'Per project timeline',
    color: 'from-[#5289AD] to-[#3a6d8c]',
  },
];

export function CTASection() {
  return (
    <section className="py-12 md:py-20 px-[clamp(16px,4vw,48px)] bg-[#FAF9F7]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[12px] md:text-[13px] font-semibold tracking-[2px] uppercase text-[#5289AD] mb-2 md:mb-3">
            Your Investment Journey
          </p>
          <h2 className="text-[26px] md:text-4xl font-extrabold text-[#243C4C] mb-2 md:mb-3">
            5 Steps to Ownership
          </h2>
          <p className="text-[#5379AE] text-[15px] md:text-lg leading-snug">
            We handle the complexity — you focus on the investment
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[3px] bg-[#A8C4EC]/40" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center relative">
                  {/* Icon circle */}
                  <div className={`w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 md:mb-4 relative z-10 shadow-lg shadow-[#5289AD]/20`}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Step number */}
                  <div className="absolute -top-1 -right-1 md:right-auto md:-top-1 md:left-[calc(50%+16px)] w-6 h-6 rounded-full bg-[#243C4C] text-white text-[11px] font-bold flex items-center justify-center z-20">
                    {i + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-[15px] font-bold text-[#243C4C] mb-1.5 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#5379AE] leading-relaxed mb-3 max-w-[180px]">
                    {step.desc}
                  </p>

                  {/* Time badge */}
                  <span className="text-[12px] font-semibold text-[#5289AD] bg-[#A8C4EC]/20 px-3 py-1 rounded-full">
                    {step.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-14">
          <a
            href="https://wa.me/60102038001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25d366] text-white font-semibold rounded-full text-lg hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25d366]/25"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}
