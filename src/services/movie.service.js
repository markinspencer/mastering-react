import http from "./http.service";

const apiEndpoint = "/movies";

const movieUrl = id => {
  return `${apiEndpoint}/${id}`;
};

export const getMovie = id => http.get(movieUrl(id));

export const getMovies = () => http.get(apiEndpoint);

export const deleteMovie = id => http.delete(movieUrl(id));

export const saveMovie = movie => {
  const { _id: id, ...body } = movie;
  if (movie._id) return http.put(movieUrl(id), body);

  return http.post(apiEndpoint, body);
};
