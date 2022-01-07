import axios from "axios";

const createQuote = (invoiceId) => {
  return axios({
    method: "post",
    url: `https://api.strike.me/v1/invoices/${invoiceId}/quote`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
    });
};

export default createQuote;
