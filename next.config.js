/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true
  },
  eslint: {
    // Disable ESLint during the build process
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
