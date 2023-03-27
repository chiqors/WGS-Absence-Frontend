import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import attendanceApi from "../../api/attendance";
import helper from "../../helper.js";
import CircleLoading from "../ui/CircleLoading";

const AttendanceRow = ({ attendances, totalEmployees }) => {
  return (
    <>
      {attendances.map((attendance) => (
        <tr key={attendance.id}>
          <td className="border px-4 py-2">{attendance.date}</td>
          <td className="border px-4 py-2">{attendance.dayName}</td>
          <td className="border px-4 py-2">
            {attendance.employee_present} Presents / {totalEmployees} Total
          </td>
          <td className="border px-4 py-2">
            <Link
              to={`/admin/attendance/${attendance.date}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

const PaginatedAttendance = ({ week }) => {
  const [attendances, setAttendances] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWeek, setPageWeek] = useState(week || 0);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async (week) => {
    const response = await attendanceApi.getWeeklyAttendance(week);
    return response.data;
  };

  useEffect(() => {
    setLoading(true);
    fetchAttendance(pageWeek).then((data) => {
      setAttendances(data.attendances);
      setTotalEmployees(data.total_employees);
      setLoading(false);
    });

    return () => {
      setAttendances([]);
    };
  }, [pageWeek]);

  const handlePageChange = (event) => {
    setPageWeek(event.selected);
  };

  return (
    <>
      <ReactPaginate
        className="flex justify-center mb-4"
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageClassName="page-item"
        pageLinkClassName="btn btn-outline rounded-none"
        previousClassName="page-item"
        previousLinkClassName="btn rounded-none"
        nextClassName="page-item"
        nextLinkClassName="btn rounded-none"
        breakClassName="page-item"
        breakLinkClassName="btn btn-outline"
        containerClassName="btn-group"
        activeLinkClassName="btn-primary"
        pageCount={3}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        hrefAllControls={true}
        onPageChange={handlePageChange}
        forcePage={pageWeek}
      />
      {/* span: this week, last week */}
      <span className="text-sm text-gray-500">
        Showing attendance for
        <span className="font-bold"> {helper.getCurrentWeeks(pageWeek)}</span>
      </span>
      <table className="table-auto w-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Employee</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        {!loading ? (
          <tbody>
            <AttendanceRow
              attendances={attendances}
              totalEmployees={totalEmployees}
            />
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4">
                <CircleLoading data="attendance" />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
};

const AttendanceTable = ({ week }) => {
  const weekProps = week || 0;
  return <PaginatedAttendance week={weekProps} />;
};

export default AttendanceTable;
