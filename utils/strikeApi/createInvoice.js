import axios from "axios";

const createInvoice = ({
  invoiceId,
  title,
  amount,
  currency,
  redirectUrl,
  username,
  isProofOfPlebPay,
}) => {
  const getDescription = () => {
    if (isProofOfPlebPay) {
      return invoiceId;
    }

    return redirectUrl ? JSON.stringify({ title, redirectUrl }) : title;
  };
  const data = {
    description: getDescription(),
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
  }).then(({ data }) => data);
};

export default createInvoice;
