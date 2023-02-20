import { useState } from "react";
import AdminBreadcrumb from "../../components/ui/AdminBreadcrumb";

const EmployeeCreate = () => {
  const [tab, setTab] = useState(0);
  const [photo, setPhoto] = useState(null);
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

  const handlePhoto = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <h1 className="mb-5 text-3xl font-bold">Create Employee</h1>
      </div>

      <AdminBreadcrumb items={listMenu} />

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
            value={0}
          >
            Personal
          </a>
          <a
            className={
              tab === 1 ? "tab tab-lifted tab-active" : "tab tab-lifted"
            }
            onClick={() => setTab(1)}
            value={1}
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
                    name="fullname"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control col-span-1">
                  <label className="label">
                    <span className="label-text">
                      Role <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select className="select select-bordered w-full" name="role">
                    <option value="">-</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
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
                  <input
                    type="text"
                    placeholder="gender"
                    name="gender"
                    className="input input-bordered"
                  />
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
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
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
                    placeholder="Confirm Password"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <button
                className="btn btn-primary mt-5"
                onClick={() => setTab(0)}
              >
                Go to Personal
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default EmployeeCreate;
