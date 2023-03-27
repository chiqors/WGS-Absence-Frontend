const AdminErrorAlert = (props) => {
  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => props.onClose()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold text-white">Error occured</h3>
          <span className="text-xs">
            You have {props.error.length} messages
          </span>
        </div>
      </div>
      <div className="flex-none">
        <label htmlFor="my-modal-6" className="btn btn-sm">
          See
        </label>
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <ul>
              {props.error.map((item, index) => (
                <li key={index}>
                  <span>{item.msg}</span>
                </li>
              ))}
            </ul>
            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminErrorAlert;
