import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'loremflickr.com',
      },
      {
        hostname: 'via.placeholder.com',
      },
      {
        hostname: 'localhost',
        port: '3333',
        protocol: 'http',
      },
    ],
  },
}

export default nextConfig
