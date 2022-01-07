import Paywall from "../components/Paywall/Paywall";
import fetchInvoiceById from "../utils/strikeApi/fetchInvoiceById";

export async function getServerSideProps({ query }) {
  const data = await fetchInvoiceById(query.invoiceId);

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
