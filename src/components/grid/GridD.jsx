import { precinctsBigWins } from "../../functions";
import { getPartyColor } from "../Colors";
import "../../styles/GridD.css";
import useVotes from "../../hooks/useVotes";

export const bulletColors = [
  "rgba(222, 184, 135, 0.2)",
  "rgba(172, 255, 47, 0.2)",
  "rgba(255, 192, 203, 0.5)",
];

const PrecinctBigWin = ({ title, value, party }) => {
  return (
    <div className="precinct-big-win">
      <div className="precinct-big-win-start">
        <div
          style={{ background: getPartyColor(party) }}
          className="precinct-big-win-bullet"
        ></div>
        <div className="precinct-big-win-title">{title}</div>
      </div>
      <div>{value}</div>
    </div>
  );
};

const GridD = ({ party }) => {
  const { votesDetails } = useVotes();
  const rows = votesDetails ? precinctsBigWins(votesDetails, party) : null;

  return rows ? (
    <div className="precinct-big-wins">
      {rows.map((row, index) => (
        <PrecinctBigWin
          key={index}
          title={row.precinctName}
          value={row.totalVotesObtained}
          party={row.candidateName}
        />
      ))}
    </div>
  ) : (
    <>No data available</>
  );
};

export default GridD;
