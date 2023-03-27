const UserErrorAlert = ({ message }) => {
  return (
    <div className="alert alert-error">
      <div className="flex-1">
        <label className="cursor-pointer select-none">{message}</label>
      </div>
    </div>
  );
};

export default UserErrorAlert;
