import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AccessLogTable from "../../components/tables/AccessLogTable";
import ErrorLogTable from "../../components/tables/ErrorLogTable";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";

const Log = () => {
  const listMenu = [
    {
      title: "Log List",
      href: "/admin/log",
    },
  ];
  // example url http://localhost:5173/admin/log?sort=name&order=asc&page=1&limit=15&search=ffwef
  // url query: sort, order, page, limit, search
  const tableData = {
    page: 1,
    limit: 5,
    sort: "time",
    order: "desc",
    search: "",
  };
  const [tab, setTab] = useState("error");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const limit = parseInt(searchParams.get("limit"));
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const search = searchParams.get("search");
  if (page) tableData.page = page;
  if (limit) tableData.limit = limit;
  if (sort) tableData.sort = sort;
  if (order) tableData.order = order;
  if (search) tableData.search = search;

  const handleTab = (tab) => {
    // reset url query
    if (searchParams.has("page")) searchParams.delete("page");
    setTab(tab);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-700">Logs</h2>
            <p className="text-sm font-medium text-gray-600">
              Logs of all activities
            </p>
            <AdminBreadcrumb items={listMenu} />
          </div>
        </div>
        {/* divider */}
        <div className="flex flex-row border-b border-gray-200 mt-4"></div>
        <div className="flex flex-row mt-4 space-x-2 border-b-2 border-gray-200">
          <button
            className={`btn btn-ghost btn-sm ${
              tab === "error" ? "btn-active" : ""
            }`}
            onClick={() => handleTab("error")}
          >
            Error Log
          </button>
          <button
            className={`btn btn-ghost btn-sm ${
              tab === "access" ? "btn-active" : ""
            }`}
            onClick={() => handleTab("access")}
          >
            Access Log
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <AnimatePresence mode="out-in">
            {tab === "error" && <ErrorLogTable data={tableData} />}
            {tab === "access" && <AccessLogTable data={tableData} />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Log;
