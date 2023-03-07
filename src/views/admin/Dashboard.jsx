import { Link, useSearchParams } from "react-router-dom";
import EmployeeTable from "../../components/EmployeeTable";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">Employee List</h1>
      <Link
        to="/admin/employee/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>

      <div className="mt-8 overflow-x-auto w-full">
        <EmployeeTable page={page} limit={limit} />
      </div>
    </>
  );
};

export default Dashboard;
