import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'e-commerce-univinte.onrender.com',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
