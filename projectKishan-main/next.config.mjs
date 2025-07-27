/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Reduce hydration mismatches
  experimental: {
    optimizeCss: false,
  },
  // Disable React strict mode in development to reduce hydration warnings
  reactStrictMode: false,
}

export default nextConfig
