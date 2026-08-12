import { resolve } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'firebase/auth$': resolve('./node_modules/firebase/auth/dist/index.cjs.js'),
      '@firebase/auth$': resolve('./node_modules/firebase/node_modules/@firebase/auth/dist/browser-cjs/index.js'),
      'firebase/firestore$': resolve('./node_modules/firebase/firestore/dist/index.cjs.js'),
      '@firebase/storage$': resolve('./node_modules/@firebase/storage/dist/index.browser.cjs.js'),
      'firebase/app$': resolve('./node_modules/firebase/app/dist/index.cjs.js'),
      'firebase/storage$': resolve('./node_modules/firebase/storage/dist/index.cjs.js'),
    };
    return config;
  },
};

export default nextConfig;