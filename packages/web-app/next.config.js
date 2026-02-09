/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Disable static export for Vercel deployment
  // output: 'export' is only for static hosting, not needed for Vercel
}

module.exports = nextConfig
