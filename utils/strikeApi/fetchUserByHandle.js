import axios from "axios";

const fetchUserByHandle = (username) => {
  return axios({
    method: "get",
    url: `https://api.strike.me/v1/accounts/handle/${username}/profile`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
  }).then(({ data }) => data);
};

export default fetchUserByHandle;
