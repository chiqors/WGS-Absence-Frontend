import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Helper from "../Helper";
import EmployeeModel from "../models/EmployeeModel";

const EmployeeRow = (props) => {
  return (
    <>
      {props.data.map((employee, index) => (
        <tr key={employee.id}>
          <th>
            <div className="flex items-center space-x-3">
              <div className="text-sm opacity-50">{index + 1}</div>
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
                        : Helper.getAssetPath(employee.photo_url)
                    }
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{employee.full_name}</div>
                <div className="text-sm opacity-50">
                  {employee.gender} (
                  {Helper.getAgeFromBirthDate(employee.birthdate)}th y/o)
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="flex items-center space-x-3">
              <div>
                <div className="underline">{employee.email}</div>
                <div className="text-sm">{employee.phone}</div>
              </div>
            </div>
          </td>
          <td>
            {employee.duty_name ? employee.duty_name : "No Assignment"}
            <br />
            <span className="badge badge-ghost badge-sm">
              {employee.job_title}
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
              <button className="btn btn-error btn-sm">delete</button>
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
      await EmployeeModel.getAllEmployeesByOffsetAndLimit(
        pageOffset,
        limit
      ).then((response) => {
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

  return (
    <>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Job</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <EmployeeRow data={employees} />
        </tbody>
      </table>
      <ReactPaginate
        className="flex justify-center mt-8"
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
        breakLinkClassName="btn"
        containerClassName="btn-group"
        activeLinkClassName="btn-active"
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        hrefBuilder={(page, pageCount, selected) =>
          page >= 1 && page <= pageCount ? `?page=${page}` : "#"
        }
        hrefAllControls={true}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
      />
    </>
  );
};

const EmployeeTable = (props) => {
  const limit = props.limit || 5;
  const offset = (props.page - 1) * limit;
  return <PaginatedEmployee offset={offset} limit={limit} />;
};

export default EmployeeTable;
