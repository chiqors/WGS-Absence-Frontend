import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import employeeApi from "../../api/employee";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import helper from "../../helper.js";

const EmployeeShow = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();

  const listMenu = [
    {
      title: "Admin",
      href: "/admin/employee",
    },
    {
      title: "Employees",
      href: "/admin/employee",
    },
  ];

  const fetchEmployee = async () => {
    const response = await employeeApi.getEmployeeById(id);
    return response.data;
  };

  useEffect(() => {
    fetchEmployee().then((data) => {
      setEmployee(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  const handleTab = (index) => {
    setTab(index);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const check = window.confirm("Are you sure to delete this employee?");
    if (check) {
      try {
        console.log("delete");
        // await employeeApi.deleteEmployee(id);
        navigate("/admin/employee");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("cancel");
    }
  };

  return (
    <>
      <div>
        <h1 className="mb-5 text-3xl font-bold">Show Employee ID: {id}</h1>
      </div>

      <AdminBreadcrumb items={listMenu} />

      <div className="flex flex-col mt-5">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="tabs">
                <a
                  className={
                    tab === 0 ? "tab tab-lifted tab-active" : "tab tab-lifted"
                  }
                  onClick={() => handleTab(0)}
                >
                  <span className="tab-title">Profile</span>
                </a>
                <a
                  className={
                    tab === 1 ? "tab tab-lifted tab-active" : "tab tab-lifted"
                  }
                  onClick={() => handleTab(1)}
                >
                  <span className="tab-title">Attendance</span>
                </a>
              </div>

              {tab === 0 ? (
                <div className="card lg:card-side bg-base-100 shadow-xl p-6 mt-6">
                  <div className="card-side-image">
                    <div className="card-image h-48 w-48 bg-base-100 rounded-full shadow-xl overflow-hidden">
                      <img
                        src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                        alt="Album"
                      />
                    </div>
                  </div>
                  <div className="card-body py-0">
                    <h2 className="card-title">{employee.full_name}</h2>
                    <p className="text-gray-500">{employee.job_title}</p>
                    <p className="text-gray-500">{employee.email}</p>
                    <p className="text-gray-500">{employee.phone}</p>
                    <p className="text-gray-500">{employee.address}</p>
                    <p className="text-gray-500">
                      Age {helper.getAgeFromBirthDate(employee.birthdate)}th
                      year | {employee.birthdate}
                    </p>
                    <p className="text-gray-500">{employee.gender}</p>
                    <div className="card-actions">
                      <Link
                        to={`/admin/employee/edit/${employee.id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <form onSubmit={handleDelete}>
                        <button type="submit" className="btn btn-error">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card bg-base-100 shadow-xl p-6 mt-6">
                  <div className="card-body">
                    <h2 className="card-title">Attendance</h2>
                    <table className="table table-compact table-striped">
                      <thead>
                        <tr>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Duration</th>
                          <th>Assignment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.attendance !== undefined ? (
                          employee.attendance.map((attendance) => (
                            <tr key={attendance.id}>
                              <td>{attendance.time_in}</td>
                              <td>{attendance.time_out}</td>
                              <td>
                                {helper.getDurationHours(
                                  attendance.time_in,
                                  attendance.time_out
                                )}
                              </td>
                              <td>{attendance.assignment}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeShow;

{
  /* <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Jane Cooper
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="text-green-500">Active</span> since
                            2020
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Regional Paradigm Technician
                      </div>
                      <div className="text-sm text-gray-500">Optimization</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Admin
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table> */
}
