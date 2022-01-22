import Paywall from "../components/Paywall/Paywall";
import fetchInvoiceById from "../utils/strikeApi/fetchInvoiceById";
import fetchUserById from "../utils/strikeApi/fetchUserById";

export async function getServerSideProps({ query }) {
  const data = await fetchInvoiceById(query.invoiceId);

  if (!data) {
    return { notFound: true };
  }

  const { amount, description, receiverId, paywallId } = data;
  let title;

  try {
    title = JSON.parse(description).title;
  } catch (e) {
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
      paywallId,
    },
  };
}

export default Paywall;
