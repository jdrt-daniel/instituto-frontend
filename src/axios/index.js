import axios from "axios";

const token = localStorage.getItem("token");
let config = null;
if (token) {
  config = {
    headers: { Authorization: `Bearer ${token}` },
  };
}
const baseURL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseURL,
  headers: config,
});

export default api;
