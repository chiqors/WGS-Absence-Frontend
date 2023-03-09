import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getAllEmployees = async () => {
  return await axios.get(`${API_URL}/employee`);
};

const getAllEmployeesByOffsetAndLimit = async (offset, limit) => {
  return await axios.get(`${API_URL}/employee?offset=${offset}&limit=${limit}`);
};

const getEmployeeById = async (id) => {
  return await axios.get(`${API_URL}/employee/${id}`);
};

const createEmployee = async (data) => {
  return await axios.post(`${API_URL}/employee`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateEmployee = async (id, data) => {
  return await axios.put(`${API_URL}/employee/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteEmployee = async (id) => {
  return await axios.delete(`${API_URL}/employee/${id}`);
};

export default {
  getAllEmployees,
  getAllEmployeesByOffsetAndLimit,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
