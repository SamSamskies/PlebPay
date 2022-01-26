export const normalizeUrl = (url) => {
  return /^(http(s?)):\/\//i.test(url) ? url : `https://${url}`;
};

export const addPlebPayRefQueryParam = (redirectUrl, plebPayRef) => {
  const urlWithQueryParams = new URL(redirectUrl);

  urlWithQueryParams.searchParams.append("plebPayRef", plebPayRef);

  return urlWithQueryParams.href;
};
