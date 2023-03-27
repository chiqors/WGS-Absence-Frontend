import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import employeeApi from "../api/employee";
import GoogleLink from "../components/GoogleLink";
import helper from "../helper";
import { getJwtDecoded } from "../utils/AuthGuard";

const UserLayout = ({ location }) => {
  const app_name = import.meta.env.VITE_APP_NAME;
  const userData = getJwtDecoded();
  const [employee, setEmployee] = useState({});
  const [timer, setTimer] = useState(null);

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
    const interval = setInterval(() => {
      setTimer(helper.getDatetimeNow());
    }, 1000);
    return () => clearInterval(interval);
  }, [userData.employee_id]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
                <div className="flex-none mr-3">
                  <motion.span
                    className="badge badge-ghost rounded-box p-4"
                    animate={{ scale: [1, 1.2, 1.2, 1, 1] }}
                    transition={{ duration: 1 }}
                  >
                    {timer ? (
                      timer
                    ) : (
                      <>
                        {/* clock spinning position */}
                        <span className="animate-spin">
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
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        </span>
                      </>
                    )}
                  </motion.span>
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
              <Outlet />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {/* profile with photo_url and full_name */}
            {/* li reset for no hover, no click style */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex-none">
                  {employee?.photo_url !== null ? (
                    <motion.img
                      src={helper.getAssetPath(employee?.photo_url)}
                      alt="profile"
                      className="w-16 h-16 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.25 }}
                    />
                  ) : (
                    <span>Loading...</span>
                  )}
                </div>
                <div className="flex-none p-3">
                  <div className="text-lg font-bold">{employee?.full_name}</div>
                  <div className="text-sm">{employee?.job?.name}</div>
                </div>
              </div>
              <div className="mt-0 pt-0">
                <GoogleLink data={employee} />
              </div>
            </div>
            <div className="divider divide-gray-300 mb-0 pb-0"></div>
            <li className="mb-0 pb-0">
              <Link to="/logout">
                <IoLogOut className="inline-block w-7 h-7 mr-2" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default UserLayout;
