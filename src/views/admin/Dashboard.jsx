import { Link, useSearchParams } from "react-router-dom";
import { sendMail } from "../../api/mail";
import EmployeeTable from "../../components/EmployeeTable";
import AdminInfoAlert from "../../components/ui/AdminInfoAlert";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;

  const handleMail = async () => {
    console.log("Sending mail...");
    await sendMail({
      to: "fathoniplay@gmail.com",
      subject: "Test",
      body: "test",
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">Employee List</h1>
      <Link
        to="/admin/employee/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>

      <button
        onClick={handleMail}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Send Test Mail
      </button>

      {location.state && location.state.msg && (
        <AdminInfoAlert msg={location.state.msg} />
      )}

      <div className="mt-8 overflow-x-auto w-full">
        <EmployeeTable page={page} limit={limit} />
      </div>
    </>
  );
};

export default Dashboard;
