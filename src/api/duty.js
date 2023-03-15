import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getAllJobsForSelectBox = () => {
  return axios.get(`${API_URL}/duty/jobs`);
};

const getAllDuties = (page, limit, filters, duty_name) => {
  // filters: { job_id, status, updated_at, duty_name }
  // turn filters into query string for each key
  let query = "";
  for (const key in filters) {
    if (filters[key] !== "") {
      query += `&${key}=${filters[key]}`;
    }
  }
  if (duty_name !== "") {
    query += `&duty_name=${duty_name}`;
  }
  return axios.get(`${API_URL}/duty?page=${page}&limit=${limit}${query}`);
};

const getAllDutyNotAssignedWithJobId = (jobId) => {
  return axios.get(`${API_URL}/duty/getAllDutyNotAssignedWithJobId/${jobId}`);
};

const getDutyById = (id) => {
  return axios.get(`${API_URL}/duty/show/${id}`);
};

const getDutyAttendanceAndEmployeeById = (id) => {
  return axios.get(`${API_URL}/duty/getDutyAttendanceAndEmployeeById/${id}`);
};

const createDuty = (data) => {
  return axios.post(`${API_URL}/duty`, data);
};

const updateDuty = (id, data) => {
  return axios.put(`${API_URL}/duty/${id}`, data);
};

export default {
  getAllJobsForSelectBox,
  getAllDuties,
  getAllDutyNotAssignedWithJobId,
  getDutyById,
  getDutyAttendanceAndEmployeeById,
  createDuty,
  updateDuty,
};
