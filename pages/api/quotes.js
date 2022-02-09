import createInvoice from "@utils/strikeApi/createInvoice";
import createQuote from "@utils/strikeApi/createQuote";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { invoiceId } = await createInvoice(req.body);

      res.status(200).json(await createQuote(invoiceId));
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
