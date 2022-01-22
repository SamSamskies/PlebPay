import createInvoice from "../../utils/strikeApi/createInvoice";
import createQuote from "../../utils/strikeApi/createQuote";

export default async function handler(req, res) {
  const { invoiceId } = await createInvoice(req.body);

  res.status(200).json(await createQuote(invoiceId));
}
