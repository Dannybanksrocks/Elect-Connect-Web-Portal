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
import { getPartyColor } from "../Colors";
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

const HalfDonutChart = (props) => {
  const partyColor = getPartyColor(props.winningParty);
  const otherParty = props.winningParty === "CDC" ? "UP" : "CDC";
  const otherPartyColor = getPartyColor(otherParty);

  const data = {
    labels: [props.winningParty, otherParty],
    datasets: [
      {
        data: props.data,
        backgroundColor: [partyColor, otherPartyColor],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "50%",
    rotation: -90,
    circumference: 180,
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
          size: 15,
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

export default HalfDonutChart;
