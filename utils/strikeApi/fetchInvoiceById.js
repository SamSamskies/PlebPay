import axios from "axios";
import createPaywallId from "../createPaywallId";

const fetchInvoiceById = (invoiceId) => {
  return axios({
    method: "get",
    url: `https://api.strike.me/v1/invoices/${invoiceId}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
  })
    .then(({ data }) => ({ paywallId: createPaywallId(invoiceId), ...data }))
    .catch((error) => {
      console.log(error);
    });
};

export default fetchInvoiceById;
