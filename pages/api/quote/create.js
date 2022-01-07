import createInvoice from "../../../utils/strikeApi/createInvoice";
import createQuote from "../../../utils/strikeApi/createQuote";
import fetchInvoiceId from "../../../utils/strikeApi/fetchInvoiceId";
import fetchUserById from "../../../utils/strikeApi/fetchUserById";

export default async function handler(req, res) {
  const existingInvoice = await fetchInvoiceId(req.body.invoiceId);
  const getNewInvoiceId = async () => {
    const { amount, desription, receiverId } = existingInvoice;
    const { title, redirectUrl } = JSON.parse(desription);
    const { handle } = await fetchUserById(receiverId);
    const { invoiceId } = await createInvoice({
      title,
      amount: amount.amount,
      currency: amount.currency,
      redirectUrl,
      username: handle,
    });

    return invoiceId;
  };
  const invoiceId =
    existingInvoice.state === "UNPAID"
      ? existingInvoice.invoiceId
      : getNewInvoiceId();
  const quote = await createQuote(invoiceId);

  // remove description cause it contains the redirect URL
  delete quote.description;

  res.status(200).json(quote);
}
