import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dutyApi from "../../api/duty";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import CircleLoading from "../../components/ui/CircleLoading";
import helper from "../../helper.js";

const JobDutyShow = () => {
  const { id, dutyId } = useParams();
  const [duty, setDuty] = useState(null);
  const [loading, setLoading] = useState(true);
  const listMenu = [
    {
      title: "Job List",
      href: "/admin/job",
    },
    {
      title: "Job Detail",
      href: `/admin/job/show/${id}`,
    },
    {
      title: "Duty Detail",
      href: `/admin/job/show/${id}/duty/show/${dutyId}`,
    },
  ];

  const fetchDutyAttendanceAndEmployee = async (id) => {
    const response = await dutyApi.getDutyAttendanceAndEmployeeById(id);
    return response.data;
  };

  useEffect(() => {
    if (dutyId) {
      fetchDutyAttendanceAndEmployee(dutyId).then((data) => {
        console.log(data);
        setDuty(data);
        setLoading(false);
      });
    }
    return () => {
      setDuty(null);
      setLoading(true);
    };
  }, [dutyId]);

  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="card shadow-md">
            <div className="card-body">
              <h1 className="text-3xl font-bold mb-3">Duty Detail: {dutyId}</h1>

              <AdminBreadcrumb items={listMenu} />
              {duty ? (
                <>
                  <div className="flex flex-col divide-y">
                    <div className="flex flex-row">
                      <div className="w-1/3">Duty ID</div>
                      <div className="w-2/3">{duty.id}</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Duty Name</div>
                      <div className="w-2/3">{duty.name}</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Duty Description</div>
                      <div className="w-2/3">{duty.description}</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Status</div>
                      <div className="w-2/3">
                        <span
                          className={`badge badge-${helper.getHumanReadableStatusColor(
                            duty.status
                          )}`}
                        >
                          {helper.getHumanReadableStatus(duty.status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Created At</div>
                      <div className="w-2/3">
                        {helper.getHumanReadableDate(duty.created_at)}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/3">Updated At</div>
                      <div className="w-2/3">
                        {helper.getHumanReadableDate(duty.updated_at)}
                      </div>
                    </div>
                  </div>
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
                    <th className="px-4 py-2">Last Worker</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Note Out</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    duty?.attendance.length > 0 ? (
                      duty?.duty_attendance?.map((dutyAttendance) => (
                        <tr key={dutyAttendance.id}>
                          <td className="border px-4 py-2">
                            {dutyAttendance.id}
                          </td>
                          <td className="border px-4 py-2">
                            {dutyAttendance.employee.name}
                          </td>
                          <td className="border px-4 py-2">
                            {helper.getHumanReadableDate(
                              dutyAttendance.time_in
                            )}
                            <br />
                            {helper.getHumanReadableDate(
                              dutyAttendance.time_out
                            )}
                          </td>
                          <td className="border px-4 py-2">
                            {dutyAttendance.note_out}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data found
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="4">
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

export default JobDutyShow;
