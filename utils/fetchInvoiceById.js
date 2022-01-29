import axios from "axios";

const fetchInvoiceById = (invoiceId) => {
  return axios({
    method: "get",
    url: `/api/invoices/${invoiceId}`,
  }).then(({ data }) => data);
};

export default fetchInvoiceById;
