import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity.client';

// Use the inferred type from the image-url package
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Common image size presets
export function propertyCardImage(source: SanityImageSource) {
  return urlFor(source).width(800).height(600).format('webp').url();
}

export function propertyHeroImage(source: SanityImageSource) {
  return urlFor(source).width(1600).height(900).format('webp').url();
}

export function thumbnailImage(source: SanityImageSource) {
  return urlFor(source).width(400).height(300).format('webp').url();
}
