import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getAllErrorLog = (page, limit, search) => {
  let query = "";
  if (search !== "") {
    query += `&search=${search}`;
  }
  return axios.get(`${API_URL}/log/error?page=${page}&limit=${limit}${query}`);
};

const getAllAccessLog = (page, limit, search) => {
  let query = "";
  if (search !== "") {
    query += `&search=${search}`;
  }
  return axios.get(`${API_URL}/log/access?page=${page}&limit=${limit}${query}`);
};

export default {
  getAllErrorLog,
  getAllAccessLog,
};
