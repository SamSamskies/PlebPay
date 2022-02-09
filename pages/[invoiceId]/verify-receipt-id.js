import VerifyReceiptId from "components/VerifyReceiptId";
import fetchInvoiceById from "utils/strikeApi/fetchInvoiceById";
import { getTitle } from "utils/invoice";

export async function getServerSideProps({ query }) {
  const invoice = await fetchInvoiceById(query.invoiceId);

  if (!invoice) {
    return { notFound: true };
  }

  const title = getTitle(invoice);

  if (title === null) {
    return { notFound: true };
  }

  return {
    props: {
      invoiceId: query.invoiceId,
      title,
    },
  };
}

export default VerifyReceiptId;
