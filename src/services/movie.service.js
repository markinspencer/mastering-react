import http from "./http.service";
import { MOVIE_ENDPOINT } from "../config.json";

const movieUrl = id => {
  return `${MOVIE_ENDPOINT}/${id}`;
};

export const getMovie = id => http.get(movieUrl(id));

export const getMovies = () => http.get(MOVIE_ENDPOINT);

export const deleteMovie = id => http.delete(movieUrl(id));

export const saveMovie = movie => {
  const { _id: id, ...body } = movie;
  if (movie._id) return http.put(movieUrl(id), body);

  return http.post(MOVIE_ENDPOINT, body);
};
