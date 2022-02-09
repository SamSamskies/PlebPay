import ProofOfPlebPay from "@components/ProofOfPlebPay";
import fetchInvoiceById from "@utils/strikeApi/fetchInvoiceById";
import fetchUserById from "@utils/strikeApi/fetchUserById";
import { getTitle } from "@utils/invoice";

export async function getServerSideProps({ query }) {
  const invoice = await fetchInvoiceById(query.invoiceId);

  if (!invoice) {
    return { notFound: true };
  }

  const { handle } = await fetchUserById(invoice.receiverId);
  const title = getTitle(invoice);

  if (title === null) {
    return { notFound: true };
  }

  return {
    props: {
      invoiceId: query.invoiceId,
      paidInvoiceId: query.paidInvoiceId,
      username: handle,
      title,
    },
  };
}

export default ProofOfPlebPay;
