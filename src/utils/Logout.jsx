import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeJwt } from "./AuthGuard";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    removeJwt();
    navigate("/login");
  }, []);
  return null;
};

export default Logout;
