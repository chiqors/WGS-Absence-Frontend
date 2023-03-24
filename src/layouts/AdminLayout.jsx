import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import AdminHeader from "../components/ui/AdminHeader";
import AdminSidebar from "../components/ui/AdminSidebar";
import { getJwtDecoded } from "../utils/AuthGuard";

const AdminLayout = ({ location }) => {
  const [employee, setEmployee] = useState({});
  const userData = getJwtDecoded();
  const navigate = useNavigate();

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
          <AnimatePresence mode="wait">
            {/* slide up from bottom with opacity and Y axis for positioning, slowly */}
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto px-6">
                <Outlet />
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
        {/* Sidebar content here */}
        <AdminSidebar />
      </div>
    </>
  );
};

export default AdminLayout;
