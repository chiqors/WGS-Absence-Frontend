import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
Chart.register(...registerables);

const AvgAttendLineGraph = ({ data, avgData }) => {
  // data: [{date: "2021-08-01", employee_present: [], total_absent: 1}, ...]
  // employee_present: [{employee_id: 1, employee_name: "John Doe"}, ...]
  // use date as label

  const trimToDateOnly = (date) => {
    const dateOnly = dayjs(date).format("DD MMM");
    return dateOnly;
  };

  const labels = data.map((d) => trimToDateOnly(d.date));
  const present = data.map((d) => d.employee_present.length);

  const datas = {
    labels: labels,
    datasets: [
      {
        label: "Present",
        data: present,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const plugins = [
    {
      id: "flatLine",
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        const y = chart.scales["y"].getPixelForValue(avgData);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(chart.width, y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.restore();
      },
    },
  ];

  return (
    <Line
      data={datas}
      options={options}
      plugins={plugins}
      className="w-full h-full"
    />
  );
};

export default AvgAttendLineGraph;
