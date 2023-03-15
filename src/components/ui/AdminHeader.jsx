import { RiMenu2Line } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import helper from "../../helper.js";
import CircleLoading from "./CircleLoading.jsx";

const AdminHeader = ({ userData }) => {
  // console.log(userData.data);
  return (
    <header className="navbar bg-base-100 shadow-md">
      <div className="flex-1 lg:hidden">
        <label
          htmlFor="drawer-toggle"
          className="btn btn-ghost btn-square rounded-box"
        >
          <RiMenu2Line className="text-2xl text-gray-500" />
        </label>
      </div>
      <div className="flex-1 hidden lg:block">
        <h3 className="text-lg font-bold text-black pl-5">Admin Panel</h3>
      </div>
      <div className="flex-none">
        {/* user information */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar mt-2 mx-2 shadow"
          >
            <div className="w-12 rounded-full">
              {userData && userData.data && userData.data.employee ? (
                <LazyLoadImage
                  src={helper.getAssetPath(userData.data?.employee?.photo_url)}
                />
              ) : (
                <CircleLoading />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* add content for full name and job name */}
            <div className="flex flex-col items-start pb-3 border-b border-gray-200 mb-2">
              <div className="flex flex-row justify-center">
                {userData && userData.data && userData.data.employee ? (
                  <>
                    <LazyLoadImage
                      src={helper.getAssetPath(
                        userData.data?.employee?.photo_url
                      )}
                      className="w-12 h-12 rounded-full object-cover ml-3"
                    />
                    <div className="flex flex-col ml-2 justify-center">
                      <div className="text-sm font-semibold">
                        {userData.data?.employee?.full_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {userData.data?.employee?.job?.name}
                      </div>
                    </div>
                  </>
                ) : (
                  <CircleLoading />
                )}
              </div>
            </div>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <Link to="/logout">Sign out</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
