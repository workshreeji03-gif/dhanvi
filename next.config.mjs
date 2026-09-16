/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/login', destination: '/', permanent: false },
      { source: '/signup', destination: '/', permanent: false },
      { source: '/register', destination: '/', permanent: false },
      { source: '/forgot-password', destination: '/', permanent: false },
      { source: '/reset-password', destination: '/', permanent: false },
      { source: '/auth/callback', destination: '/', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000',
          },
        ],
      },
    ]
  },
}

export default nextConfig
