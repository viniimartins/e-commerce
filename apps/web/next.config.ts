import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'localhost',
        port: '3333',
        protocol: 'http',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
