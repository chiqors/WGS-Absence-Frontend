import { useEffect, useState } from "react";
import { BsListCheck, BsPeopleFill } from "react-icons/bs";
import { SiTask } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import dashboardApi from "../../api/dashboard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const res = await dashboardApi.getDashboardData();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    fetchDashboardData().then((res) => {
      setDashboardData(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col">
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
                  {dashboardData.totalAttendees} Attended
                  <br />
                  {dashboardData.totalAbsent} Absent
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
                  {dashboardData.totalDuty} Assigned
                  <br />
                  {dashboardData.totalDutyNotAssigned} Unassigned
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
                <p className="text-lg font-semibold text-gray-700">
                  {dashboardData.totalDutyCompleted} Completed
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {dashboardData.totalDutyNeedDiscussion} Need Help
                </p>
              </div>
            </div>
            <div
              className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer"
              onClick={() => navigateTo("/admin/job")}
            >
              <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                <BsListCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Total Jobs
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {dashboardData.totalJob} Jobs
                </p>
              </div>
            </div>
          </div>
          {/* logs with full col width containing table logs */}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
