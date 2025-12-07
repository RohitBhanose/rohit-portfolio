/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce static export (./out) on `next build`
  output: 'export',

  reactStrictMode: true,

  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
