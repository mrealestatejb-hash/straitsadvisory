import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // ── Basic Info ──────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Property Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameZh',
      title: 'Chinese Name',
      type: 'string',
      description: 'Property name in Simplified Chinese',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'developer',
      title: 'Developer',
      type: 'reference',
      to: [{ type: 'developer' }],
    }),
    defineField({
      name: 'area',
      title: 'Area',
      type: 'string',
      description: 'e.g. Tanjung Puteri, Bukit Chagar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'string',
      description: 'e.g. Johor Bahru Waterfront',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Luxury', value: 'luxury' },
          { title: 'Waterfront', value: 'waterfront' },
          { title: 'City', value: 'city' },
          { title: 'Resort', value: 'resort' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Limited Units', value: 'limited' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      description: 'Show on homepage featured section',
      initialValue: false,
    }),

    // ── Pricing ─────────────────────────────────────────────
    defineField({
      name: 'priceSGD',
      title: 'Price (SGD)',
      type: 'number',
      description: 'Starting price in Singapore Dollars',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'priceMYR',
      title: 'Price (MYR)',
      type: 'number',
      description: 'Starting price in Malaysian Ringgit',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Display Text',
      type: 'string',
      description: 'e.g. "From S$280,000" — shown on cards',
    }),

    // ── Specs ───────────────────────────────────────────────
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'string',
      description: 'e.g. "1-4" or "Studio-3"',
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'string',
      description: 'e.g. "1-3"',
    }),
    defineField({
      name: 'sizeRange',
      title: 'Size Range (sqft)',
      type: 'string',
      description: 'e.g. "469-1,386"',
    }),
    defineField({
      name: 'rentalYield',
      title: 'Estimated Rental Yield (%)',
      type: 'number',
      description: 'e.g. 6.8',
    }),
    defineField({
      name: 'rtsDistance',
      title: 'Distance to RTS',
      type: 'string',
      description: 'e.g. "500m" or "1.2km"',
    }),
    defineField({
      name: 'tenure',
      title: 'Tenure',
      type: 'string',
      options: {
        list: [
          { title: 'Freehold', value: 'Freehold' },
          { title: 'Leasehold', value: 'Leasehold' },
        ],
      },
    }),
    defineField({
      name: 'leaseYears',
      title: 'Lease Duration (years)',
      type: 'number',
      description: 'Only for leasehold properties',
      hidden: ({ parent }) => parent?.tenure !== 'Leasehold',
    }),
    defineField({
      name: 'completionYear',
      title: 'Completion Status',
      type: 'string',
      description: 'e.g. "Completed 2019" or "Est. 2027"',
    }),

    // ── Images ──────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on property cards and hero section',
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),

    // ── Content ─────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Rich text property description',
    }),
    defineField({
      name: 'descriptionPlain',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Plain text version for cards and meta tags',
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points shown in the highlights section',
    }),
    defineField({
      name: 'features',
      title: 'Facilities & Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ── Unit Types ──────────────────────────────────────────
    defineField({
      name: 'unitTypes',
      title: 'Unit Types',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'unitType',
          fields: [
            { name: 'type', type: 'string', title: 'Type', description: 'e.g. "1 Bedroom"' },
            { name: 'size', type: 'string', title: 'Size', description: 'e.g. "469-543 sqft"' },
            {
              name: 'layouts',
              type: 'array',
              title: 'Layouts',
              of: [{ type: 'string' }],
              description: 'e.g. "Type D", "Type V2"',
            },
          ],
          preview: {
            select: { title: 'type', subtitle: 'size' },
          },
        },
      ],
    }),

    // ── Location ────────────────────────────────────────────
    defineField({
      name: 'towers',
      title: 'Towers / Blocks',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'geopoint',
      description: 'Pin location on the interactive map',
    }),

    // ── Virtual Tour ────────────────────────────────────────
    defineField({
      name: 'tourUrl',
      title: 'Virtual Tour URL',
      type: 'url',
      description: 'Matterport, Kuula, or custom tour URL',
    }),
    defineField({
      name: 'tourProvider',
      title: 'Tour Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Matterport', value: 'matterport' },
          { title: 'Kuula', value: 'kuula' },
          { title: 'Generic (iframe)', value: 'generic' },
        ],
      },
      hidden: ({ parent }) => !parent?.tourUrl,
    }),

    // ── SEO ─────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Image for social media sharing (1200x630px recommended)',
        },
      ],
      options: { collapsible: true, collapsed: true },
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'area',
      media: 'heroImage',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle || ''} • ${status || 'draft'}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Name A→Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Price (Low→High)',
      name: 'priceAsc',
      by: [{ field: 'priceSGD', direction: 'asc' }],
    },
    {
      title: 'Price (High→Low)',
      name: 'priceDesc',
      by: [{ field: 'priceSGD', direction: 'desc' }],
    },
  ],
});
