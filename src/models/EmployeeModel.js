import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.REACT_APP_API_URL;

const getAllEmployees = () => {
  return axios.get(`${API_URL}/employees`);
};

const getEmployeeById = (id) => {
  return axios.get(`${API_URL}/employees/${id}`);
};

const createEmployee = (data) => {
  return axios.post(`${API_URL}/employees`, data);
};

const updateEmployee = (id, data) => {
  return axios.put(`${API_URL}/employees/${id}`, data);
};

const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/employees/${id}`);
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
