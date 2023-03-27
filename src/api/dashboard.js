import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getDashboardCards = () => {
  return axios.get(`${API_URL}/dashboard/cards`);
};

const getTopAttendances = () => {
  return axios.get(`${API_URL}/dashboard/top-attendances`);
};

const getAvgAttendances = () => {
  return axios.get(`${API_URL}/dashboard/average-attendance`);
};

export default {
  getDashboardCards,
  getTopAttendances,
  getAvgAttendances,
};
