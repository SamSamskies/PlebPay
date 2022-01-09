import CreatePaywallLink from "../../components/CreatePaywallLink";
import fetchUserByHandle from "../../utils/strikeApi/fetchUserByHandle";

export async function getServerSideProps({ query }) {
  try {
    return { props: await fetchUserByHandle(query.username) };
  } catch (error) {
    return { props: { error: { status: error.response?.status } } };
  }
}

export default CreatePaywallLink;
