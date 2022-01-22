import sh from "shorthash";

const createPaywallId = (invoiceId, salt = process.env.PAYWALL_ID_SALT) => {
  return sh.unique(`${invoiceId}${salt}`);
};

export default createPaywallId;
