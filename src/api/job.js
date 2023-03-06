import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

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
