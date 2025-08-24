/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@saros-finance/sdk', '@saros-finance/dlmm-sdk', 'saros-sdk'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
