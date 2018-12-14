import http from "./http.service";
import { usersApiEndpoint } from "../config.json";

export const register = user => {
  const { username: email, password, name } = user;
  return http.post(usersApiEndpoint, {
    email,
    password,
    name
  });
};
