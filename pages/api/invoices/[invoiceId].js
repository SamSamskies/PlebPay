import fetchInvoiceById from "../../../utils/strikeApi/fetchInvoiceById";

export default async function handler(req, res) {
  if (req.headers.referer && !req.headers.referer.includes("api")) {
    res.status(200).json(await fetchInvoiceById(req.query.invoiceId));
  } else {
    res.status(403).send("Forbidden");
  }
}
