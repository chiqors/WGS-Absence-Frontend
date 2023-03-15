import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useSearchParams } from "react-router-dom";
import dutyApi from "../api/duty";
import helper from "../helper";
import CircleLoading from "./ui/CircleLoading";

const DutyRow = ({ data }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>
        {data.name}
        <br />
        <span className="badge badge-primary">{data.job.name}</span>
      </td>
      <td>{helper.getDurationType(data.duration_type)}</td>
      <td>
        <span
          className={`badge badge-${helper.getHumanReadableStatusColor(
            data.status
          )}`}
        >
          {helper.getHumanReadableStatus(data.status)}
        </span>
      </td>
      <td>
        Created at: {helper.getHumanReadableDate(data.created_at)}
        <br />
        Updated at: {helper.getHumanReadableDate(data.updated_at)}
      </td>
      <td>
        <Link
          to={`/admin/duty/show/${data.id}`}
          className="btn btn-sm btn-info mr-2"
          title="Details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
        <Link
          to={`/admin/duty/edit/${data.id}`}
          className="btn btn-sm btn-warning"
          title="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </td>
    </tr>
  );
};

const SortIcon = ({ column, sort, onSort }) => {
  const sortIcon = sort.column === column ? sort.order : "none";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 inline-block cursor-pointer"
      onClick={() => onSort(column)}
    >
      {sortIcon === "asc" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      ) : sortIcon === "desc" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
      )}
    </svg>
  );
};

