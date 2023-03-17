import { useState } from "react";
import { BsListCheck, BsPeopleFill } from "react-icons/bs";
import { SiTask } from "react-icons/si";
import helper from "../../helper";
import { readLog } from "../../utils/fileSystem";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  const handleUploadLog = (e) => {
    e.preventDefault();
    // get the file
    const file = e.target.files[0];
    // read the log file
    readLog(file).then((res) => {
      setLogs(res);
    });
  };

  return (
    <>
      <div className="flex flex-col">
        {/* <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <select className="select select-secondary w-full max-w-xs">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
        </div> */}
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
              <BsPeopleFill className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Attendance (Today)
              </p>
              <p className="text-lg font-semibold text-gray-700">
                10 Attended
                <br />2 Absent
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <BsListCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total Duty
              </p>
              <p className="text-lg font-semibold text-gray-700">
                10 Assigned
                <br />2 Unassigned
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
              <SiTask className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Status Duty (Yesterday)
              </p>
              <p className="text-lg font-semibold text-gray-700">5 Completed</p>
              <p className="text-lg font-semibold text-gray-700">1 Need Help</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <BsListCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total Jobs
              </p>
              <p className="text-lg font-semibold text-gray-700">10 Jobs</p>
            </div>
          </div>
        </div>
        {/* logs with full col width containing table logs */}
        <div className="flex flex-col mt-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700">Logs</h2>

              <p className="text-sm font-medium text-gray-600">
                Logs of all activities
              </p>
            </div>
            <div className="flex flex-col">
              {/* <select className="select select-secondary w-full max-w-xs">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select> */}
              {/* make a form for upload log file only */}
              <input
                type="file"
                className="file-input file-input-bordered file-input-info file-input-sm w-full max-w-xs"
                onChange={handleUploadLog}
              />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr
                    className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Activity</th>
                    <th className="px-4 py-3">User</th>
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y"
                  style={{ fontSize: "0.875rem" }}
                >
                  {/* <tr className="text-gray-700">
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">10/10/2021</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">10:00 AM</td>
                    <td className="px-4 py-3 text-sm">Login</td>
                    <td className="px-4 py-3 text-sm">Admin</td>
                  </tr> */}
                  {logs.map((log) => (
                    <tr className="text-gray-700">
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold">
                              {helper.getHumanReadableDate(log.timestamp)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {helper.getHumanReadableTime(log.timestamp)}
                      </td>
                      <td className="px-4 py-3 text-sm">{log.activity}</td>
                      <td className="px-4 py-3 text-sm">
                        {log.user.full_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
