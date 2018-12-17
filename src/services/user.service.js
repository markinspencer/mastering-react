import http from "./http.service";

const apiEndpoint = "/users";

export const register = user => {
  const { username: email, password, name } = user;
  return http.post(apiEndpoint, {
    email,
    password,
    name
  });
};
