import axios from "axios";

const createQuote = (payload) => {
  return axios({
    method: "post",
    url: "/api/quotes",
    data: payload,
  }).then(({ data }) => data);
};

export default createQuote;
