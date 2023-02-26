import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import SimpleAuth from "../components/SimpleAuth";

const Login = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    let accessToken = null;
    let credential = null;
    // check if user uses Google One Tap or Google Login
    if (response.credential) {
      // Google One Tap
      console.log("credential", response.credential);
      credential = response.credential;
    } else {
      // Google Login
      console.log("accessToken", response.access_token);
      accessToken = response.access_token;
    }
    // https://www.googleapis.com/auth/userinfo.email
    // https://www.googleapis.com/auth/userinfo.profile
    try {
      const res = await axios.post("http://localhost:3000/api/google-oauth", {
        accessToken,
        credential,
      });
      setSuccess(res.data.message);
      setAuthenticated(true);
      setTimeout(() => {
        navigate("/admin/employee");
      }, 3000);
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
      const res = await axios.post("http://localhost:3000/api/login", dataForm);
      console.log(res);
      setAuthenticated(true);
      setSuccess(res.data.message);
      setTimeout(() => {
        navigate("/admin/employee");
      }, 3000);
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
