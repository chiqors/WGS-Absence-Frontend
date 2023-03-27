import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);

const AttendancePieChart = ({ data }) => {
  // data: {total_percentage_present: 11, total_percentage_absent: 88}

  const datas = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [data.total_percentage_attendance, data.total_percentage_absent],
        backgroundColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="overflow-hidden w-full h-full">
      <Pie data={datas} options={options} className="w-48" />
    </div>
  );
};

export default AttendancePieChart;
