import axios from "axios";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
}
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default axios;
