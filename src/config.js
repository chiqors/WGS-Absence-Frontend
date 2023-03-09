// This file is used to store all the configuration variables for the app.

export const APP_NAME = import.meta.env.VITE_APP_NAME;

export const PRODUCTION_MODE = import.meta.env.VITE_APP_PRODUCTION_MODE;

export const FRONTEND_URL =
  import.meta.env.VITE_APP_PRODUCTION_MODE === "true"
    ? import.meta.env.VITE_APP_FRONTEND_PRODUCTION_URL
    : import.meta.env.VITE_APP_FRONTEND_DEVELOPMENT_URL;

export const BACKEND_URL =
  import.meta.env.VITE_APP_PRODUCTION_MODE === "true"
    ? import.meta.env.VITE_APP_BACKEND_PRODUCTION_URL
    : import.meta.env.VITE_APP_BACKEND_DEVELOPMENT_URL;

export const BACKEND_API_PATH = import.meta.env.VITE_APP_BACKEND_API_PATH;

export const BACKEND_AUTH_PATH = import.meta.env.VITE_APP_BACKEND_AUTH_PATH;

export const GOOGLE_OAUTH_CLIENT_ID = import.meta.env
  .VITE_GOOGLE_OAUTH_CLIENT_ID;

export const GOOGLE_OAUTH_CLIENT_SECRET = import.meta.env
  .VITE_GOOGLE_OAUTH_CLIENT_SECRET;
