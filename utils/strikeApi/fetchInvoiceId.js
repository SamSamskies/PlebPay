import axios from "axios";

const fetchInvoiceId = (invoiceId) => {
  return axios({
    method: "get",
    url: `https://api.strike.me/v1/invoices/${invoiceId}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
    });
};

export default fetchInvoiceId;
