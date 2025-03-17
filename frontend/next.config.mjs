/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Ensures Next.js works in Amplify
    images: {
      unoptimized: true, // Fixes image-related issues in Amplify
    },
  };
  
  module.exports = nextConfig;
  