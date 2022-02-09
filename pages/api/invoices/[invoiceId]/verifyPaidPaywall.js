import fetchInvoiceById from "@utils/strikeApi/fetchInvoiceById";
import { getRedirectUrl } from "@utils/invoice";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.headers.referer && !req.headers.referer.includes("api")) {
        const redirectUrl = getRedirectUrl(
          await fetchInvoiceById(req.query.invoiceId)
        );

        // The JSON.parse check is to provide backwards compatability. When the app was launched, the values
        // were accidentally being stored as strigified strings.
        try {
          res
            .status(200)
            .json(
              redirectUrl === JSON.parse(req.query.redirectUrl)
                ? redirectUrl
                : false
            );
        } catch (e) {
          res
            .status(200)
            .json(redirectUrl === req.query.redirectUrl ? redirectUrl : false);
        }
      } else {
        res.status(403).send("Forbidden");
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
