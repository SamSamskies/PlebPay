import Paywall from "../components/Paywall/Paywall";
import fetchInvoiceById from "../utils/strikeApi/fetchInvoiceById";
import fetchUserById from "../utils/strikeApi/fetchUserById";

export async function getServerSideProps({ query }) {
  const data = await fetchInvoiceById(query.invoiceId);

  if (!data) {
    return {};
  }

  const { amount, description, receiverId } = data;
  const { title } = JSON.parse(description);
  const { handle } = await fetchUserById(receiverId);

  return {
    props: {
      amount: amount.amount,
      currency: amount.currency,
      invoiceId: query.invoiceId,
      title,
      username: handle,
    },
  };
}

export default Paywall;
