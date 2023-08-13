/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'github-readme-stats.vercel.app',
    ],
  },
};

module.exports = nextConfig;
