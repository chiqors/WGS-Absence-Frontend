import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const getAllDutyNotAssignedWithJobId = (jobId) => {
  return axios.get(`${API_URL}/duty/getAllDutyNotAssignedWithJobId/${jobId}`);
};

export default {
  getAllDutyNotAssignedWithJobId,
};
