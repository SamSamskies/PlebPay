import fetchInvoiceById from "../../../utils/strikeApi/fetchInvoiceById";

export default async function handler(req, res) {
  res.status(200).json(await fetchInvoiceById(req.query.invoiceId));
}
