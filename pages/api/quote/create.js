import createInvoice from "../../../utils/strikeApi/createInvoice";
import createQuote from "../../../utils/strikeApi/createQuote";
import fetchInvoiceId from "../../../utils/strikeApi/fetchInvoiceId";
import fetchUserById from "../../../utils/strikeApi/fetchUserById";

export default async function handler(req, res) {
  const existingInvoice = await fetchInvoiceId(req.body.invoiceId);
  const { amount, description, receiverId } = existingInvoice;
  const { title } = JSON.parse(description);
  const { handle } = await fetchUserById(receiverId);
  const { invoiceId } = await createInvoice({
    title,
    amount: amount.amount,
    currency: amount.currency,
    username: handle,
  });

  res.status(200).json(await createQuote(invoiceId));
}
