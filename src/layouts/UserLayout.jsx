import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import employeeApi from "../api/employee";
import GoogleLink from "../components/GoogleLink";
import { getJwtDecoded } from "../utils/AuthGuard";

const UserLayout = () => {
  const app_name = import.meta.env.VITE_APP_NAME;
  const navigate = useNavigate();
  const userData = getJwtDecoded();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employeeApi.getEmployeeById(
          userData.employee_id
        );
        setEmployee(response.data);
      } catch (error) {
        console.log("Failed to fetch employee", error);
      }
    };
    fetchEmployee();
  }, [userData.employee_id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <!-- Page content here --> */}
          {/* flex row 1:2. 1 for button drawer and 2 for content outlet */}
          {/* the page must fit with height of the screen */}
          <div className="flex flex-col h-screen">
            <div className="flex-none">
              <div className="navbar bg-base-100 shadow-md">
                <div className="flex-1">
                  <a className="btn btn-ghost normal-case text-xl">
                    {app_name}
                  </a>
                </div>
                <div className="flex-none">
                  <label
                    htmlFor="my-drawer"
                    className="btn btn-ghost drawer-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-5 h-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              {/* <!-- Page content here --> */}
              <Outlet />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            {/* link/unlink oauth account */}
            <GoogleLink data={employee} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
