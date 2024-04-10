import "../../styles/GridE.css";
import { lastHourVoteResults_County } from "../../functions";
import { getPartyColor } from "../Colors";
import Percentage from "../Percentage";
import useVotes from "../../hooks/useVotes";

const NewResult = ({ title, value, percent, party }) => (
  <div className="new-result">
    <div className="new-result-start">
      <div
        style={{ background: getPartyColor(party) }}
        className="new-result-bullet"
      ></div>
      <div className="new-result-title">{title}</div>
    </div>
    <div className="new-result-end">
      <div className="new-result-value">{value}</div>
      <div
        style={{
          background: "#efefef",
        }}
        className="new-result-percent"
      >
        {percent}
      </div>
    </div>
  </div>
);

const GridE = ({ party, countyAccess }) => {
  const { votesDetails } = useVotes();
  const rows = votesDetails
    ? votesDetails.filter((item) => item.county === countyAccess).length > 0 &&
      lastHourVoteResults_County(votesDetails, countyAccess)
    : null;

  return rows ? (
    <div className="new-results">
      {rows.length > 0
        ? party
          ? rows
              .filter((row) => row.candidateName === party)
              .map((row, index) => (
                <NewResult
                  key={index}
                  party={row.candidateName}
                  title={row.precinctName}
                  value={row.votesObtain}
                  percent={
                    <Percentage a={row.votesValid} b={row.totalVoters} />
                  }
                />
              ))
          : rows.map((row, index) => (
              <NewResult
                key={index}
                party={row.candidateName}
                title={row.precinctName}
                value={row.votesObtain}
                percent={<Percentage a={row.votesValid} b={row.totalVoters} />}
              />
            ))
        : "No updates in the last hour"}
    </div>
  ) : (
    <>No data available</>
  );
};

export default GridE;
