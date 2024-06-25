/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  poweredByHeader: false,
  reactProductionProfiling: false,
  staticPageGenerationTimeout: 1000,
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
