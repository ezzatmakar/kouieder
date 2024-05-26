const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl({
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['backend.koueider.com'],
  },
  crossOrigin: "anonymous",
  httpAgentOptions: {
    keepAlive: true,
  },
  outputFileTracing: true,
  compiler: {
    removeConsole: false,
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, stale-while-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://ap.gateway.mastercard.com",
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/refund_returns',
        destination: '/return-policy',
        permanent: true,
      },
      {
        source: '/en/refund_returns',
        destination: '/en/return-policy',
        permanent: true,
      },
    ]
  },
});
