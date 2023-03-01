// Dependencies & Libraries
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Utils
import Protected from "./utils/Protected";
import Redirect from "./utils/Redirect";
// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
// Pages
import EmployeeCreate from "./views/admin/EmployeeCreate";
import EmployeeEdit from "./views/admin/EmployeeEdit";
import EmployeeShow from "./views/admin/EmployeeShow";
import Home from "./views/admin/Home";
import TestUpload from "./views/admin/TestUpload";
import Error404 from "./views/Error404";
import Login from "./views/Login";
import Profile from "./views/user/Profile";
// styles
import "./index.css";

const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected element={<AdminLayout />} role="admin" />}>
          <Route index path="admin/employee" element={<Home />} />
          <Route path="admin/employee/add" element={<EmployeeCreate />} />
          <Route path="admin/employee/show/:id" element={<EmployeeShow />} />
          <Route path="admin/employee/edit/:id" element={<EmployeeEdit />} />
        </Route>
        <Route element={<Protected element={<UserLayout />} role="employee" />}>
          <Route path="user/test" element={<TestUpload />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
