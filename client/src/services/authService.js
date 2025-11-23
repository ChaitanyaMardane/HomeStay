import API from "../utils/axios.js";

export const registerUser = async (data) => {
  const res = await API.post("/api/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/api/auth/login", data);

  return res.data;
};
