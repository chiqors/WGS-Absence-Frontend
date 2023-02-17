import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/ui/AdminNavbar";

const Layout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-10">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
