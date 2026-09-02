import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/acatenango-volcano-tour",
        destination: "/en/acatenango-volcano-tour",
        permanent: true, // 301 Permanent Redirect for optimal SEO
      },
    ];
  },
};

export default withNextIntl(nextConfig);
