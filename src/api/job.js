import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getAllJobs = async (page, limit) => {
  return await axios.get(`${API_URL}/job?page=${page}&limit=${limit}`);
};

const getJobById = async (id) => {
  return await axios.get(`${API_URL}/job/${id}`);
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

const getDutyAttendanceAndEmployee = async (id) => {
  return await axios.get(`${API_URL}/job/duty-attendance-employee/${id}`);
};

export default {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getDutyAttendanceAndEmployee,
};
