import Paywall from "../components/Paywall/Paywall";
import fetchInvoiceById from "../utils/strikeApi/fetchInvoiceById";
import fetchUserById from "../utils/strikeApi/fetchUserById";
import { getTitle } from "../utils/invoice";
import { createPlebPayRef } from "../utils/hashing";

export async function getServerSideProps({ query, req }) {
  const invoice = await fetchInvoiceById(query.invoiceId);

  if (!invoice) {
    return { notFound: true };
  }

  const { amount, receiverId } = invoice;
  const title = getTitle(invoice);

  if (title === null) {
    return { notFound: true };
  }

  const { handle } = await fetchUserById(receiverId);

  return {
    props: {
      amount: amount.amount,
      currency: amount.currency,
      invoiceId: query.invoiceId,
      title,
      username: handle,
      plebPayRef: createPlebPayRef(query.invoiceId, req.headers["user-agent"]),
    },
  };
}

export default Paywall;
