import axios from "axios";

const fetchUser = (username) => {
  return axios({
    method: "get",
    url: `https://api.strike.me/v1/accounts/handle/${username}/profile`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
    });
};

export default fetchUser;
