import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

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

const getWeeklyAttendance = (week) => {
  return axios.get(`${API_URL}/attendance/show/weekdays/${week}`);
};

const getAllAttendanceOnDate = (date) => {
  return axios.get(`${API_URL}/attendance/show/date/${date}`);
};

const getAllDutyNotCompletedWithEmployeeId = (employeeId) => {
  return axios.get(
    `${API_URL}/attendance/duty/notcompleted/employee/${employeeId}`
  );
};

const getAllDutyNotCompletedWithJobId = (jobId) => {
  return axios.get(`${API_URL}/attendance/duty/notcompleted/job/${jobId}`);
};

const isDutyAlreadyAssignedToday = (dutyId) => {
  return axios.get(`${API_URL}/attendance/duty/assigned/today/${dutyId}`);
};

export default {
  getAllLatestAttendanceWithDutyForEmployeeId,
  checkIn,
  checkOut,
  isEmployeeClockedIn,
  getWeeklyAttendance,
  getAllAttendanceOnDate,
  getAllDutyNotCompletedWithEmployeeId,
  getAllDutyNotCompletedWithJobId,
  isDutyAlreadyAssignedToday,
};
