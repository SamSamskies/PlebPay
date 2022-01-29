import createInvoice from "./createInvoice";

const createPaywallLink = (payload, baseUrl) => {
  return createInvoice(payload).then(
    ({ invoiceId }) => `${baseUrl}/${invoiceId}`
  );
};

export default createPaywallLink;
