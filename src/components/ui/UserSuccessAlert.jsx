const UserSuccessAlert = ({ message }) => {
  return (
    <div className="alert alert-success">
      <div className="flex-1">
        <label className="cursor-pointer select-none">{message}</label>
      </div>
    </div>
  );
};

export default UserSuccessAlert;
