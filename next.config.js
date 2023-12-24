/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co"], // Add 'i.scdn.co' to the list of allowed domains
  },
  env: {  API_KEY: process.env.API_KEY }
};

module.exports = nextConfig;
