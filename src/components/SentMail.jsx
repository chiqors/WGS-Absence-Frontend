import { useNavigate } from "react-router-dom";

const SentMail = ({ to }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5"
        role="alert"
      >
        <strong className="font-bold">Employee Created!</strong>
        <p>
          An email has been sent to the employee with the login credentials.
          Make sure to check the spam box. Verification link will expire in 24
          hours.
        </p>
        <button onClick={() => navigate(to)} className="btn btn-primary">
          Continue
        </button>
      </div>
    </>
  );
};

export default SentMail;
