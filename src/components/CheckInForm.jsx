import { useState } from "react";
import helper from "../helper.js";

const CheckInForm = ({ onSubmit, data }) => {
  const [dutyId, setDutyId] = useState(0);
  const [noteIn, setNoteIn] = useState("");

  const handleCheckIn = async (e) => {
    e.preventDefault();
    onSubmit(parseInt(dutyId), noteIn);
  };

  return (
    <form onSubmit={handleCheckIn}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Task Name</span>
        </label>
        <select
          id="duty_id"
          className="select select-bordered w-full max-w-xs"
          name="duty_id"
          onChange={(e) => setDutyId(e.target.value)}
          value={dutyId}
        >
          <option value="">-- Select Duty --</option>
          {data.map((duty) => (
            <option key={duty.id} value={duty.id}>
              {duty.name + " "}
              <br />
              {/* if there's attendance */}
              {duty.attendance ? (
                <span className="text-xs text-gray-500">
                  | {helper.getHumanReadableDate(duty.attendance[0].time_in)}
                  {" | "}
                  {duty.attendance[0].employee.full_name}
                </span>
              ) : (
                <span className="text-xs text-gray-500">| Not Assigned</span>
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
  );
};

export default CheckInForm;
