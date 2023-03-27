import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import attendanceApi from "../../api/attendance";
import dutyApi from "../../api/duty";
import employee from "../../api/employee";
import CheckInForm from "../../components/CheckInForm";
import CheckOutForm from "../../components/CheckOutForm";
import PrevDutyList from "../../components/PrevDutyList";
import UserErrorAlert from "../../components/ui/UserErrorAlert";
import UserSuccessAlert from "../../components/ui/UserSuccessAlert";

const Home = () => {
  const [dutyList, setDutyList] = useState([]);
  const [prevDutyList, setPrevDutyList] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [finishedAttendance, setFinishedAttendance] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userData = jwtDecode(token);

  const fetchDutyList = async (job_id) => {
    const response = await dutyApi.getAllDutyNotAssignedWithJobId(job_id);
    return response.data;
  };

  const fetchPrevDutyNotCompleted = async (job_id) => {
    const response = await attendanceApi.getAllDutyNotCompletedWithJobId(
      job_id
    );
    return response.data;
  };

  const fetchPrevDutyList = async () => {
    const response =
      await attendanceApi.getAllLatestAttendanceWithDutyForEmployeeId(
        userData.employee_id
      );
    return response.data;
  };

  const fetchAttendanceStatus = async () => {
    const response = await attendanceApi.isEmployeeClockedIn({
      employee_id: userData.employee_id,
    });
    if (response.data) {
      setAttendanceStatus(true);
      if (response.data.time_out) {
        setFinishedAttendance(true);
      }
    }
  };

  const fetchJobId = async () => {
    const response = await employee.getEmployeeById(userData.employee_id);
    return response.data.job_id;
  };

  const fetchCheckIfDutyIsAlreadyAssignedToday = async (duty_id) => {
    const response = await attendanceApi.isDutyAlreadyAssignedToday(duty_id);
    return response.data;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchAttendanceStatus();
      const jobIdFetch = await fetchJobId();
      const dutyListFetch = await fetchDutyList(jobIdFetch);
      setDutyList(dutyListFetch);
      const prevDutyNotCompletedFetch = await fetchPrevDutyNotCompleted(
        jobIdFetch
      );
      prevDutyNotCompletedFetch.forEach((duty) => {
        // check if the duty is already exist in the duty list
        const isDutyExist = dutyList.some(
          (dutyList) => dutyList.id === duty.id
        );
        if (!isDutyExist) {
          setDutyList((prev) => [...prev, duty]);
        }
      });
      const prevDutyListFetch = await fetchPrevDutyList();
      setPrevDutyList(prevDutyListFetch);
    };

    if (loading) {
      fetchAllData().then(() => {
        setLoading(false);
      });
    }

    return () => {
      setDutyList([]);
      setPrevDutyList([]);
      setAttendanceStatus(false);
      setFinishedAttendance(false);
      setError(null);
      setSuccess(null);
      setLoading(true);
    };
  }, []);

  const handleClockIn = useCallback(async (dutyId, noteIn) => {
    const datetime_in = new Date().toISOString();
    const isDutyAlreadyAssignedToday =
      await fetchCheckIfDutyIsAlreadyAssignedToday(dutyId);
    if (!isDutyAlreadyAssignedToday) {
      const payload = {
        employee_id: userData.employee_id,
        duty_id: dutyId,
        time_in: datetime_in,
        note_in: noteIn,
      };
      try {
        await attendanceApi.checkIn(payload);
        setAttendanceStatus(true);
        setTimeout(() => {
          setLoading(true);
        }, 5000);
        setSuccess("Clock in success, you may continue your work");
      } catch (error) {
        setError(error.message);
        console.log("Failed to clock in: ", error);
      }
    } else {
      setError("Someone has already been assigned to this duty today");
    }
  });

  const handleClockOut = useCallback(async (dutyStatus, noteOut) => {
    const datetime_out = new Date().toISOString();
    const payload = {
      employee_id: userData.employee_id,
      time_out: datetime_out,
      status: dutyStatus,
      note_out: noteOut,
    };
    try {
      await attendanceApi.checkOut(payload);
      setFinishedAttendance(true);
      setSuccess("Clock out success, you may take a break for today");
    } catch (error) {
      setError(error.message);
      console.log("Failed to clock out: ", error);
    }
  });

  return (
    <>
      {/* split into 2 cols */}
      {/* if mobile screen, just split vertically */}
      <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-2 mt-5 mx-5">
        <div className="lg:col-span-2 flex flex-col items-center">
          <div className="card w-96 bg-white shadow-md rounded-md overflow-hidden">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Absence!</h2>
              {error && <UserErrorAlert message={error} />}
              {success && <UserSuccessAlert message={success} />}
              {!loading ? (
                !finishedAttendance ? (
                  !attendanceStatus ? (
                    <CheckInForm onSubmit={handleClockIn} data={dutyList} />
                  ) : (
                    <CheckOutForm onSubmit={handleClockOut} />
                  )
                ) : (
                  <p className="mb-3 text-base text-gray-500">
                    You have finished your attendance for today.
                  </p>
                )
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-2 border-gray-500 rounded-full border-dashed animate-spin"></div>
                  <p className="mb-3 text-base text-gray-500">
                    Loading your attendance status...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <PrevDutyList data={prevDutyList} />
        </div>
      </div>
    </>
  );
};

export default Home;
