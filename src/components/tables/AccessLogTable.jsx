import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import logApi from "../../api/log";
import helper from "../../helper";
import CircleLoading from "../ui/CircleLoading";

const AccessLogRow = ({ data }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td>{helper.getHumanReadableDatetime(data.time)}</td>
      <td>
        <span className="py-1 px-3 rounded-full text-xs bg-green-200 text-green-600">
          {data.level}
        </span>
      </td>
      <td>{data.message}</td>
      <td>
        <span className="py-1 px-3 rounded-full text-xs bg-yellow-200 text-yellow-600">
          {data.server}
        </span>{" "}
        {data.urlPath}
      </td>
      <td className="text-center">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
          {data.httpMethod}
        </span>
      </td>
      <td className="text-center">
        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
          {data.httpStatus}
        </span>
      </td>
    </tr>
  );
};

const SortIcon = ({ column, sort, onSort }) => {
  const sortIcon = sort.column === column ? sort.order : "none";
  return (
    <span onClick={() => onSort(column)}>
      {sortIcon === "asc" ? (
        <BsChevronUp className="w-3 h-3 inline-block cursor-pointer" />
      ) : sortIcon === "desc" ? (
        <BsChevronDown className="w-3 h-3 inline-block cursor-pointer" />
      ) : (
        <BsChevronDown className="w-3 h-3 inline-block cursor-pointer" />
      )}
    </span>
  );
};

const PaginatedAccessLog = ({ data }) => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(data.page);
  const [pageCount, setPageCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef(null);
  const [search, setSearch] = useState(data.search);
  const [sort, setSort] = useState({ column: data.sort, order: data.order });
  // show items per page state
  const [showPerPageOptions] = useState([5, 10, 15, 20]); // allowed options for showPerPage
  const [showPerPage, setShowPerPage] = useState(data.limit);

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchLogs = async (pag, lim, ser) => {
    const response = await logApi.getAllAccessLog(pag, lim, ser);
    return response;
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

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    searchParams.set("page", selectedPage);
    setSearchParams(searchParams);
  };

  const handleSortChange = (column) => {
    const order =
      sort.column === column && sort.order === "asc" ? "desc" : "asc";
    setSort({ column, order });
    const sortedLogs = logs.sort((a, b) => {
      if (a[column] < b[column]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
    setLogs(sortedLogs);
    searchParams.set("sort", column); // set means if exist or not, it will be updated / added
    searchParams.set("order", order);
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchLogs(currentPage, showPerPage, search);
      setLogs(res.data.data);
      setPageCount(res.data.totalPage);
      setTotalData(res.data.totalData);
      setIsLoading(false);
    };
    fetchData();

    return () => {
      setLogs([]);
      setIsLoading(true);
    };
  }, [currentPage, showPerPage, search]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700">Access Logs</h2>
          <p className="text-sm text-gray-600">List of all access logs</p>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex flex-wrap">
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
                  placeholder="Search logs"
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-full">
        <table className="table table-striped table-hover w-full">
          <thead>
            <tr>
              <th>
                Time{" "}
                <SortIcon column="time" sort={sort} onSort={handleSortChange} />
              </th>
              <th>
                Level{" "}
                <SortIcon
                  column="level"
                  sort={sort}
                  onSort={handleSortChange}
                />
              </th>
              <th>
                Message{" "}
                <SortIcon
                  column="message"
                  sort={sort}
                  onSort={handleSortChange}
                />
              </th>
              <th>
                URL{" "}
                <SortIcon column="url" sort={sort} onSort={handleSortChange} />
              </th>
              <th>
                Method{" "}
                <SortIcon
                  column="httpMethod"
                  sort={sort}
                  onSort={handleSortChange}
                />
              </th>
              <th>
                Status{" "}
                <SortIcon
                  column="httpStatus"
                  sort={sort}
                  onSort={handleSortChange}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              logs.length > 0 ? (
                logs.map((log) => <AccessLogRow data={log} />)
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No logs found
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  <CircleLoading data="logs" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const AccessLogTable = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <PaginatedAccessLog data={data} />
    </motion.div>
  );
};

export default AccessLogTable;
