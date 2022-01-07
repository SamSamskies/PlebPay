import Paywall from "../components/Paywall/Paywall";
import fetchInvoiceId from "../utils/fetchInvoiceId";

export async function getServerSideProps({ query }) {
  const data = await fetchInvoiceId(query.invoiceId);

  if (!data) {
    return {};
  }

  const { amount, description, invoiceId } = data;
  const { title, redirectUrl } = JSON.parse(description);

  return {
    props: {
      amount: amount.amount,
      currency: amount.currency,
      invoiceId,
      title,
      redirectUrl,
    },
  };
}

export default Paywall;
