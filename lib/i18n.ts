export const locales = ['en-SG', 'zh-SG', 'ms-MY'] as const;
export const defaultLocale = 'en-SG' as const;

export type Locale = (typeof locales)[number];
