import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dashboardApi from "../../api/dashboard";
import AdminCards from "../../components/dashboard/AdminCards";
import AttendancePieChart from "../../components/dashboard/AttendancePieChart";
import AvgAttendLineGraph from "../../components/dashboard/AvgAttendLineGraph";
import TopAttendTable from "../../components/dashboard/TopAttendTable";

const Dashboard = () => {
  const [cardsData, setCardsData] = useState(null);
  const [topAttendees, setTopAttendees] = useState(null);
  const [avgAttendances, setAvgAttendances] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardCards = async () => {
    try {
      const res = await dashboardApi.getDashboardCards();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopAttendees = async () => {
    try {
      const res = await dashboardApi.getTopAttendances();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvgAttendances = async () => {
    try {
      const res = await dashboardApi.getAvgAttendances();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardCards().then((res) => {
      setCardsData(res);
      setIsLoading(false);
    });
    fetchTopAttendees().then((res) => {
      setTopAttendees(res);
    });
    fetchAvgAttendances().then((res) => {
      setAvgAttendances(res);
    });
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col">
          <AdminCards data={cardsData} />
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="flex flex-col justify-center w-full">
                <h3 className="text-xl font-semibold text-gray-700">
                  Percentage of Attendance
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  Including both present and absent
                </p>
                {avgAttendances ? (
                  <AttendancePieChart data={avgAttendances} />
                ) : (
                  <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg md:col-span-2"
            >
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-700">
                  Average Attendances
                </h3>
                {avgAttendances ? (
                  <AvgAttendLineGraph
                    data={avgAttendances.data}
                    avgData={avgAttendances.approx_present}
                  />
                ) : (
                  <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                )}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-col mt-4"
          >
            <h3 className="text-xl font-semibold text-gray-700">
              Top Attendees
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Top 5 attendees of the month
            </p>
            {topAttendees ? (
              <TopAttendTable data={topAttendees} />
            ) : (
              <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
