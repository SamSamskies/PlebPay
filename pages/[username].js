import CreateInvoice from "../components/CreateInvoice";
import fetchUser from "../utils/fetchUser";

export async function getServerSideProps({ query }) {
  const data = await fetchUser(query.username);

  return { props: data ?? {} };
}

export default CreateInvoice;
