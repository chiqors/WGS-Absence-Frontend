import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authApi from "../api/auth";
import GoogleAuth from "../components/GoogleAuth";
import SimpleAuth from "../components/SimpleAuth";
import { getJwtDecoded, saveJwt } from "../utils/AuthGuard";

const Login = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified");

  useEffect(() => {
    if (verified === "true") {
      setSuccess("Your email has been verified. You can login now.");
    }
    return () => {
      setSuccess(null);
    };
  }, [verified]);

  const handleSuccess = async (response) => {
    let accessToken = null;
    let credential = null;
    // check if user uses Google One Tap or Google Login
    if (response.credential) {
      // Google One Tap
      credential = response.credential;
    } else {
      // Google Login
      accessToken = response.access_token;
    }
    try {
      const res = await authApi.doGoogleLogin({
        accessToken,
        credential,
      });
      setSuccess(res.data.message);
      saveJwt(res.data.token);
      const token = getJwtDecoded();
      setAuthenticated(true);
      if (token.role === "admin") {
        console.log("admin");
        setTimeout(() => {
          navigate("/admin/employee");
        }, 3000);
      } else {
        setTimeout(() => {
          console.log("employee");
          navigate("/user/");
        }, 3000);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const handleFailure = (response) => {
    // handle failure
    console.log(response);
  };

  const handleAuth = async (dataForm) => {
    // handle authentication
    try {
      const res = await authApi.doLogin(dataForm);
      setSuccess(res.data.message);
      saveJwt(res.data.token);
      const token = getJwtDecoded();
      setAuthenticated(true);
      if (token.role === "admin") {
        console.log("admin");
        setTimeout(() => {
          navigate("/admin/employee");
        }, 3000);
      } else {
        setTimeout(() => {
          console.log("employee");
          navigate("/user/");
        }, 3000);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4 h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10">
            <p
              tabIndex={0}
              role="heading"
              aria-label="Login to your account"
              className="text-2xl font-extrabold leading-6 text-gray-800 text-center"
            >
              Login to your account
            </p>

            {!authenticated ? (
              <>
                <GoogleAuth
                  onSuccess={handleSuccess}
                  onFailure={handleFailure}
                />

                <div className="w-full flex items-center justify-between py-5">
                  <hr className="w-full bg-gray-400" />
                  <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                    OR
                  </p>
                  <hr className="w-full bg-gray-400  " />
                </div>

                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                  >
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                {success && (
                  <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                  >
                    <span className="block sm:inline">{success}</span>
                  </div>
                )}

                <div>
                  <SimpleAuth onSubmit={handleAuth} />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div
                  className="mt-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{success}</span>
                </div>
                <p className="text-center">
                  You are being redirected to the dashboard...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
