const axios = require("axios");
const apiKey = "34c61874ec353f91b436e47a9639b3e3";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language:"pt-BR"
 }
});

module.exports = api;