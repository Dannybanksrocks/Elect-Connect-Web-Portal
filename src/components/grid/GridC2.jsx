import "../../styles/GridC.css";
import Doughnut from "../charts/ChartC";
import Percentage from "../Percentage";
import { polling_County, reduce } from "../../functions";
import useVotes from "../../hooks/useVotes";

const GridMeta = ({ title, value }) => (
  <div className="grid-c-meta-item">
    <div className="grid-c-meta-item-start">
      <div className="grid-c-meta-item-bullet"></div>
      <div className="grid-c-meta-item-title">{title}</div>
    </div>
    <div className="grid-c-meta-item-end">
      <div className="grid-c-meta-item-value">{value}</div>
    </div>
  </div>
);

const GridC = ({ countyAccess }) => {
  const { votesDetails } = useVotes();
  const agg = votesDetails
    ? votesDetails.filter((item) => item.county === countyAccess).length > 0 &&
      polling_County(votesDetails, countyAccess)
    : null;
  const row = agg
    ? {
        precincts: agg.length,
        votesValid: reduce(agg, "votesValid"),
        votesInvalid: reduce(agg, "votesInvalid"),
        percentage: <Percentage a={agg.length} b={488} />,
      }
    : null;

  return row ? (
    <div className="grid-c-chart-container">
      <div className="grid-c-chart">
        <div className="grid-c-chart-inner">
          <Doughnut data={[row?.votesValid, row?.votesInvalid]} />
          <div className="grid-c-chart-inner-meta">
            <div className="grid-c-chart-inner-meta-value">
              {row?.precincts}/488
            </div>
            <div className="grid-c-chart-inner-meta-percentage">
              <span>{row?.percentage}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-c-meta">
        <div className="grid-c-meta-items">
          <GridMeta title={"Total Valid Votes"} value={row?.votesValid} />
          <GridMeta title={"Total Invalid Votes"} value={row?.votesInvalid} />
          <GridMeta title={"Percentage"} value={row?.percentage} />
        </div>
      </div>
    </div>
  ) : (
    <div>No data available</div>
  );
};

export default GridC;