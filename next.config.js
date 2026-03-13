/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rrcwrqstlvauzdsjfriq.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
