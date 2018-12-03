import axios from "axios";

axios.interceptors.response.use(null, err => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedError) {
    //logger.log(err);
    //toast.error("An unexpected error occurred.");
  }

  return Promise.reject(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
