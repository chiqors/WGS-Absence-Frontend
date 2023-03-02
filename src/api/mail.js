import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const sendMail = async (data) => {
  const response = await axios.post(`${API_URL}/testMail`, data);
  return response;
};

export { sendMail };
