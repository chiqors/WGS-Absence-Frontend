// Dependencies & Libraries
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Redirect
import Redirect from "./utils/Redirect";
// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
// Pages
import EmployeeCreate from "./views/admin/EmployeeCreate";
import EmployeeEdit from "./views/admin/EmployeeEdit";
import EmployeeShow from "./views/admin/EmployeeShow";
import Home from "./views/admin/Home";
import TestUpload from "./views/admin/testUpload";
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="employee" element={<Home />} />
          <Route path="employee/add" element={<EmployeeCreate />} />
          <Route path="employee/show/:id" element={<EmployeeShow />} />
          <Route path="employee/edit/:id" element={<EmployeeEdit />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route path="test" element={<TestUpload />} />
          <Route path="profile" element={<Profile />} />
        </Route>
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
