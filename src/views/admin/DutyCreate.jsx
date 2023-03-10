import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dutyApi from "../../api/duty";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import AdminErrorAlert from "../../components/ui/AdminErrorAlert";

const DutyCreate = () => {
  const [formData, setFormData] = useState({
    job_id: "",
    name: "",
    description: "",
    duration_type: "full_time",
  });
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const listMenu = [
    {
      title: "Duty List",
      href: "/admin/Duty",
    },
    {
      title: "Create Duty",
      href: `/admin/duty/create`,
    },
  ];

  const formValidation = () => {
    const errors = [];
    if (!formData.job_id) {
      errors.push({
        msg: "Job is required",
      });
    }
    if (!formData.name) {
      errors.push({
        msg: "Duty Name is required",
      });
    }
    if (!formData.description) {
      errors.push({
        msg: "Duty Description is required",
      });
    }
    return errors;
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkValidation = formValidation();
    if (checkValidation.length > 0) {
      setError(checkValidation);
      return;
    } else {
      setError(null);
      dutyApi.createDuty(formData).then((response) => {
        if (response.status === 201) {
          navigate(`/admin/duty`);
        }
      });
    }
  };

  const fetchJobs = async () => {
    const response = await dutyApi.getAllJobsForSelectBox();
    return response.data;
  };

  useEffect(() => {
    fetchJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            <h1 className="mb-5 text-3xl font-bold">Create Duty</h1>
          </div>

          <AdminBreadcrumb items={listMenu} />

          {error && <AdminErrorAlert error={error} />}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="job_id" className="label">
                Job
              </label>
              <select
                className="select select-bordered"
                id="job_id"
                name="job_id"
                onChange={handleFormChange}
              >
                <option value="">Select Job</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered"
                id="name"
                name="name"
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                className="input input-bordered"
                id="description"
                name="description"
                rows="3"
                onChange={handleFormChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="duration_type" className="label">
                Duration Type
              </label>
              <select
                className="input input-bordered"
                id="duration_type"
                name="duration_type"
                onChange={handleFormChange}
              >
                <option value="full_time">Full Time</option>
                <option value="business_trip">Business Trip</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DutyCreate;
