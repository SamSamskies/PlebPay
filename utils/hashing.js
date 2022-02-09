import sh from "shorthash";

export const createSaltedPaywallId = (
  invoiceId,
  salt = process.env.PAYWALL_ID_SALT
) => {
  return sh.unique(`${invoiceId}${salt}`);
};

export const createPlebPayRef = (invoiceId, userAgent) => {
  return sh.unique(`${invoiceId}${userAgent}`);
};
