import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import jobApi from "../api/job";
import helper from "../helper.js";
import CircleLoading from "./ui/CircleLoading";

const JobRow = ({ data }) => {
  return (
    <>
      {data.map((job) => (
        <tr key={job.id}>
          <td>{job.id}</td>
          <td>{job.name}</td>
          <td>{helper.truncateString(job.description, 50)}</td>
          <td>
            <span className="badge badge-info">{job.duty.length}</span> Tasks
            <br />
            <span className="badge badge-secondary">
              {job.employee.length}
            </span>{" "}
            Employees
          </td>
          <td>{helper.getHumanReadableDate(job.created_at)}</td>
          <td>
            <Link
              to={`/admin/job/show/${job.id}`}
              className="btn btn-info btn-sm mr-2"
            >
              Details
            </Link>
            <Link
              to={`/admin/job/edit/${job.id}`}
              className="btn btn-warning btn-sm"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

const PaginatedJob = ({ page, limit }) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [pageCount, setPageCount] = useState(0);

  const fetchJobs = async () => {
    const response = await jobApi.getAllJobs(currentPage, limit);
    return response.data;
  };

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      await fetchJobs().then((response) => {
        setJobs(response.data);
        setPageCount(response.total_page);
      });
    };
    fetchData();

    // Cleanup
    return () => {
      setJobs([]);
      setPageCount(0);
    };
  }, [currentPage]);

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <Link to="/admin/job/create" className="btn btn-primary">
          Create Job
        </Link>
        <ReactPaginate
          className="flex mb-4"
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
          hrefAllControls={true}
          hrefBuilder={(page, pageCount, selected) =>
            page >= 1 && page <= pageCount ? `?page=${page}` : "#"
          }
          pageCount={pageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
        />
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="table table-striped table-hover w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Active Duty</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              <JobRow data={jobs} />
            ) : (
              <tr>
                <td colSpan="6">
                  <CircleLoading data="Jobs" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const JobTable = ({ page, limit }) => {
  return <PaginatedJob page={page} limit={limit} />;
};

export default JobTable;
