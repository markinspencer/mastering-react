import http from "./http.service";
import config from "../config.json";

export const getMovies = () => {
  return http.get(config.movieApiEndpoint);
};

export const getMovie = id => {
  return http.get(`${config.movieApiEndpoint}/${id}`);
};

export const saveMovie = movie => {
  return http.post(config.movieApiEndpoint, movie);
};

export const deleteMovie = id => {
  return http.delete(`${config.movieApiEndpoint}/${id}`);
};
