import VerifyReceiptId from "../../components/VerifyReceiptId";

export async function getServerSideProps({ query }) {
  return {
    props: {
      invoiceId: query.invoiceId,
    },
  };
}

export default VerifyReceiptId;
