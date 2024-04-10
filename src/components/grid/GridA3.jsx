import "../../styles/GridA.css";
import HalfDonutChart from "../charts/ChartA";
import Percentage from "../Percentage";
import { winMargin_District } from "../../functions";
import useVotes from "../../hooks/useVotes";

const ExtraMeta = ({ value, label }) => (
  <div className="grid-a-meta-extra">
    <div className="grid-a-meta-extra-label">{label}</div>
    <div className="grid-a-meta-extra-value">{value}</div>
  </div>
);

const GridA3 = ({ districtAccess }) => {
  const { votesDetails } = useVotes();
  const row = votesDetails
    ? votesDetails.filter((item) => item.districtName === districtAccess)
        .length > 0 && winMargin_District(votesDetails, districtAccess)
    : null;

  return row ? (
    <div className="grid-a-chart-container">
      <div className="grid-a-chart">
        <div className="grid-a-chart-inner">
          <HalfDonutChart
            winningParty={row?.winningParty}
            data={[row?.votesFor, row?.votesNotFor]}
          />
          <div className="grid-a-chart-inner-meta">
            <div className="grid-c-chart-inner-meta-value">
              <Percentage a={row?.votesFor} b={row?.totalVotes} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-a-meta">
        <div className="grid-a-meta-inner">
          <div className="grid-a-meta-title">
            You have exceeded the win margin by {row.winMargin}%
          </div>
          <div className="grid-a-meta-extras">
            <ExtraMeta label={"Target"} value={"Simple Majority"} />
            <ExtraMeta label={"Margin"} value={`${row.winMargin}%`} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No data available</div>
  );
};

export default GridA3;
