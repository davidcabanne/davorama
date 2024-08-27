/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    // This will prevent Webpack from trying to resolve the 'fs' module in the browser environment
    config.resolve.fallback = {
      ...config.resolve.fallback, // Keep existing fallbacks
      fs: false, // Ignore the 'fs' module
    };

    return config;
  },
};

export default nextConfig;
