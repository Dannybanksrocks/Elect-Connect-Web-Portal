import "../../styles/GridD.css";
import { getPartyColor } from "../Colors";
import useVotes from "../../hooks/useVotes";

export const bulletColors = [
  "rgba(222, 184, 135, 0.2)",
  "rgba(172, 255, 47, 0.2)",
  "rgba(255, 192, 203, 0.5)",
];

const PrecinctBigWin = (props) => {
  return (
    <div className="precinct-big-win">
      <div className="precinct-big-win-start">
        <div
          style={{ background: getPartyColor(props.party) }}
          className="precinct-big-win-bullet"
        ></div>
        <div className="precinct-big-win-title">
          Center {props.centerCode} Polling {props.pollingNumber}
        </div>
      </div>
      <div>{props.value}</div>
    </div>
  );
};

const GridD = ({ party, districtAccess }) => {
  const { votesDetails } = useVotes();
  const rows = votesDetails
    ? votesDetails.filter((item) => item.districtName === districtAccess)
        .length > 0 &&
      votesDetails.filter((item) => item.districtName === districtAccess)
    : null;

  return rows ? (
    <div className="precinct-big-wins">
      {party
        ? rows
            .filter((row) => row.candidateName === party)
            .map((row, index) => (
              <PrecinctBigWin
                key={index}
                centerCode={row.centerCode}
                pollingNumber={row.pollingNumber}
                value={row.votesObtain}
                party={row.candidateName}
              />
            ))
        : rows.map((row, index) => (
            <PrecinctBigWin
              key={index}
              centerCode={row.centerCode}
              pollingNumber={row.pollingNumber}
              value={row.votesObtain}
              party={row.candidateName}
            />
          ))}
    </div>
  ) : (
    <>No data available</>
  );
};

export default GridD;
