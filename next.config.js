/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      // other Node.js modules that might be missing
      path: false,
      crypto: false
    };
    return config;
  }
};

module.exports = nextConfig; 