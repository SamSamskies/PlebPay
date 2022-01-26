import fetchInvoiceById from "../../../../utils/strikeApi/fetchInvoiceById";
import { getRedirectUrl } from "../../../../utils/invoice";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.headers.referer && !req.headers.referer.includes("api")) {
        const redirectUrl = getRedirectUrl(
          await fetchInvoiceById(req.query.invoiceId)
        );

        // TODO: remove logging after debugging
        console.log("redirectUrl", redirectUrl);
        console.log("req.query.redirectUrl", req.query.redirectUrl);

        res.status(200).json(redirectUrl === req.query.redirectUrl);
      } else {
        res.status(403).send("Forbidden");
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
