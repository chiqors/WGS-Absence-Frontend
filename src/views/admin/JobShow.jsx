import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import jobApi from "../../api/job";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import CircleLoading from "../../components/ui/CircleLoading";
import helper from "../../helper.js";

const JobShow = () => {
  const [job, setJob] = useState(null);
  const [duty, setDuty] = useState(null);
  const { id } = useParams();
  const listMenu = [
    {
      title: "Job List",
      href: "/admin/job",
    },
    {
      title: "Job Detail",
      href: `/admin/job/show/${id}`,
    },
  ];

  const fetchJob = async () => {
    const response = await jobApi.getJobById(id);
    return response.data;
  };

  const fetchDutyAttendanceAndEmployee = async (id) => {
    const response = await jobApi.getDutyAttendanceAndEmployee(id);
    return response.data;
  };

  useEffect(() => {
    if (id) {
      fetchJob().then((data) => {
        setJob(data);
        fetchDutyAttendanceAndEmployee(id).then((data) => {
          setDuty(data);
        });
      });
    }
    return () => {
      setJob(null);
      setDuty(null);
    };
  }, [id]);

  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="card shadow-md">
            <div className="card-body">
              <h1 className="text-3xl font-bold mb-3">Job Detail: {id}</h1>

              <AdminBreadcrumb items={listMenu} />
              {job ? (
                <>
                  <div className="flex flex-col divide-y">
                    <div className="flex flex-row">
                      <div className="w-1/3">Job ID</div>
                      <div className="w-2/3">{job.id}</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Job Name</div>
                      <div className="w-2/3">{job.name}</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Job Description</div>
                      <div className="w-2/3">{job.description}</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Created At</div>
                      <div className="w-2/3">
                        {helper.getHumanReadableDate(job.created_at)}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/admin/job/show/${id}/duty/create`}
                    className="btn btn-primary mt-3"
                  >
                    Create Duty
                  </Link>
                </>
              ) : (
                <CircleLoading />
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="card shadow-md">
            <div className="card-body">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Duty Name</th>
                    <th className="px-4 py-2">Last Worker</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {duty ? (
                    duty.map((duty) => (
                      <tr key={duty.id}>
                        <td className="border px-4 py-2">{duty.id}</td>
                        <td className="border px-4 py-2">
                          {duty.name}
                          <br />
                          <span
                            className={
                              "badge" +
                              (duty.status === "completed"
                                ? " badge-success"
                                : " badge-warning")
                            }
                          >
                            {duty.status}
                          </span>
                        </td>
                        {duty.attendance.length > 0 ? (
                          <td className="border px-4 py-2">
                            {duty.attendance[0].employee.full_name}
                            <br />
                            <span className="badge badge-info">
                              {helper.getHumanReadableDate(duty.updated_at)}
                            </span>
                          </td>
                        ) : (
                          <td className="border px-4 py-2">No Worker Yet</td>
                        )}
                        <td className="border px-4 py-2">
                          <Link
                            to={`/admin/job/show/${id}/duty/edit/${duty.id}`}
                            className="btn btn-sm btn-warning mr-2"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/admin/job/show/${id}/duty/show/${duty.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2">
                        <CircleLoading />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobShow;
