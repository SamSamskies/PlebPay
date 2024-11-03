import Paywall from "components/Paywall/Paywall";
import fetchInvoiceById from "utils/strikeApi/fetchInvoiceById";
import fetchUserById from "utils/strikeApi/fetchUserById";
import { getRedirectUrl, getTitle } from "utils/invoice";
import { createPlebPayRef, createSaltedPaywallId } from "utils/hashing";

function isUuid(uuidString) {
  const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return re.test(uuidString);
}

export async function getServerSideProps({ query, req }) {
  if (!isUuid(query.invoiceId)) {
    return { notFound: true };
  }

  try {
    const invoice = await fetchInvoiceById(query.invoiceId);

    if (!invoice) {
      return { notFound: true };
    }

    const { amount, receiverId } = invoice;
    const title = getTitle(invoice);
    const redirectUrl = getRedirectUrl(invoice);

    if (title === null || redirectUrl === null) {
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
        saltedPaywallId: createSaltedPaywallId(query.invoiceId),
        plebPayRef: createPlebPayRef(
          query.invoiceId,
          req.headers["user-agent"]
        ),
        isProofOfPlebPay: redirectUrl === "proofofplebpay",
      },
    };
  } catch (error) {
    if (error?.response?.status === 404) {
      return { notFound: true };
    }

    // TODO: display proper error depending on status code
    return {
      props: {},
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
}

export default Paywall;
