import axios from "axios";

const AUTH_URL = import.meta.env.VITE_APP_AUTH_URL;

const doLogin = async (data) => {
  return await axios.post(`${AUTH_URL}/login`, data);
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
  doLogin,
  doGoogleLogin,
  linkGoogleAccount,
  unlinkGoogleAccount,
  getGoogleOauthAccount,
};
