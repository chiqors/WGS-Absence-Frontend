import axios from "axios";

const API_URL = "http://localhost:3000/api";

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
