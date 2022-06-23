/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "help.twitter.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "cm.linkedin.com",
    ],
  },
};

module.exports = nextConfig;
