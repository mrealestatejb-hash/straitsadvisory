import type { Metadata } from 'next';
import { Shield, MessageCircle, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Straits Advisory',
  description:
    'How Straits Advisory collects, uses, and protects your personal data under Malaysia\'s Personal Data Protection Act 2010 (PDPA).',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[800px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5289AD]/10 text-[#5289AD] text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            PDPA Compliant
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg">
            Last updated: 26 March 2026
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-gray max-w-none space-y-12 text-[15px] leading-relaxed text-gray-700">
          {/* Introduction */}
          <section>
            <p>
              Sin Yuen – JB/KL Property, trading as <strong>Straits Advisory</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
              is committed to protecting your personal data in accordance with Malaysia&apos;s{' '}
              <strong>Personal Data Protection Act 2010 (PDPA)</strong>. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you interact with our website{' '}
              <strong>straitsadvisory.group</strong>, our advertising on Meta platforms (Facebook and Instagram),
              and our WhatsApp Business communications.
            </p>
            <p>
              By providing your personal data to us — whether through our website, lead forms, or messaging
              channels — you consent to the collection and use of your information as described in this policy.
            </p>
          </section>

          {/* 1. Data We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              1.1 Information You Provide Directly
            </h3>
            <p>When you submit an enquiry through our Meta Ads lead forms or contact us directly, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Budget range for property investment</li>
              <li>Purchase timeline or intended move-in date</li>
              <li>Any additional details you choose to provide about your property requirements</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              1.2 Information Collected via WhatsApp Business
            </h3>
            <p>
              When you contact us through WhatsApp Business (+60 10-203 8001), we collect the information you
              share during our conversations, including your phone number, name (as displayed on your WhatsApp
              profile), and any property preferences or enquiry details you communicate.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              1.3 Information Collected Automatically
            </h3>
            <p>
              We use the <strong>Meta Pixel</strong> (formerly Facebook Pixel) on our website to automatically
              collect certain technical and behavioural data, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pages viewed and interactions on our website</li>
              <li>Browser type and device information</li>
              <li>IP address and approximate location</li>
              <li>Referral source (e.g., which ad or link brought you to our site)</li>
              <li>Time spent on pages and click behaviour</li>
            </ul>
            <p className="mt-2">
              This data is collected through cookies and similar tracking technologies. It does not, on its own,
              identify you by name but may be linked to your Meta (Facebook/Instagram) profile.
            </p>
          </section>

          {/* 2. How We Use Your Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h2>
            <p>We use the personal data we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Property enquiry follow-up</strong> — to contact you regarding properties you have
                expressed interest in and to discuss your investment requirements.
              </li>
              <li>
                <strong>Sending brochures, pricing, and property information</strong> — to provide you with
                relevant listings, floor plans, pricing sheets, and development brochures.
              </li>
              <li>
                <strong>Marketing communications</strong> — to send you updates about new property launches,
                market insights, exclusive deals, and event invitations that may be of interest to you.
              </li>
              <li>
                <strong>Advertising optimisation</strong> — to measure the effectiveness of our advertising
                campaigns on Meta platforms (Facebook and Instagram) and to improve the relevance of ads
                shown to you and similar audiences.
              </li>
              <li>
                <strong>Website analytics and improvement</strong> — to understand how visitors use our website
                so we can improve its content, layout, and user experience.
              </li>
              <li>
                <strong>Compliance with legal obligations</strong> — to meet our obligations under applicable
                laws and regulations, including Malaysia&apos;s PDPA.
              </li>
            </ul>
          </section>

          {/* 3. Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing with Third Parties</h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              3.1 Meta Platforms (Facebook & Instagram)
            </h3>
            <p>
              We share data with <strong>Meta Platforms, Inc.</strong> for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Lead form data</strong> — when you submit an enquiry through a Facebook or Instagram
                lead form, your responses are processed through Meta&apos;s platform and shared with us.
              </li>
              <li>
                <strong>Meta Pixel data</strong> — website browsing data collected by the Meta Pixel is shared
                with Meta to enable ad targeting, retargeting (showing you relevant property ads based on your
                website activity), and lookalike audience creation.
              </li>
              <li>
                <strong>Custom Audiences</strong> — we may upload hashed contact information (such as email
                addresses or phone numbers) to Meta to create Custom Audiences for targeted advertising.
                Meta matches this data against its user base using a hashing process and does not use it
                for any other purpose.
              </li>
            </ul>
            <p className="mt-3">
              Meta&apos;s use of your data is governed by{' '}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5289AD] underline underline-offset-2 inline-flex items-center gap-1"
              >
                Meta&apos;s Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              3.2 WhatsApp (Meta)
            </h3>
            <p>
              WhatsApp Business is provided by Meta. Messages exchanged through WhatsApp are end-to-end
              encrypted. However, metadata (such as phone numbers and message timestamps) is processed by
              Meta in accordance with{' '}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5289AD] underline underline-offset-2 inline-flex items-center gap-1"
              >
                WhatsApp&apos;s Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              3.3 Other Third Parties
            </h3>
            <p>
              We do not sell your personal data to any third party. We may share your data with trusted
              service providers (such as CRM platforms or email marketing tools) who assist us in operating
              our business, provided they are contractually obligated to protect your data. We may also
              disclose your data where required by law or to protect our legal rights.
            </p>
          </section>

          {/* 4. Cookies & Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
            <p>Our website uses the following tracking technologies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Meta Pixel</strong> — tracks website visits and actions (e.g., page views, button
                clicks) to measure ad performance and enable retargeting.
              </li>
              <li>
                <strong>Essential cookies</strong> — required for the website to function properly
                (e.g., session management, security).
              </li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect
              your experience on our website. To opt out of Meta&apos;s ad tracking specifically, you can
              adjust your{' '}
              <a
                href="https://www.facebook.com/adpreferences"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5289AD] underline underline-offset-2 inline-flex items-center gap-1"
              >
                Facebook Ad Preferences
                <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>
          </section>

          {/* 5. Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p>We retain your personal data for the following periods:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Lead form and enquiry data</strong> — retained for up to <strong>24 months</strong>{' '}
                from the date of collection, or longer if you enter into a business relationship with us.
              </li>
              <li>
                <strong>WhatsApp conversation data</strong> — retained for up to <strong>24 months</strong>{' '}
                from the date of last communication.
              </li>
              <li>
                <strong>Meta Pixel / website analytics data</strong> — retained by Meta in accordance with
                their data retention policies. On our end, aggregated analytics data may be kept indefinitely
                for business analysis purposes.
              </li>
              <li>
                <strong>Transaction-related data</strong> — if you proceed with a property purchase, your
                data may be retained for up to <strong>7 years</strong> in compliance with applicable legal
                and regulatory requirements.
              </li>
            </ul>
            <p className="mt-3">
              After the applicable retention period, your personal data will be securely deleted or anonymised.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights Under the PDPA</h2>
            <p>
              Under Malaysia&apos;s Personal Data Protection Act 2010, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access</strong> — request a copy of the personal data we hold about you.
              </li>
              <li>
                <strong>Correction</strong> — request that we correct any inaccurate or incomplete personal
                data.
              </li>
              <li>
                <strong>Withdrawal of consent</strong> — withdraw your consent for us to process your
                personal data. Please note that this may affect our ability to provide you with our services.
              </li>
              <li>
                <strong>Opt-out of marketing</strong> — unsubscribe from marketing communications at any
                time by contacting us or clicking the unsubscribe link in any marketing message.
              </li>
              <li>
                <strong>Deletion</strong> — request that we delete your personal data, subject to any
                legal obligations that may require us to retain certain records.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the details in Section 8 below.
              We will respond to your request within <strong>21 days</strong> as required by the PDPA.
            </p>
          </section>

          {/* 7. Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data
              against unauthorised access, loss, misuse, or alteration. These measures include encrypted
              communications (HTTPS, end-to-end encrypted WhatsApp messages), access controls, and secure
              data storage practices.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure.
              While we strive to protect your data, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* 8. Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, wish to exercise your data rights,
              or have a complaint regarding how your personal data has been handled, please contact us:
            </p>

            <div className="mt-6 p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="font-semibold text-gray-900 mb-1">Sin Yuen – JB/KL Property</p>
              <p className="text-gray-500 text-sm mb-4">Trading as Straits Advisory</p>
              <a
                href="https://wa.me/60102038001"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25d366] text-white font-medium text-sm hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp +60 10-203 8001
              </a>
              <p className="mt-4 text-sm text-gray-500">
                Email:{' '}
                <a href="mailto:hello@straitsadvisory.group" className="text-[#5289AD] underline underline-offset-2">
                  hello@straitsadvisory.group
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Website:{' '}
                <a href="https://straitsadvisory.group" className="text-[#5289AD] underline underline-offset-2">
                  straitsadvisory.group
                </a>
              </p>
            </div>
          </section>

          {/* 9. Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              applicable laws. Any updates will be posted on this page with a revised &quot;Last updated&quot; date.
              We encourage you to review this policy periodically.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
