import { LazyLoadImage } from "react-lazy-load-image-component";
import helper from "../../helper";

const TopAttendTable = ({ data }) => {
  const desiredRowCount = 5;
  const dataCount = data.length;
  const emptyRowCount = desiredRowCount - dataCount;

  return (
    <div className="relative mb-4 overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg">
      <table className="table w-full table-striped table-hover">
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Job</th>
            <th>Status</th>
            <th>Presents</th>
          </tr>
        </thead>
        <tbody>
          {data.map((datacount) => (
            <tr key={datacount.employee.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                      <LazyLoadImage
                        alt="Avatar Tailwind CSS Component"
                        src={helper.getAssetPath(datacount.employee.photo_url)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">
                      {datacount.employee.full_name}
                    </div>
                    <div className="text-sm opacity-50">
                      {datacount.employee.gender} (
                      {helper.getAgeFromBirthDate(datacount.employee.birthdate)}
                      th y/o)
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">{datacount.employee.job.name}</td>
              <td>
                {/* online svg circle icon green */}
                {datacount.time_out == null ? (
                  <div className="flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    <span>Online</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    <span>Offline</span>
                  </div>
                )}
              </td>
              <td className="font-bold text-center">{datacount.count}</td>
            </tr>
          ))}
          {emptyRowCount > 0 && (
            <tr key={`empty-index`}>
              <td
                rowSpan={emptyRowCount}
                colSpan={4}
                className="text-center bg-gray-100"
              >
                There are empty places for{" "}
                <span className="font-bold">{emptyRowCount} data</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopAttendTable;
