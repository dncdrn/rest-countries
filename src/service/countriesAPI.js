import axios from "axios";

const domainURL = "https://restcountries.eu";

export const getAllCountries = () => {
  return axios
    .get(`${domainURL}/rest/v2/all`)
    .then((response) => response.data);
};
