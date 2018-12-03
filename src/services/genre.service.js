import http from "./http.service";
import config from "../config.json";

export const getGenres = async () => {
  const { data } = await http.get(config.genreApiEndpoint);
  return data;
};
