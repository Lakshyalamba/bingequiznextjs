/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure static export
  output: 'export',
  
  // Skip type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint during build for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;