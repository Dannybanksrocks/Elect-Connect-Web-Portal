import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DonutChart = (props) => {
  const data = {
    labels: ["Valid Votes", "Invalid Votes"],
    datasets: [
      {
        data: props.data,
        backgroundColor: ["#c5c5c5", "#efefef"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        anchor: "center",
        font: {
          weight: 800,
        },
        formatter: function (value, context) {
          return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
        },
      },
    },
  };

  return (
    <Doughnut className="react-chart-doughnut" data={data} options={options} />
  );
};

export default DonutChart;
