import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  webpack(config) {
    // Manually set the next-intl config alias without using the plugin
    // This avoids __dirname being bundled into Edge Runtime middleware
    config.resolve.alias['next-intl/config'] = path.resolve(
      process.cwd(),
      'i18n/request.ts'
    );
    return config;
  },
};

export default nextConfig;
