import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import attendanceApi from "../../api/attendance";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import CircleLoading from "../../components/ui/CircleLoading";
import helper from "../../helper.js";

const AttendanceShow = () => {
  const { date } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const printComponentRef = useRef();
  const listMenu = [
    {
      title: "Attendance List",
      href: "/admin/attendance",
    },
    {
      title: "Attendance Detail",
      href: `/admin/attendance/${date}`,
    },
  ];

  const fetchAttendance = async () => {
    const response = await attendanceApi.getAllAttendanceOnDate(date);
    return response.data;
  };

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetchAttendance().then((data) => {
        setAttendance(data);
        setLoading(false);
      });
    }

    return () => {
      setAttendance([]);
    };
  }, [date]);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  return (
    <div ref={printComponentRef}>
      <h1 className="text-3xl font-bold mb-3 flex flex-col items-center">
        Attendance Detail
      </h1>

      <div className="flex flex-col items-center my-3">
        <div>
          <AdminBreadcrumb items={listMenu} />
        </div>
      </div>

      <p className="text-xl mb-3 flex flex-col items-center">
        Date: {helper.getHumanReadableDate(date)}
      </p>

      <div className="flex flex-col items-center">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
        >
          Print
        </button>
      </div>

      {!loading ? (
        <>
          {attendance.length > 0 ? (
            <div className="mt-8 overflow-x-auto w-full flex flex-col items-center">
              <table className="table-auto w-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Employee</th>
                    <th className="px-4 py-2">Duty Assigned</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Duration</th>
                    <th className="px-4 py-2">Notes</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {attendance.map((attendance) => (
                    <tr key={attendance.id}>
                      <td className="border px-4 py-2">
                        <div className="flex items-center space-x-3">
                          <LazyLoadImage
                            className="w-10 h-10 rounded-full"
                            src={helper.getAssetPath(
                              attendance.employee.photo_url
                            )}
                            alt={attendance.employee.full_name}
                          />
                          <div>
                            <span className="font-bold">
                              {attendance.employee.full_name}
                            </span>
                            <br />
                            <span className="text-sm">
                              {attendance.duty.job.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        {attendance.duty.name}
                        <br />
                        {attendance.duty.status === "assigned" ? (
                          <span className="text-sm bg-green-200 rounded p-1">
                            Assigned
                          </span>
                        ) : attendance.duty.status === "completed" ? (
                          <span className="text-sm bg-green-200 rounded p-1">
                            Completed
                          </span>
                        ) : (
                          <span className="text-sm bg-red-200 rounded p-1">
                            Need Discussion
                          </span>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {attendance.time_in && attendance.time_out ? (
                          <span className="bg-lime-500 text-white rounded p-1">
                            Done Working
                          </span>
                        ) : (
                          <span className="bg-emerald-400 text-white rounded p-1">
                            Available
                          </span>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {helper.getDurationHours(
                          attendance.time_in,
                          attendance.time_out
                        )}
                        <br />
                        {helper.getHumanWorkingHours(
                          attendance.time_in,
                          attendance.time_out
                        )}
                      </td>
                      <td className="border px-4 py-2 divide-y">
                        {attendance.note_in || attendance.note_out ? (
                          <>
                            {attendance.note_in ? (
                              <div className="py-1">
                                <span className="font-bold">IN: </span>
                                {attendance.note_in}
                              </div>
                            ) : null}
                            {attendance.note_out ? (
                              <div className="py-1">
                                <span className="font-bold">OUT: </span>
                                {attendance.note_out}
                              </div>
                            ) : null}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        <Link
                          to={`/admin/employee/show/${attendance.employee.id}`}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-1xl mb-3 flex flex-col items-center">
                No Attendance Found
              </h1>
            </div>
          )}
        </>
      ) : (
        <CircleLoading data="attendance" />
      )}
    </div>
  );
};

export default AttendanceShow;
