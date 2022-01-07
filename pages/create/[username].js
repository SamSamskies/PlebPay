import CreatePaywallLink from "../../components/CreatePaywallLink";
import fetchUser from "../../utils/strikeApi/fetchUserByHandle";

export async function getServerSideProps({ query }) {
  const data = await fetchUser(query.username);

  return { props: data ?? {} };
}

export default CreatePaywallLink;
