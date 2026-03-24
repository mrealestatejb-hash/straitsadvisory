import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Straits Advisory',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Shown in hero section and meta tags',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code, e.g. 60102038001',
      initialValue: '60102038001',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'X (Twitter)', value: 'twitter' },
                ],
              },
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'heroStats',
      title: 'Homepage Stats',
      type: 'array',
      description: 'Statistics shown in the hero section',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value', description: 'e.g. "6-8"' },
            { name: 'suffix', type: 'string', title: 'Suffix', description: 'e.g. "%" or "mins"' },
            { name: 'label', type: 'string', title: 'Label', description: 'e.g. "Rental Yield"' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare({ title, subtitle }) {
              return { title: `${subtitle} — ${title}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'rtsOpeningDate',
      title: 'RTS Link Opening Date',
      type: 'string',
      description: 'e.g. "January 2027"',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Default Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Default Meta Description', rows: 3 },
        { name: 'ogImage', type: 'image', title: 'Default Social Share Image' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global configuration',
      };
    },
  },
});
