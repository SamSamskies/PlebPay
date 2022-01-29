import axios from "axios";

const createPaywallLink = (data) => {
  return axios({
    method: "post",
    url: "/api/paywallLinks",
    data,
  }).then(({ data }) => data);
};

export default createPaywallLink;
