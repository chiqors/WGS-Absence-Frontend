import { useState } from "react";

const CheckOutForm = ({ onSubmit, data }) => {
  const [dutyStatus, setDutyStatus] = useState("");
  const [noteOut, setNoteOut] = useState("");

  const handleClockOut = (e) => {
    e.preventDefault();
    onSubmit(dutyStatus, noteOut);
  };

  return (
    <form onSubmit={handleClockOut}>
      <p className="mb-3 text-base text-gray-500">
        You are currently assigned to <b>{data.name}</b> duty.
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
            <option value="need_discussion">Need Discussion</option>
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
  );
};

export default CheckOutForm;
