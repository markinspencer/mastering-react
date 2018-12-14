import http from "./http.service";
import config from "../config.json";

const movieUrl = id => {
  return `${config.movieApiEndpoint}/${id}`;
};

export const getMovies = () => {
  return http.get(config.movieApiEndpoint);
};

export const getMovie = id => {
  return http.get(movieUrl(id));
};

export const saveMovie = movie => {
  const { _id: id, ...body } = movie;
  if (movie._id) return http.put(movieUrl(id), body);

  return http.post(config.movieApiEndpoint, body);
};

export const deleteMovie = id => {
  return http.delete(movieUrl(id));
};
