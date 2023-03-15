import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dutyApi from "../../api/duty";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";
import AdminErrorAlert from "../../components/ui/AdminErrorAlert";

const JobDutyEdit = () => {
  const { id, dutyId } = useParams();
  const [formData, setFormData] = useState({
    job_id: id,
    name: "",
    description: "",
    duration_type: "full_time",
    status: "not_assigned",
  });
  const [loading, setLoading] = useState(true);
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
      title: "Edit Duty",
      href: `/admin/job/show/${id}/duty/edit/${dutyId}`,
    },
  ];

  useEffect(() => {
    fetchDuty()
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setFormData({
        job_id: id,
        name: "",
        description: "",
        duration_type: "full_time",
        status: "not_assigned",
      });
    };
  }, []);

  const fetchDuty = async () => {
    const response = await dutyApi.getDutyById(dutyId);
    return response.data;
  };

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
      dutyApi.updateDuty(dutyId, formData).then((response) => {
        if (response.status === 200) {
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
            <h1 className="mb-5 text-3xl font-bold">Edit Duty for Job {id}</h1>
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
            <div className="form-group">
              <label htmlFor="status" className="label">
                Status
              </label>
              <select
                className="input input-bordered"
                id="status"
                name="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="not_assigned">Not Assigned</option>
                <option value="assigned">Assigned</option>
                <option value="need_discussion">Need Discussion</option>
                <option value="completed">Completed</option>
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

export default JobDutyEdit;
