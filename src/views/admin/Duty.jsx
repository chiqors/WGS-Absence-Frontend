import { Link, useSearchParams } from "react-router-dom";
import DutyTable from "../../components/tables/DutyTable";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";

const Duty = () => {
  const listMenu = [
    {
      title: "Duty List",
      href: "/admin/duty",
    },
  ];
  // example url http://localhost:5173/admin/duty?sort=name&order=asc&page=1&limit=15&job_id=189&status=not_assigned&updated_at=this_week&search=ffwef
  // url query: sort, order, page, limit, job_id, status, updated_at, search
  const tableData = {
    page: 1,
    limit: 5,
    sort: "id",
    order: "desc",
    job_id: "",
    status: "",
    updated_at: "",
    search: "",
  };
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const limit = parseInt(searchParams.get("limit"));
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const job_id = searchParams.get("job_id");
  const status = searchParams.get("status");
  const updated_at = searchParams.get("updated_at");
  const search = searchParams.get("search");
  if (page) tableData.page = page;
  if (limit) tableData.limit = limit;
  if (sort) tableData.sort = sort;
  if (order) tableData.order = order;
  if (job_id) tableData.job_id = job_id;
  if (status) tableData.status = status;
  if (updated_at) tableData.updated_at = updated_at;
  if (search) tableData.search = search;

  return (
    <div className="container">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <h1 className="text-2xl font-bold">Duty List</h1>
        </div>
        <div className="flex">
          <Link to="/admin/duty/create" className="btn btn-primary">
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2">Add Duty</span>
          </Link>
        </div>
      </div>
      <div className="my-3">
        <AdminBreadcrumb items={listMenu} />
      </div>
      <DutyTable data={tableData} />
    </div>
  );
};

export default Duty;
