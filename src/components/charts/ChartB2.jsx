import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ChartComponent = (props) => {
  const options = {
    borderRadius: 5,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
      datalabels: {
        display: false,
        color: "black",
        anchor: "end",
        align: "center",
        font: {
          weight: 800,
          size: 20,
        },
      },
    },
  };
  const optionsMobile = {
    borderRadius: 5,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          minRotation: 90,
          maxRotation: 90,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
      datalabels: {
        display: false,
        color: "black",
        anchor: "end",
        align: "center",
        font: {
          weight: 600,
        },
      },
    },
  };
  const labels = props?.labels;
  const datasets = props?.datasets;

  const data = {
    labels,
    datasets,
  };

  return (
    datasets && (
      <>
        <Bar
          className="desktop"
          options={options}
          data={data}
          plugins={[ChartDataLabels]}
        />
        <Bar
          className="mobile"
          options={optionsMobile}
          data={data}
          plugins={[ChartDataLabels]}
        />
      </>
    )
  );
};

export default ChartComponent;
