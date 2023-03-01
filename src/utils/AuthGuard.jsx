import jwt_decode from "jwt-decode";

const saveJwt = (jwt) => {
  localStorage.setItem("token", jwt);
};

const getJwtDecoded = () => {
  const jwt = localStorage.getItem("token");
  const decodedToken = jwt_decode(jwt);
  return decodedToken;
};

const removeJwt = () => {
  localStorage.removeItem("token");
};

const checkJwt = () => {
  const jwt = getJwtDecoded();
  // check if jwt is expired
  if (jwt.exp < Date.now() / 1000) {
    removeJwt();
    return false;
  }
  return true;
};

export { saveJwt, getJwtDecoded, removeJwt, checkJwt };
