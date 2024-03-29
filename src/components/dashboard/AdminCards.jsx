import { motion } from "framer-motion";
import { BsListCheck, BsPeopleFill } from "react-icons/bs";
import { SiTask } from "react-icons/si";
import { Link } from "react-router-dom";

const AdminCards = ({ data }) => {
  const dashboardData = data;

  return (
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 xl:grid-cols-4">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
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
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md"
      >
        <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
          <BsListCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600">Total Duty</p>
          <p className="text-lg font-semibold text-gray-700">
            {dashboardData.totalDuty} Assigned
            <br />
            {dashboardData.totalDutyNotAssigned} Unassigned
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md"
      >
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
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer"
      >
        <Link to="/admin/job" className="inline-flex">
          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
            <BsListCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Total Jobs</p>
            <p className="text-lg font-semibold text-gray-700">
              {dashboardData.totalJob} Jobs
            </p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default AdminCards;
