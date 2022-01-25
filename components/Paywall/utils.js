import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const normalizeUrl = (url) => {
  return /^(http(s?)):\/\//i.test(url) ? url : `https://${url}`;
};

export const addPlebPayRefQueryParam = async (url) => {
  const fpPromise = FingerprintJS.load({ monitoring: false });
  const urlWithQueryParams = new URL(url);
  const fp = await fpPromise;
  const { visitorId } = await fp.get();

  urlWithQueryParams.searchParams.append("plebPayRef", visitorId);

  return urlWithQueryParams.href;
};
