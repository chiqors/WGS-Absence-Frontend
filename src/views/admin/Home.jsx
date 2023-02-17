import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-3">Employee List</h1>
      <Link
        to="/admin/employee/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>

      <div className="mt-8 overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Contact</th>
              <th>Job</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <LazyLoadImage
                        alt="Avatar Tailwind CSS Component"
                        src="img/tailwind-css-component-profile-2@56w.png"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">Male (34th y/o)</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="underline">fathoni105@gmail.com</div>
                    <div className="text-sm">081223939528</div>
                  </div>
                </div>
              </td>
              <td>
                No Assignment
                <br />
                <span className="badge badge-ghost badge-sm">
                  Fullstack Developer
                </span>
              </td>
              <th>
                <div className="flex items-center space-x-3">
                  <Link to="/admin/employee/edit/1">
                    <button className="btn btn-warning btn-sm">edit</button>
                  </Link>
                  <Link to="/admin/employee/show/1">
                    <button className="btn btn-info btn-sm">details</button>
                  </Link>
                  <button className="btn btn-error btn-sm">delete</button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
