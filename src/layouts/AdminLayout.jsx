import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import AdminHeader from "../components/ui/AdminHeader";
import AdminSidebar from "../components/ui/AdminSidebar";
import { getJwtDecoded, removeJwt } from "../utils/AuthGuard";

const Layout = () => {
  const [employee, setEmployee] = useState({});
  const userData = getJwtDecoded();
  const navigate = useNavigate();

  const doLogout = () => {
    removeJwt();
    navigate("/login");
  };

  const fetchEmployee = async (id) => {
    const response = await authApi.getAuth(id);
    return response.data;
  };

  useEffect(() => {
    fetchEmployee(userData.id).then((data) => {
      setEmployee(data);
    });
  }, []);

  return (
    <>
      <div className="drawer drawer-mobile text-base-content">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
        {/* Main content here */}
        <main className="drawer-content bg-base-100 space-y-4">
          {/* navbar / header */}
          <AdminHeader userData={employee} />
          {/* main content */}
          <div className="container mx-auto px-6">
            <Outlet />
          </div>
        </main>
        {/* Sidebar content here */}
        <AdminSidebar />
      </div>
    </>
  );
};

export default Layout;
