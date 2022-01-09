import CreatePaywallLink from "../../components/CreatePaywallLink";
import fetchUserByHandle from "../../utils/strikeApi/fetchUserByHandle";

export async function getServerSideProps({ query }) {
  const data = await fetchUserByHandle(query.username);

  return { props: data ?? {} };
}

export default CreatePaywallLink;
