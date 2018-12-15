import http from "./http.service";
import { AUTH_ENDPOINT } from "../config.json";

export const login = (email, password) =>
  http.post(AUTH_ENDPOINT, { email, password });
