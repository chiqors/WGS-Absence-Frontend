// Dependencies & Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Layouts
import AdminLayout from "./layouts/AdminLayout";
// Pages
import EmployeeCreate from "./views/admin/EmployeeCreate";
import Home from "./views/admin/Home";
import TestUpload from "./views/admin/testUpload";
import Profile from "./views/user/Profile";
// styles
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="/employee/add" element={<EmployeeCreate />} />
          <Route path="/test" element={<TestUpload />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
