import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
export const GA_MEASUREMENT_ID = publicRuntimeConfig.GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
