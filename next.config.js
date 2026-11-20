module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["strike-avatars.storage.googleapis.com", "github.blog"],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },
};
