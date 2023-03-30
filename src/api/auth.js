import axios from "axios";
import { BACKEND_AUTH_PATH, BACKEND_URL } from "../config";

const AUTH_URL = `${BACKEND_URL + BACKEND_AUTH_PATH}`;
// ngrok-skip-browser-warning is a custom header to skip the ngrok browser warning
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any value";

const getAuth = async (id) => {
  return await axios.get(`${AUTH_URL}/auth/${id}`);
};

const doLogin = async (data) => {
  return await axios.post(`${AUTH_URL}/login`, data);
};

const doLogout = async (data) => {
  return await axios.post(`${AUTH_URL}/logout`, data);
};

const doGoogleLogin = async (data) => {
  return await axios.post(`${AUTH_URL}/oauth/google/login`, data);
};

const linkGoogleAccount = async (data) => {
  return await axios.post(`${AUTH_URL}/oauth/google/link`, data);
};

const unlinkGoogleAccount = async (data) => {
  return await axios.post(`${AUTH_URL}/oauth/google/unlink`, data);
};

const getGoogleOauthAccount = async (employeeId) => {
  return await axios.get(`${AUTH_URL}/oauth/google/get/${employeeId}`);
};

export default {
  getAuth,
  doLogin,
  doLogout,
  doGoogleLogin,
  linkGoogleAccount,
  unlinkGoogleAccount,
  getGoogleOauthAccount,
};
