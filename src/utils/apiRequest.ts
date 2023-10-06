import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGEzNmE1NzczOTk0MDkwNjYyYzlkMWU2YWIxZmJiYyIsInN1YiI6IjVkZjQ0NjM1NGE0YmY2MDAxNDU0YWZkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x_luq9s_5E_SZvGOf0J5NArRJdGyf9k05_DICOeNPYM";

const apiRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export default apiRequest;
