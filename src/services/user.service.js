import http from "./http.service";
import { USER_ENDPOINT } from "../config.json";

export const register = user => {
  const { username: email, password, name } = user;
  return http.post(USER_ENDPOINT, {
    email,
    password,
    name
  });
};
