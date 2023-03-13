import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobApi from "../../api/job";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";

const JobEdit = () => {
  const { id } = useParams();
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
      title: "Edit Job",
      href: "/admin/job/edit/" + id,
    },
  ];
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob()
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setFormData({
        name: "",
        description: "",
      });
      setError(null);
      setLoading(true);
    };
  }, []);

  const fetchJob = async () => {
    const response = await jobApi.getJobById(id);
    return response.data;
  };

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
      jobApi.updateJob(id, formData).then((response) => {
        if (response.status === 200) {
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
            <h1 className="mb-5 text-3xl font-bold">Edit Job</h1>
          </div>

          <AdminBreadcrumb items={listMenu} />

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

export default JobEdit;
