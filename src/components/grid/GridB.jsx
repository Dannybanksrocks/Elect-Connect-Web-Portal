import "../../styles/GridB.css";
import { reduce, voteResultsbyCounty } from "../../functions";
import Chart from "../charts/ChartB";
import { getPartyColor } from "../Colors";
import useVotes from "../../hooks/useVotes";

const MetaItem = ({
  party,
  label,
  value,
  totalVotes,
  showPercentage = true,
}) => (
  <div className="grid-b-meta-item">
    <div
      style={{
        background: getPartyColor(party)
          ? getPartyColor(party)
          : label === "Invalid Votes"
          ? "red"
          : "black",
      }}
      className="grid-b-meta-item-bullet"
    />
    <div>
      <span>{label ?? party}</span>: <span>{value}</span>{" "}
      {showPercentage && (
        <span>({((value / totalVotes) * 100).toFixed(2)} %)</span>
      )}
    </div>
  </div>
);

const GridB = () => {
  const { votesByCounty } = useVotes();
  const row = votesByCounty ? voteResultsbyCounty(votesByCounty) : null;
  const votesValid = votesByCounty ? reduce(votesByCounty, "votesValid") : null;
  const votesInvalid = votesByCounty
    ? reduce(votesByCounty, "votesInvalid")
    : null;

  return row ? (
    <div className="grid-b-chart-container">
      <div className="grid-b-meta">
        <div className="grid-b-meta-inner">
          {row?.datasets?.map((item, index) => (
            <MetaItem
              key={index}
              party={item.label}
              value={reduce(item.data)}
              totalVotes={row?.totalVotes}
            />
          ))}

          <MetaItem
            label={"Total Valid Votes"}
            value={votesValid}
            totalVotes={row?.totalVotes}
            showPercentage={false}
          />

          <MetaItem
            label={"Invalid Votes"}
            value={votesInvalid}
            totalVotes={row?.totalVotes}
          />
        </div>
      </div>

      <Chart labels={row?.labels} datasets={row?.datasets} />
    </div>
  ) : (
    <div>No data available</div>
  );
};

export default GridB;
