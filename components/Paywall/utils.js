export const normalizeUrl = (url) => {
  return /^(http(s?)):\/\//i.test(url) ? url : `https://${url}`;
};

export const addPlebPayRefQueryParam = (redirectUrl, plebPayRef) => {
  const urlWithQueryParams = new URL(redirectUrl);

  urlWithQueryParams.searchParams.append("plebPayRef", plebPayRef);

  return urlWithQueryParams.href;
};

const normalizeCurrency = (currency) => {
  switch (currency) {
    case "USDT":
      return "USD";
    default:
      return currency;
  }
};

export const formatCurrency = ({ amount, currency, locales = "en" }) => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: normalizeCurrency(currency),
  })
    .format(amount)
    .replace(/\.00$/, "");
};

export const makeProofOfPlebPayPath = (invoiceId, paidInvoiceId) =>
  `/${invoiceId}/paid-invoices/${paidInvoiceId}`;
