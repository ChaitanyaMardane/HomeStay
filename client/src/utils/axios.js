import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ,
  withCredentials: true,
});
API.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("auth");
  if (storedUser) {
    const { token } = JSON.parse(storedUser);

    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default API;
