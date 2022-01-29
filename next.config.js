module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["strike-avatars.storage.googleapis.com", "github.blog"],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    BUGSNAG_API_KEY: process.env.BUGSNAG_SERVER_API_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    BUGSNAG_API_KEY: process.env.BUGSNAG_BROWSER_API_KEY, // Pass through env variables
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },
};
