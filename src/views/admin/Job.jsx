import { useSearchParams } from "react-router-dom";
import JobTable from "../../components/JobTable";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";

const Job = () => {
  const tableData = {
    page: 1,
    limit: 5,
  };
  const listMenu = [
    {
      title: "Job List",
      href: "/admin/job",
    },
  ];
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  if (page) {
    tableData.page = page;
  }
  if (limit) {
    tableData.limit = limit;
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-3">Job List</h1>
      <div className="my-3">
        <AdminBreadcrumb items={listMenu} />
      </div>
      <JobTable page={tableData.page} limit={tableData.limit} />
    </div>
  );
};

export default Job;
