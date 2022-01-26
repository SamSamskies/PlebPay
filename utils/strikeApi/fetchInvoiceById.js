import axios from "axios";

const fetchInvoiceById = (invoiceId) => {
  return axios({
    method: "get",
    url: `https://api.strike.me/v1/invoices/${invoiceId}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
  }).then(({ data }) => data);
};

export default fetchInvoiceById;
