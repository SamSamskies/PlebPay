import sh from "shorthash";

export const createPaywallId = (
  invoiceId,
  salt = process.env.PAYWALL_ID_SALT
) => {
  return sh.unique(`${invoiceId}${salt}`);
};

export const createPlebPayRef = (
  invoiceId,
  userAgent,
  salt = process.env.PAYWALL_ID_SALT
) => {
  return sh.unique(`${invoiceId}${userAgent}${salt}`);
};
