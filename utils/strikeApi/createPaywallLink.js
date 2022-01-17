import createInvoice from "./createInvoice";

const createPaywallLink = (payload, baseUrl) => {
  return createInvoice(payload)
    .then(({ invoiceId }) => `${baseUrl}/${invoiceId}`)
    .catch((error) => {
      console.log(error);
    });
};

export default createPaywallLink;
