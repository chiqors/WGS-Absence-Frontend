import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const getAllLatestAttendanceWithDutyForEmployeeId = (employeeId) => {
  return axios.get(`${API_URL}/attendance/prevlist/employee/${employeeId}`);
};

const checkIn = (data) => {
  return axios.post(`${API_URL}/attendance/checkin`, data);
};

const checkOut = (data) => {
  return axios.put(`${API_URL}/attendance/checkout`, data);
};

const isEmployeeClockedIn = (data) => {
  return axios.post(`${API_URL}/attendance/checkin/status`, data);
};

export default {
  getAllLatestAttendanceWithDutyForEmployeeId,
  checkIn,
  checkOut,
  isEmployeeClockedIn,
};
