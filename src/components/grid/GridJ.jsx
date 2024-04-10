import "../../styles/GridG.css";
import Percentage from "../Percentage";
import { getPartyColor } from "../Colors";
import useVotes from "../../hooks/useVotes";

const HotspotCounty = ({ title, validVotes, totalVoters, party }) => (
  <div className="hotspot-county">
    <div className="hotspot-county-start">
      <div
        style={{ background: getPartyColor(party) }}
        className="hotspot-county-bullet"
      ></div>
      <div className="hotspot-county-title-value">
        <div className="hotspot-county-title">Center{title}</div>
        <div className="hotspot-county-value">{validVotes}</div>
      </div>
    </div>
    <div className="hotspot-county-end">
      <progress
        className="hotspot-county-progress"
        value={validVotes}
        max={totalVoters}
      />
      <div style={{ fontSize: "x-small", fontWeight: 600 }}>
        <Percentage a={validVotes} b={510} />
      </div>
    </div>
  </div>
);

const GridJ = ({ party }) => {
  const { votesDetails } = useVotes();
  const rows = votesDetails ?? null;

  return rows ? (
    <div>
      <div className="hotspot-counties-container">
        {rows && rows.length > 0 && (
          <div className="hotspot-counties-inner">
            <div className="hotspot-counties">
              {party
                ? rows
                    .filter((row) => row.candidateName === party)
                    .map((row, index) => (
                      <HotspotCounty
                        party={row.candidateName}
                        key={index}
                        index={index}
                        title={row.centerCode}
                        totalVoters={row.totalVoters}
                        validVotes={row.votesValid}
                      />
                    ))
                : rows.map((row, index) => (
                    <HotspotCounty
                      party={row.candidateName}
                      key={index}
                      index={index}
                      title={row.centerCode}
                      totalVoters={row.totalVoters}
                      validVotes={row.votesValid}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <>No data available</>
  );
};

export default GridJ;
