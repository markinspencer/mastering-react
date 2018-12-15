import http from "./http.service";
import { GENRE_ENDPOINT } from "../config.json";

export const getGenres = async () => await http.get(GENRE_ENDPOINT);
