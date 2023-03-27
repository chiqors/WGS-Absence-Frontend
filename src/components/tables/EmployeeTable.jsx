import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import employeeApi from "../../api/employee";
import helper from "../../helper.js";

const EmployeeRow = (props) => {
  const handleSubmit = async (e, paramId) => {
    e.preventDefault();
    const checkConfirm = confirm("Are you sure to delete this employee?");
    if (checkConfirm) {
      // if (result) {
      //   props.onDelete(paramId);
      // }
      await employeeApi
        .deleteEmployee(paramId)
        .then((res) => {
          props.onDelete(paramId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {props.data.map((employee) => (
        <tr key={employee.id}>
          <th>
            <div className="flex items-center space-x-3">
              <div className="text-sm opacity-50">{employee.id}</div>
            </div>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <LazyLoadImage
                    alt="Avatar Tailwind CSS Component"
                    src={
                      employee.photo_url.includes("http") ||
                      employee.photo_url.includes("https")
                        ? employee.photo_url
                        : helper.getAssetPath(employee.photo_url)
                    }
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{employee.full_name}</div>
                <div className="text-sm opacity-50">
                  {employee.gender} (
                  {helper.getAgeFromBirthDate(employee.birthdate)}th y/o)
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="flex items-center space-x-3">
              <div>
                <div className="underline">{employee.account.email}</div>
                <div className="text-sm">{employee.phone}</div>
              </div>
            </div>
          </td>
          <td>
            {employee.attendance[0] != null
              ? employee.attendance[0].duty.status == "not_assigned"
                ? "Not Assigned"
                : employee.attendance[0].duty.status == "assigned"
                ? "Assigned"
                : employee.attendance[0].duty.status == "need_discussion"
                ? "Need Discussion"
                : "Completed"
              : "No Attendance?"}
            <br />
            <span className="badge badge-ghost badge-sm">
              {employee.job.name ? employee.job.name : "No Job"}
            </span>
          </td>
          <th>
            <div className="flex items-center space-x-3">
              <Link to={`/admin/employee/edit/${employee.id}`}>
                <button className="btn btn-warning btn-sm">edit</button>
              </Link>
              <Link to={`/admin/employee/show/${employee.id}`}>
                <button className="btn btn-info btn-sm">details</button>
              </Link>
              <form onSubmit={(e) => handleSubmit(e, employee.id)}>
                <button className="btn btn-error btn-sm">delete</button>
              </form>
            </div>
          </th>
        </tr>
      ))}
    </>
  );
};

const PaginatedEmployee = ({ offset, limit }) => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageOffset, setPageOffset] = useState(offset || 0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      await employeeApi
        .getAllEmployeesByOffsetAndLimit(pageOffset, limit)
        .then((response) => {
          setEmployees(response.data.data);
          setPageCount(response.data.total_pages);
        });
    };
    fetchData();

    // Cleanup
    return () => {
      setEmployees([]);
      setPageCount(0);
    };
  }, [pageOffset]);

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    // convert selected page to offset
    const offset = selectedPage * limit - limit;
    setPageOffset(offset);
  };

  const handleDelete = (id) => {
    const newEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(newEmployees);
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
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        hrefBuilder={(page, pageCount, selected) =>
          page >= 1 && page <= pageCount ? `?page=${page}` : "#"
        }
        hrefAllControls={true}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
      />
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Job</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            <EmployeeRow data={employees} onDelete={handleDelete} />
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available / Loading data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

const EmployeeTable = (props) => {
  const limit = props.limit || 5;
  const offset = (props.page - 1) * limit;
  return <PaginatedEmployee offset={offset} limit={limit} />;
};

export default EmployeeTable;
