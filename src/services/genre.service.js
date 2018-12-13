import http from "./http.service";
import config from "../config.json";

export const getGenres = async () => {
  return await http.get(config.genreApiEndpoint);
};
