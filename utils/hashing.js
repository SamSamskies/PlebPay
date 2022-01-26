import sh from "shorthash";

export const createPaywallId = (
  invoiceId,
  salt = process.env.PAYWALL_ID_SALT
) => {
  return sh.unique(`${invoiceId}${salt}`);
};

export const createPlebPayRef = (
  userAgent,
  salt = process.env.PAYWALL_ID_SALT
) => {
  return sh.unique(`${userAgent}${salt}`);
};
