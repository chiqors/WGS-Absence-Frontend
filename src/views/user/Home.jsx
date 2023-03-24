import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import attendanceApi from "../../api/attendance";
import dutyApi from "../../api/duty";
import employee from "../../api/employee";
import helper from "../../helper.js";

const Home = () => {
  const [dutyList, setDutyList] = useState([]);
  const [prevDutyList, setPrevDutyList] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [finishedAttendance, setFinishedAttendance] = useState(false);
  const [dutyStatus, setDutyStatus] = useState("assigned");
  const [dutyId, setDutyId] = useState(0);
  const [noteIn, setNoteIn] = useState("");
  const [noteOut, setNoteOut] = useState("");
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
      setDutyId(0);
      setError(null);
      setSuccess(null);
      setLoading(true);
    };
  }, []);

  const handleOnDutyChange = (e) => {
    setDutyId(e.target.value);
  };

  const handleClockIn = async (e) => {
    e.preventDefault();
    console.log("clock in");

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
  };

  const handleClockOut = async (e) => {
    e.preventDefault();
    console.log("clock out");

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
  };

  return (
    <>
      {/* split into 2 cols */}
      {/* if mobile screen, just split vertically */}
      <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-2 mt-5 mx-5">
        <div className="lg:col-span-2 flex flex-col items-center">
          <div className="card w-96 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Absence!</h2>

              {error && (
                <div className="alert alert-error">
                  <div className="flex-1">
                    <label className="cursor-pointer select-none">
                      {error}
                    </label>
                  </div>
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  <div className="flex-1">
                    <label className="cursor-pointer select-none">
                      {success}
                    </label>
                  </div>
                </div>
              )}

              {!loading ? (
                <>
                  {!finishedAttendance ? (
                    <>
                      {!attendanceStatus ? (
                        <form onSubmit={handleClockIn}>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Task Name</span>
                            </label>
                            <select
                              id="duty_id"
                              className="select select-bordered w-full max-w-xs"
                              name="duty_id"
                              onChange={handleOnDutyChange}
                              value={dutyId}
                            >
                              <option value="">-- Select Duty --</option>
                              {dutyList.map((duty) => (
                                <option key={duty.id} value={duty.id}>
                                  {duty.name + " "}
                                  <br />
                                  {/* if there's attendance */}
                                  {duty.attendance ? (
                                    <span className="text-xs text-gray-500">
                                      |{" "}
                                      {helper.getHumanReadableDate(
                                        duty.attendance[0].time_in
                                      )}
                                      {" | "}
                                      {duty.attendance[0].employee.full_name}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-500">
                                      | Not Assigned
                                    </span>
                                  )}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Note In</span>
                            </label>
                            <textarea
                              className="textarea h-24 textarea-bordered"
                              placeholder="Note In"
                              name="note_in"
                              onChange={(e) => setNoteIn(e.target.value)}
                              value={noteIn}
                            ></textarea>
                          </div>
                          <p className="mb-3 text-base text-gray-500">
                            You have not clocked in yet today.
                          </p>
                          <div className="mb-4">
                            <button className="btn btn-primary" type="submit">
                              Clock In
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleClockOut}>
                          <p className="mb-3 text-base text-gray-500">
                            You have not clocked out yet today.
                          </p>
                          {/* select box with duty status */}
                          <div className="mb-4">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Task Status</span>
                              </label>
                              <select
                                className="select select-bordered"
                                name="duty_status"
                                onChange={(e) => setDutyStatus(e.target.value)}
                                value={dutyStatus}
                              >
                                <option value="">-- Select Status --</option>
                                <option value="assigned">Assigned</option>
                                <option value="need_discussion">
                                  Need Discussion
                                </option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Note Out</span>
                              </label>
                              <textarea
                                className="textarea h-24 textarea-bordered"
                                placeholder="Note Out"
                                name="note_out"
                                onChange={(e) => setNoteOut(e.target.value)}
                                value={noteOut}
                              ></textarea>
                            </div>
                          </div>
                          <div className="mb-4">
                            <button className="btn btn-primary" type="submit">
                              Clock Out
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  ) : (
                    <p className="mb-3 text-base text-gray-500">
                      You have finished your attendance for today.
                    </p>
                  )}
                </>
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
          <div className="card w-full p-4 shadow sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900">
                Previous Assigned
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View all (WIP)
              </a>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex flex-col space-y-2">
                    {prevDutyList.map((attenance) => (
                      <div key={attenance.id}>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {attenance.duty.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {helper.getHumanReadableDate(attenance.time_in)}
                          {" - "}
                          {helper.getHumanReadableDate(attenance.time_out)}
                        </p>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
