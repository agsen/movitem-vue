import axios from "axios";

const TOKEN = import.meta.env.VITE_API_TOKEN;

const apiRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export default apiRequest;
