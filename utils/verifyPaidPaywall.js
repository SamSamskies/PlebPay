import axios from "axios";

const fetchInvoiceById = (invoiceId, redirectUrl) => {
  return axios({
    method: "get",
    url: `/api/invoices/${invoiceId}/verifyPaidPaywall?redirectUrl=${redirectUrl}`,
  }).then(({ data }) => data);
};

export default fetchInvoiceById;
