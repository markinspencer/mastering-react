import http from "./http.service";
import { authApiEndpoint } from "../config.json";

export const login = (email, password) =>
  http.post(authApiEndpoint, { email, password });
