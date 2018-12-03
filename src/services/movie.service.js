import http from "./http.service";
import config from "../config.json";

export const getMovies = async () => {
  const { data } = await http.get(config.movieApiEndpoint);
  return data;
};

export const getMovie = async id => {
  const { data } = await http.get(`${config.movieApiEndpoint}/${id}`);
  return data;
};

export const saveMovie = async movie => {
  const { data } = await http.post(config.movieApiEndpoint, movie);
  return data;
};
