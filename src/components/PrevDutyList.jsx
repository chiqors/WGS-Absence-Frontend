import helper from "../helper.js";

const PrevDutyList = ({ data }) => {
  return (
    <div className="card w-full p-4 shadow sm:p-8 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          Previous Assigned
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all (WIP)
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            <div className="flex flex-col space-y-2">
              {data.map((attenance) => (
                <div key={attenance.id}>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {attenance.duty.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {helper.getHumanReadableDate(attenance.time_in)}
                    {" - "}
                    {attenance.time_out ? (
                      helper.getHumanReadableDate(attenance.time_out)
                    ) : (
                      <span className="text-red-500">Not clocked out</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrevDutyList;
