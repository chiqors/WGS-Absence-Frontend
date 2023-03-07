import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import authApi from "../api/auth";
import { getJwtDecoded } from "../utils/AuthGuard";
import GoogleIcon from "./svg/GoogleIcon";
import UserLoading from "./ui/UserLoading";

const GoogleLink = () => {
  const [isLinked, setIsLinked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const data = getJwtDecoded();

  const linkGoogleAccount = useGoogleLogin({
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    onSuccess: async (response) => {
      setProcessing(true);
      const resp = await authApi.linkGoogleAccount({
        employee_id: data.employee_id,
        access_token: response.access_token,
      });
      Promise.resolve(resp).then(() => {
        console.log("Link Google account successfully: ", resp.data);
        setProcessing(false);
        setIsLinked(true);
      });
    },
    onError: (error) => {
      console.log("Failed to link Google account", error);
    },
  });

  const unlinkGoogleAccount = async () => {
    try {
      const response = await authApi.unlinkGoogleAccount({
        employee_id: data.employee_id,
      });
      console.log("Unlink Google account successfully: ", response.data);
      setIsLinked(false);
    } catch (error) {
      console.log("Failed to unlink Google account", error);
    }
  };

  useEffect(() => {
    const fetchOauth = async () => {
      try {
        const response = await authApi.getGoogleOauthAccount(data.employee_id);
        if (response.data.data !== null) {
          setIsLinked(true);
        } else {
          setIsLinked(false);
        }
      } catch (error) {
        console.log("Failed to fetch Google account", error);
      }
    };

    fetchOauth();

    return () => {
      setIsLinked(false);
    };
  }, [data.employee_id]);

  return (
    <li>
      {processing && <UserLoading />}
      <button
        type="button"
        className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10 text-center justify-center"
        onClick={isLinked ? unlinkGoogleAccount : linkGoogleAccount}
      >
        <GoogleIcon />
        <p className="text-base font-medium ml-4 text-gray-700">
          {isLinked ? "Unlink" : "Link"} Google Account
        </p>
      </button>
    </li>
  );
};

export default GoogleLink;
