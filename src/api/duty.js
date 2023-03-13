import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getAllDutyNotAssignedWithJobId = (jobId) => {
  return axios.get(`${API_URL}/duty/getAllDutyNotAssignedWithJobId/${jobId}`);
};

const getDutyById = (id) => {
  return axios.get(`${API_URL}/duty/${id}`);
};

const createDuty = (data) => {
  return axios.post(`${API_URL}/duty`, data);
};

const updateDuty = (data, id) => {
  return axios.put(`${API_URL}/duty/${id}`, data);
};

export default {
  getAllDutyNotAssignedWithJobId,
  getDutyById,
  createDuty,
  updateDuty,
};
