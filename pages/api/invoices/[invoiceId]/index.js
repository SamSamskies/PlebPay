import fetchInvoiceById from "../../../../utils/strikeApi/fetchInvoiceById";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.headers.referer && !req.headers.referer.includes("api")) {
        res.status(200).json(await fetchInvoiceById(req.query.invoiceId));
      } else {
        res.status(403).send("Forbidden");
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
