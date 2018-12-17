import http from "./http.service";

const apiEndpoint = "/genres";

export const getGenres = async () => await http.get(apiEndpoint);