const PaginatedDuty = ({ data }) => {
  const [duties, setDuties] = useState([]);
  const [currentPage, setCurrentPage] = useState(data.page);
  const [pageCount, setPageCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // search params
  const [searchParams, setSearchParams] = useSearchParams();
  // dynamic filters
  const [jobs, setJobs] = useState([]);
  // filters
  const [filters, setFilters] = useState({
    job_id: data.job_id,
    status: data.status,
    updated_at: data.updated_at,
  });
  // search duty name
  const searchRef = useRef("");
  const [search, setSearch] = useState(data.search);
  // sort state, {column: 'name', order: 'asc'}
  // only one column can be sorted at a time
  const [sort, setSort] = useState({ column: data.sort, order: data.order });
  // show items per page state
  const [showPerPageOptions] = useState([5, 10, 15, 20]); // allowed options for showPerPage
  const [showPerPage, setShowPerPage] = useState(data.limit);

  const fetchDuties = async () => {
    const response = await dutyApi.getAllDuties(
      currentPage,
      showPerPage,
      filters,
      search
    );
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDuties().then((response) => {
        setDuties(response.data);
        setJobs(response.dynamic_filter.jobs);
        setPageCount(response.total_page);
        setTotalData(response.total_data);
        setIsLoading(false);
      });
    };
    // if showPerPage is not in showPerPageOptions, set it to 5
    if (!showPerPageOptions.includes(data.limit)) {
      data.limit = 5;
      searchParams.set("limit", 5);
      setSearchParams(searchParams);
    }
    fetchData();

    return () => {
      setDuties([]);
      // setJobs([]); there's no need to reset jobs
      // setShowPerPage(5); there's no need to reset showPerPage
      // setPageCount(0); there's no need to reset pageCount
      setIsLoading(true);
    };
  }, [currentPage, filters, search, showPerPage]);

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    searchParams.set("page", selectedPage);
    setSearchParams(searchParams);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value || "" });
    if (searchParams.has(name)) {
      searchParams.set(name, value);
    } else if (value) {
      searchParams.append(name, value);
    } else {
      searchParams.delete(name);
    }
    if (searchParams.has("page")) {
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  };

  const handleBtnSearchChange = (e) => {
    e.preventDefault();
    setSearch(searchRef.current.value);
    if (searchRef.current.value) {
      searchParams.append("search", searchRef.current.value);
    } else {
      searchParams.delete("search");
    }
    if (searchParams.has("page")) {
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (column) => {
    const order =
      sort.column === column && sort.order === "asc" ? "desc" : "asc";
    setSort({ column, order });
    // sort duties
    const sortedDuties = duties.sort((a, b) => {
      if (a[column] < b[column]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
    setDuties(sortedDuties);
    if (searchParams.has("sort")) {
      searchParams.set("sort", column);
    } else {
      searchParams.append("sort", column);
    }
    if (searchParams.has("order")) {
      searchParams.set("order", order);
    } else {
      searchParams.append("order", order);
    }
    setSearchParams(searchParams);
  };

  const handleShowPerPageChange = (event) => {
    const { value } = event.target;
    // check if value is in allowed options
    if (showPerPageOptions.includes(parseInt(value))) {
      setShowPerPage(parseInt(value));
      if (searchParams.has("limit")) {
        searchParams.set("limit", value);
      } else {
        searchParams.append("limit", value);
      }
    } else {
      setShowPerPage(5);
      if (searchParams.has("limit")) {
        searchParams.delete("limit");
      }
    }
    if (searchParams.has("page")) {
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex flex-wrap">
          <div className="mr-4">
            <select
              name="job_id"
              id="job_id"
              className="select select-bordered select-sm"
              onChange={handleFilterChange}
              value={filters.job_id}
            >
              <option value="">All Jobs</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mr-4">
            <select
              name="status"
              id="status"
              className="select select-bordered select-sm"
              onChange={handleFilterChange}
              value={filters.status}
            >
              <option value="">All Status</option>
              <option value="not_assigned">Not Assigned</option>
              <option value="assigned">Assigned</option>
              <option value="need_discussion">Need Discussion</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mr-4">
            <select
              name="updated_at"
              id="updated_at"
              className="select select-bordered select-sm"
              onChange={handleFilterChange}
              value={filters.updated_at}
            >
              <option value="">All Days</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="this_year">This Year</option>
            </select>
          </div>
          <div className="mr-4">
            <select
              name="show_per_page"
              id="show_per_page"
              className="select select-bordered select-sm"
              onChange={handleShowPerPageChange}
              value={showPerPage}
            >
              {showPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} Items
                </option>
              ))}
            </select>
          </div>
          <div className="mr-4">
            <form onSubmit={handleBtnSearchChange}>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  placeholder="Search duty name"
                  className="input input-bordered input-sm"
                  name="search"
                  id="search"
                  ref={searchRef}
                  defaultValue={search}
                />
                <button className="btn btn-primary btn-sm" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <ReactPaginate
          className="flex mb-4"
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageClassName="page-item"
          pageLinkClassName="btn btn-outline rounded-none btn-sm"
          previousClassName="page-item"
          previousLinkClassName="btn rounded-none btn-sm"
          nextClassName="page-item"
          nextLinkClassName="btn rounded-none btn-sm"
          breakClassName="page-item"
          breakLinkClassName="btn btn-outline btn-sm"
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="table table-striped table-hover w-full">
          <thead>
            <tr>
              <th>
                ID #{" "}
                <SortIcon column="id" sort={sort} onSort={handleSortChange} />
              </th>
              <th>
                Name{" "}
                <SortIcon column="name" sort={sort} onSort={handleSortChange} />
              </th>
              <th>
                Duration Type{" "}
                <SortIcon
                  column="duration_type"
                  sort={sort}
                  onSort={handleSortChange}
                />
              </th>
              <th>
                Status{" "}
                <SortIcon
                  column="status"
                  sort={sort}
                  onSort={handleSortChange}
                />
              </th>
              <th>
                Time{" "}
                <SortIcon
                  column="updated_at"
                  sort={sort}
                  onSort={handleSortChange}
                />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              duties.length > 0 ? (
                duties.map((duty) => <DutyRow key={duty.id} data={duty} />)
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No duties found
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="4">
                  <CircleLoading data="duties" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <span className="text-sm text-gray-500">
          Showing {currentPage * showPerPage - showPerPage + 1} to{" "}
          {currentPage * showPerPage > totalData
            ? totalData
            : currentPage * showPerPage}{" "}
          of {totalData} duties
        </span>
      </div>
    </>
  );
};

const DutyTable = ({ data }) => {
  return <PaginatedDuty data={data} />;
};

export default DutyTable;
