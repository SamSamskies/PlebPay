import axios from "axios";

const fetchUserById = (userId) => {
  return axios({
    method: "get",
    url: `https://api.strike.me/v1/accounts/${userId}/profile`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STRIKE_API_KEY}`,
    },
  }).then(({ data }) => data);
};

export default fetchUserById;
