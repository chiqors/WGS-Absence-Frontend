import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dutyApi from "../../api/duty";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import AdminErrorAlert from "../../components/ui/AdminErrorAlert";

const JobDutyCreate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    job_id: id,
    name: "",
    description: "",
    duration_type: "full_time",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const listMenu = [
    {
      title: "Job List",
      href: "/admin/job",
    },
    {
      title: "Job Show",
      href: `/admin/job/show/${id}`,
    },
    {
      title: "Create Duty",
      href: `/admin/job/show/${id}/duty/create`,
    },
  ];

  const formValidation = () => {
    const errors = [];
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
          navigate(`/admin/job/show/${id}`);
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            <h1 className="mb-5 text-3xl font-bold">
              Create Duty for Job {id}
            </h1>
          </div>

          <AdminBreadcrumb items={listMenu} />

          {error && <AdminErrorAlert error={error} />}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
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
                value={formData.duration_type}
                onChange={(e) =>
                  setFormData({ ...formData, duration_type: e.target.value })
                }
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

export default JobDutyCreate;
