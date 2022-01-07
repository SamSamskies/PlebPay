import axios from "axios";
import { uuid } from "uuidv4";

const createInvoice = ({ title, amount, currency, redirectUrl, username }) => {
  const data = {
    correlationId: uuid(),
    description: JSON.stringify({ title, redirectUrl }),
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
    .then(
      ({ data }) => `${process.env.BASE_PAYWALL_LINK_URL}/${data.invoiceId}`
    )
    .catch((error) => {
      console.log(error);
    });
};

export default createInvoice;
