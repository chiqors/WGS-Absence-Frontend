import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import GoogleIcon from "./svg/GoogleIcon";

const GoogleAuth = ({ onSuccess, onFailure }) => {
  const login = useGoogleLogin({
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    onSuccess,
    onError: onFailure,
  });
  useGoogleOneTapLogin({
    onSuccess,
    onError: onFailure,
  });

  return (
    <button
      type="button"
      className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10 text-center justify-center"
      onClick={login}
    >
      <GoogleIcon />
      <p className="text-base font-medium ml-4 text-gray-700">
        Continue with Google
      </p>
    </button>
  );
};

export default GoogleAuth;
