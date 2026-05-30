const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly pin tracing to the local frontend directory to prevent wrong workspace root inference
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
