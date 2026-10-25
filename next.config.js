/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` writes the whole site to ./out, deployable to any static host.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
