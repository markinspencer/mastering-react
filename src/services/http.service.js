import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logging.service";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, err => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedError) {
    logger.error(err);
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(err);
});

const setJwt = jwt => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
