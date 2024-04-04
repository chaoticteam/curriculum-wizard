/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL || "",
  },
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

};
module.exports = nextConfig;
