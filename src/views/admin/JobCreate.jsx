import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobApi from "../../api/job";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import AdminErrorAlert from "../../components/ui/AdminErrorAlert";

const JobCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const listMenu = [
    {
      title: "Job List",
      href: "/admin/job",
    },
    {
      title: "Create Job",
      href: "/admin/job/create",
    },
  ];
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formValidation = () => {
    const errors = [];
    if (!formData.name) {
      errors.push({
        msg: "Job Name is required",
      });
    }
    if (!formData.description) {
      errors.push({
        msg: "Job Description is required",
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
      jobApi.createJob(formData).then((response) => {
        if (response.status === 201) {
          navigate("/admin/job");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            <h1 className="mb-5 text-3xl font-bold">Create Job</h1>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobCreate;
