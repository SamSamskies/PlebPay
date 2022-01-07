import createInvoice from "./createInvoice";

const createPaywallLink = (payload) => {
  return createInvoice(payload)
    .then(
      ({ invoiceId }) => `${process.env.BASE_PAYWALL_LINK_URL}/${invoiceId}`
    )
    .catch((error) => {
      console.log(error);
    });
};

export default createPaywallLink;
