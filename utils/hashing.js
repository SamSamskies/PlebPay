import sh from "shorthash";

export const createPlebPayRef = (invoiceId, userAgent) => {
  return sh.unique(`${invoiceId}${userAgent}`);
};
