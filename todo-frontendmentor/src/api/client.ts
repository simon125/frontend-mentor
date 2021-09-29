import axios from "axios";

export const useClient = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  console.log(apiURL);
  const { get, post, put, delete: remove, patch } = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: "",
    },
  });

  return { get, post, put, remove, patch };
};
