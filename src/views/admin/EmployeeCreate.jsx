import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import AdminErrorAlert from "../../components/ui/AdminErrorAlert";
import employeeModel from "../../models/employeeModel";
import jobModel from "../../models/jobModel";

const EmployeeCreate = () => {
  const [tab, setTab] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    job_id: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    birthdate: "",
    username: "",
    password: "",
    confirm_password: "",
    photo_url: "",
  });
  const [errors, setErrors] = useState([]);

  const listMenu = [
    {
      title: "Admin",
      href: "/",
    },
    {
      title: "Create Employee",
      href: "/employee/add",
    },
  ];

  const navigate = useNavigate();

  const handlePhoto = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
    setFormData({
      ...formData,
      photo_url: e.target.files[0],
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const formDataSubmit = new FormData();
    formDataSubmit.append("full_name", formData.full_name);
    formDataSubmit.append("job_id", formData.job_id);
    formDataSubmit.append("gender", formData.gender);
    formDataSubmit.append("phone", formData.phone);
    formDataSubmit.append("email", formData.email);
    formDataSubmit.append("address", formData.address);
    formDataSubmit.append("birthdate", formData.birthdate);
    formDataSubmit.append("username", formData.username);
    formDataSubmit.append("password", formData.password);
    formDataSubmit.append("confirm_password", formData.confirm_password);
    formDataSubmit.append("photo_url", formData.photo_url);
    try {
      await employeeModel.createEmployee(formDataSubmit);
      console.log("success create employee");
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  // useEffect Hooks can be used to perform side effects in function components
  // it is a combination of componentDidMount, componentDidUpdate, and componentWillUnmount
  useEffect(() => {
    const fetchJob = async () => {
      const res = await jobModel.getAllJobs();
      setJobs(res.data);
    };
    fetchJob();
    // clean up / unmount trigger with useEffect
    return () => {
      setJobs([]);
      setPhoto(null);
      setTab(0);
      setFormData([]);
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="mb-5 text-3xl font-bold">Create Employee</h1>
      </div>

      <AdminBreadcrumb items={listMenu} />

      {errors.length > 0 ? <AdminErrorAlert error={errors} /> : null}

      <form
        action=""
        method="POST"
        className="mt-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="tabs">
          <a
            className={
              tab === 0 ? "tab tab-lifted tab-active" : "tab tab-lifted"
            }
            onClick={() => setTab(0)}
          >
            Personal
          </a>
          <a
            className={
              tab === 1 ? "tab tab-lifted tab-active" : "tab tab-lifted"
            }
            onClick={() => setTab(1)}
          >
            Account
          </a>
        </div>
        <div className="card lg:card-side bg-base-100 shadow-xl p-6 mt-6">
          <div className="card-side-image">
            <div className="card-image h-48 w-48 bg-base-100 rounded-full shadow-xl overflow-hidden">
              <img
                src={
                  photo
                    ? photo
                    : "https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                }
                alt="Album"
              />
            </div>
            <div>
              <label className="btn btn-accent mt-5 flex items-center justify-center">
                <span>Upload Photo</span>
                <input
                  type="file"
                  name="photo_url"
                  hidden
                  onChange={handlePhoto}
                />
              </label>
            </div>
          </div>
          {tab === 0 ? (
            <div className="card-body py-0">
              <div className="grid grid-cols-3 gap-6">
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text">
                      Full Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="full_name"
                    onChange={handleFormChange}
                    value={formData.full_name}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control col-span-1">
                  <label className="label">
                    <span className="label-text">
                      Role / Job <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    name="job_id"
                    onChange={handleFormChange}
                    value={formData.job_id}
                  >
                    <option value="">-</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Gender <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="gender"
                    onChange={handleFormChange}
                    value={formData.gender}
                    className="select select-bordered w-full"
                    id="gender"
                  >
                    <option value="">-</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Phone <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    onChange={handleFormChange}
                    value={formData.phone}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Email <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Address <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    className="textarea h-24 textarea-bordered"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Birthdate <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleFormChange}
                    placeholder="Birth Date"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <button
                className="btn btn-primary mt-5"
                onClick={() => setTab(1)}
              >
                Go to Account
              </button>
            </div>
          ) : (
            <div className="card-body py-0">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  placeholder="Username"
                  className="input input-bordered"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleFormChange}
                    placeholder="Confirm Password"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <button className="btn btn-primary mt-5" type="submit">
                Submit
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default EmployeeCreate;
