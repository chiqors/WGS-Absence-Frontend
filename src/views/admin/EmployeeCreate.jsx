import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeApi from "../../api/employee";
import SentMail from "../../components/SentMail";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import AdminErrorAlert from "../../components/ui/AdminErrorAlert";
import AdminLoading from "../../components/ui/AdminLoading";

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
    photo_file: "",
    photo_url: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const listMenu = [
    {
      title: "Admin",
      href: "/admin/employee",
    },
    {
      title: "Create Employee",
      href: "/admin/employee/create",
    },
  ];

  const navigate = useNavigate();

  const handlePhoto = (e) => {
    // check if dimension is 1:1 and at least 200x200px
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      if (img.width === img.height && img.width >= 200 && img.height >= 200) {
        setPhoto(img.src);
        setFormData({
          ...formData,
          photo_file: e.target.files[0],
        });
      } else {
        setErrors([
          {
            msg: "Photo must be 1:1 and at least 200x200px",
          },
        ]);
      }
    };
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formValidation = () => {
    const errors = [];
    if (!formData.full_name) {
      errors.push({
        msg: "Full name is required",
      });
    }
    if (!formData.job_id) {
      errors.push({
        msg: "Job is required",
      });
    }
    if (!formData.gender) {
      errors.push({
        msg: "Gender is required",
      });
    }
    if (!formData.phone) {
      errors.push({
        msg: "Phone is required",
      });
    }
    if (!formData.email) {
      errors.push({
        msg: "Email is required",
      });
    }
    if (!formData.address) {
      errors.push({
        msg: "Address is required",
      });
    }
    if (!formData.birthdate) {
      errors.push({
        msg: "Birthdate is required",
      });
    }
    if (!formData.username) {
      errors.push({
        msg: "Username is required",
      });
    }
    if (!formData.password) {
      errors.push({
        msg: "Password is required",
      });
    }
    if (!formData.confirm_password) {
      errors.push({
        msg: "Confirm password is required",
      });
    }
    if (formData.password !== formData.confirm_password) {
      errors.push({
        msg: "Password and confirm password must be the same",
      });
    }
    if (formData.photo_file && formData.photo_url) {
      errors.push([
        {
          msg: "Please choose either upload photo or input external photo url",
        },
      ]);
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidation().length > 0) {
      setErrors(formValidation());
      return;
    }

    setProcessing(true);

    // convert date format to YYYY-MM-DD
    const birthdate = dayjs(formData.birthdate).format("YYYY-MM-DD");

    const formDataSubmit = new FormData();
    formDataSubmit.append("full_name", formData.full_name);
    formDataSubmit.append("job_id", formData.job_id);
    formDataSubmit.append("gender", formData.gender);
    formDataSubmit.append("phone", formData.phone);
    formDataSubmit.append("email", formData.email);
    formDataSubmit.append("address", formData.address);
    formDataSubmit.append("birthdate", birthdate);
    formDataSubmit.append("username", formData.username);
    formDataSubmit.append("password", formData.password);
    formDataSubmit.append("confirm_password", formData.confirm_password);
    if (formData.photo_file) {
      formDataSubmit.append("photo_file", formData.photo_file);
    } else {
      formDataSubmit.append("photo_url", formData.photo_url);
    }
    try {
      await employeeApi.createEmployee(formDataSubmit);
      console.log("success create employee");
      setProcessing(false);
      setSuccess(true);
    } catch (error) {
      setProcessing(false);
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      if (error?.response?.data?.message) {
        setErrors([
          {
            msg: error.response.data.message,
          },
        ]);
      }
    }
  };

  const handleCloseError = () => {
    setErrors([]);
  };

  // useEffect Hooks can be used to perform side effects in function components
  // it is a combination of componentDidMount, componentDidUpdate, and componentWillUnmount
  useEffect(() => {
    const fetchJob = async () => {
      const res = await employeeApi.getAllJobsForSelectBox();
      setJobs(res.data);
    };
    fetchJob();
    // clean up / unmount trigger with useEffect
    return () => {
      setErrors([]);
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

      <AdminLoading loading={processing} />

      {errors.length > 0 ? (
        <AdminErrorAlert error={errors} onClose={handleCloseError} />
      ) : null}

      {!success ? (
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
                    name="photo_file"
                    hidden
                    onChange={handlePhoto}
                  />
                </label>
              </div>
              {/* add 2nd input type text if user want to insert photo url instead */}
              <div className="mt-5">
                <input
                  type="text"
                  name="photo_url"
                  className="input input-bordered"
                  onChange={handleFormChange}
                  value={formData.photo_url}
                  placeholder="Photo URL (optional)"
                />
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
                      name="job_id"
                      onChange={handleFormChange}
                      value={formData.job_id}
                      className="select select-bordered w-full overflow-y-auto"
                      id="job_id"
                    >
                      <option value="">-</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.id} className="text-sm">
                          {job.name}
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
                        Birthdate <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleFormChange}
                      placeholder="Birth Date"
                      className="input input-bordered"
                    />
                  </div>
                </div>
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
                <button
                  className="btn btn-primary mt-5"
                  onClick={() => setTab(1)}
                >
                  Go to Account
                </button>
              </div>
            ) : (
              <div className="card-body py-0">
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Email"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>{" "}
                      <span className="text-red-500">*</span>
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
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>{" "}
                      <span className="text-red-500">*</span>
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
                      <span className="label-text">Confirm Password</span>{" "}
                      <span className="text-red-500">*</span>
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
      ) : (
        <SentMail to="/admin/employee" />
      )}
    </>
  );
};

export default EmployeeCreate;
