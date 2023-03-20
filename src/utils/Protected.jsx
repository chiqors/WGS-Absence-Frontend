import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJwtDecoded } from "./AuthGuard";

const Protected = ({ element, role }) => {
  const navigate = useNavigate();
  let token = null;
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const tkn = getJwtDecoded();
      token = tkn;
      if (token) {
        // check if role is same as the role in token
        if (token.role === role) {
          setAuthenticated(true);
        }
        // check if role is not defined in props
        if (!role) {
          setAuthenticated(true);
        }
        // if role is not same as the role in token
        if (token.role !== role) {
          console.log("not authorized");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, [token, role, navigate]);

  return authenticated ? element : null;
};

export default Protected;
