import axios from "axios";

const createPaywallLink = (data) => {
  return axios({
    method: "post",
    url: "/api/create",
    data,
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
    });
};

export default createPaywallLink;
