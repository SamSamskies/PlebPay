import axios from "axios";

const createInvoice = ({ title, amount, currency, redirectUrl, username }) => {
  const data = {
    description: redirectUrl ? JSON.stringify({ title, redirectUrl }) : title,
    amount: {
      currency,
      amount,
    },
  };

  return axios({
    method: "post",
    url: `https://api.strike.me/v1/invoices/handle/${username}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
    data,
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
    });
};

export default createInvoice;
