import { useEffect, useState } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FiAirplay } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { IoTelescopeSharp } from "react-icons/io5";
import { RiTaskFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { APP_NAME } from "../../config";

const AdminSidebar = () => {
  const [active, setActive] = useState("");
  const pathname = window.location.pathname;
  const helperAppName = APP_NAME.split(" ");

  const getActive = (url) => {
    // check if end of url is slash or not
    if (url[url.length - 1] === "/") {
      url = url.slice(0, -1); // remove slash
    }

    if (url === "/admin") {
      setActive("dashboard");
    } else if (url === "/admin/employee") {
      setActive("employee");
    } else if (url === "/admin/duty") {
      setActive("duty");
    } else if (url === "/admin/job") {
      setActive("job");
    } else if (url === "/admin/attendance") {
      setActive("attendance");
    }
  };

  useEffect(() => {
    getActive(pathname);
  }, [pathname]);

  return (
    <aside className="drawer-side">
      <label htmlFor="drawer-toggle" className="drawer-overlay" />
      <div className="scrollbar-thin scrollbar-thumb-gray-300 bg-slate-800 overflow-y-auto overflow-x-hidden w-64 border-r border-base-300">
        <h2 className="mt-5 mb-8 text-2xl font-bold text-white pl-6">
          <span className="text-primary">{helperAppName[0]}</span>{" "}
          {helperAppName[1]}
        </h2>
        <h6 className="font-semibold ml-6 text-white">OVERVIEW</h6>
        {/* divider width same as sub header text */}
        <div className="w-24 h-0.5 bg-secondary rounded-full mt-1 ml-6" />
        <ul className="menu p-2 text-gray-400 font-semibold mb-6">
          <li>
            <Link
              to="/admin"
              className={
                `${active === "dashboard" ? "active" : ""}` +
                ` ` +
                `hover:text-white hover:bg-slate-700`
              }
              name="dashboard"
              onClick={() => setActive("dashboard")}
            >
              <FiAirplay />
              Dashboard
            </Link>
          </li>
        </ul>
        <h6 className="font-semibold ml-6 text-white">MANAGE</h6>
        <div className="w-24 h-0.5 bg-secondary rounded-full mt-1 ml-6" />
        <ul className="menu p-2 text-gray-400 font-semibold mb-8 space-y-0">
          <li>
            <Link
              to="/admin/employee"
              className={
                `${active === "employee" ? "active" : ""}` +
                ` ` +
                `hover:text-white hover:bg-slate-700`
              }
              name="employee"
              onClick={() => setActive("employee")}
            >
              <HiUserGroup />
              Employee
            </Link>
          </li>
          <li>
            <Link
              to="/admin/duty"
              className={
                `${active === "duty" ? "active" : ""}` +
                ` ` +
                `hover:text-white hover:bg-slate-700`
              }
              name="duty"
              onClick={() => setActive("duty")}
            >
              <RiTaskFill />
              Duty
            </Link>
          </li>
          <li>
            <Link
              to="/admin/job"
              className={
                `${active === "job" ? "active" : ""}` +
                ` ` +
                `hover:text-white hover:bg-slate-700`
              }
              name="job"
              onClick={() => setActive("job")}
            >
              <IoTelescopeSharp />
              Job
            </Link>
          </li>
          <li>
            <Link
              to="/admin/attendance"
              className={
                `${active === "attendance" ? "active" : ""}` +
                ` ` +
                `hover:text-white hover:bg-slate-700`
              }
              name="attendance"
              onClick={() => setActive("attendance")}
            >
              <BsFillPersonVcardFill />
              Attendance
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
