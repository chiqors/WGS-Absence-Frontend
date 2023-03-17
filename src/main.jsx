// Dependencies & Libraries
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Utils
import { GOOGLE_OAUTH_CLIENT_ID } from "./config.js";
import Logout from "./utils/Logout";
import Protected from "./utils/Protected";
import Redirect from "./utils/Redirect";
// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
// Admin Pages
import Attendance from "./views/admin/Attendance";
import AttendanceShow from "./views/admin/AttendanceShow";
import Dashboard from "./views/admin/Dashboard";
import Duty from "./views/admin/Duty.jsx";
import DutyCreate from "./views/admin/DutyCreate.jsx";
import DutyEdit from "./views/admin/DutyEdit.jsx";
import DutyShow from "./views/admin/DutyShow.jsx";
import Employee from "./views/admin/Employee";
import EmployeeCreate from "./views/admin/EmployeeCreate";
import EmployeeEdit from "./views/admin/EmployeeEdit";
import EmployeeShow from "./views/admin/EmployeeShow";
import Job from "./views/admin/Job";
import JobCreate from "./views/admin/JobCreate.jsx";
import JobDutyCreate from "./views/admin/JobDutyCreate.jsx";
import JobDutyEdit from "./views/admin/JobDutyEdit.jsx";
import JobDutyShow from "./views/admin/JobDutyShow.jsx";
import JobEdit from "./views/admin/JobEdit.jsx";
import JobShow from "./views/admin/JobShow.jsx";
import Log from "./views/admin/Log";
// User Pages
import Home from "./views/user/Home";
// Common Pages
import Error404 from "./views/Error404";
import Login from "./views/Login";
// styles
import "./index.css";

const clientId = GOOGLE_OAUTH_CLIENT_ID;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<Protected element={<AdminLayout />} role="admin" />}>
          <Route index path="admin/" element={<Dashboard />} />
          <Route path="admin/dashboard" element={<Redirect to="/admin" />} />
          <Route path="admin/employee" element={<Employee />} />
          <Route path="admin/employee/create" element={<EmployeeCreate />} />
          <Route path="admin/employee/show/:id" element={<EmployeeShow />} />
          <Route path="admin/employee/edit/:id" element={<EmployeeEdit />} />
          <Route path="admin/attendance" element={<Attendance />} />
          <Route path="admin/attendance/:date" element={<AttendanceShow />} />
          <Route path="admin/job" element={<Job />} />
          <Route path="admin/job/create" element={<JobCreate />} />
          <Route path="admin/job/show/:id" element={<JobShow />} />
          <Route path="admin/job/edit/:id" element={<JobEdit />} />
          <Route
            path="admin/job/show/:id/duty/create"
            element={<JobDutyCreate />}
          />
          <Route
            path="admin/job/show/:id/duty/edit/:dutyId"
            element={<JobDutyEdit />}
          />
          <Route
            path="admin/job/show/:id/duty/show/:dutyId"
            element={<JobDutyShow />}
          />
          <Route path="admin/duty" element={<Duty />} />
          <Route path="admin/duty/create" element={<DutyCreate />} />
          <Route path="admin/duty/show/:id" element={<DutyShow />} />
          <Route path="admin/duty/edit/:id" element={<DutyEdit />} />
          <Route path="admin/log" element={<Log />} />
        </Route>
        <Route element={<Protected element={<UserLayout />} role="employee" />}>
          <Route index path="user/" element={<Home />} />
        </Route>
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Redirect to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
