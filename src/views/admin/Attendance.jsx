import { useState } from "react";
import AttendanceTable from "../../components/tables/AttendanceTable";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";

const Attendance = () => {
  const [week, setWeek] = useState(0);
  const listMenu = [
    {
      title: "Attendance List",
      href: "/admin/attendance",
    },
  ];
  return (
    <>
      <h1 className="text-3xl font-bold mb-3 flex flex-col items-center">
        Attendance List
      </h1>
      <div className="flex flex-col items-center">
        <div>
          <AdminBreadcrumb items={listMenu} />
        </div>
      </div>
      <div className="mt-8 overflow-x-auto w-full flex flex-col items-center">
        <AttendanceTable week={week} />
      </div>
    </>
  );
};

export default Attendance;
