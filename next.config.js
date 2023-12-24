/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co"], // Add 'i.scdn.co' to the list of allowed domains
  },
  env: {  NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }
};

module.exports = nextConfig;
