import http from "./http.service";
import { USER_KEY } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(USER_KEY, jwt);
};

export const loginWithJwt = jwt => localStorage.setItem(USER_KEY, jwt);

export const logout = () => localStorage.removeItem(USER_KEY);

export const getJwt = () => localStorage.getItem(USER_KEY);

export const getCurrentUser = () => {
  try {
    return jwtDecode(getJwt());
  } catch (err) {
    return null;
  }
};

http.setJwt(getJwt());
