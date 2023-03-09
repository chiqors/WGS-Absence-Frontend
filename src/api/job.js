import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getAllJobs = async () => {
  return await axios.get(`${API_URL}/job`);
};

const createJob = async (data) => {
  return await axios.post(`${API_URL}/job`, data);
};

const updateJob = async (id, data) => {
  return await axios.put(`${API_URL}/job/${id}`, data);
};

const deleteJob = async (id) => {
  return await axios.delete(`${API_URL}/job/${id}`);
};

export default {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
};
