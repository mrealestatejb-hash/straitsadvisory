import type { StructureBuilder } from 'sanity/structure';

// Singleton document helper — shows a single document editor instead of a list
function singletonDocument(
  S: StructureBuilder,
  typeName: string,
  title: string
) {
  return S.listItem()
    .title(title)
    .id(typeName)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    );
}

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ── Properties ──────────────────────────────────────
      S.listItem()
        .title('Properties')
        .child(
          S.documentTypeList('property')
            .title('Properties')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.divider(),

      // ── Developers ──────────────────────────────────────
      S.listItem()
        .title('Developers')
        .child(
          S.documentTypeList('developer')
            .title('Developers')
        ),

      S.divider(),

      // ── Content ─────────────────────────────────────────
      S.listItem()
        .title('Testimonials')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('FAQs')
        .child(
          S.documentTypeList('faq')
            .title('FAQs')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ── Settings (singleton) ────────────────────────────
      singletonDocument(S, 'siteSettings', 'Site Settings'),
    ]);
