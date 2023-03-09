import axios from "axios";
import { BACKEND_API_PATH, BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL + BACKEND_API_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const sendMail = async (data) => {
  const response = await axios.post(`${API_URL}/testMail`, data);
  return response;
};

export { sendMail };
