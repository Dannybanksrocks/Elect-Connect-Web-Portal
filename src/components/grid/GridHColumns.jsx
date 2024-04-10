import { getPartyColor } from "../Colors";

const CONFIRM_STATUS = {
  Unconfirmed: {
    label: "Unconfirmed",
    bg: "rgba(240, 128, 0, 0.07)",
    color: "rgb(240, 128, 0)",
  },
  Confirmed: {
    label: "Unconfirmed",
    bg: "rgba(240, 128, 0, 0.07)",
    color: "rgb(240, 128, 0)",
  },
  Mismatch: {
    label: "Mismatch",
    bg: "rgba(255, 0, 0, 0.1)",
    color: "red",
  },
};

const PrecinctTableColumn = ({ title, party }) => (
  <div className="precinct-table-column">
    <div
      style={{ background: getPartyColor(party) }}
      className="precinct-table-column-bullet"
    ></div>
    <div className="precinct-table-column-title">{title}</div>
  </div>
);

const ConfirmationStatus = ({ status }) => (
  <div
    style={{
      background: CONFIRM_STATUS[status]?.bg,
      color: CONFIRM_STATUS[status]?.color,
    }}
    className="confirmation-status"
  >
    <div className="confirmation-status-inner">
      {CONFIRM_STATUS[status]?.label}
    </div>
  </div>
);

export const columns = [
  {
    field: "precinctName",
    headerName: "Precinct",
    width: 250,
    renderCell: ({ row }) => (
      <PrecinctTableColumn
        index={row?.id}
        party={row?.candidateName}
        title={row?.precinctName}
      />
    ),
  },
  {
    field: "supervisorName",
    headerName: "Supervisor",
    width: 200,
    renderCell: ({ row }) => (
      <div className="supervisor-name-row">
        <div className="supervisor-name-row-text">{row.supervisorName}</div>
        <div>
          <small style={{ color: "gray" }}>{row.supervisorMsisdn}</small>
        </div>
      </div>
    ),
  },
  { field: "votesObtain", headerName: "Votes Obtained", width: 150 },
  {
    field: "confirmation",
    headerName: "Confirmation",
    width: 200,
    renderCell: ({ row }) => <ConfirmationStatus status={row.confirmation} />,
  },
  
  {
    field: "watcherMsisdn",
    headerName: "Watcher MSISDN",
    width: 200,
    renderCell: ({ row }) => (
      <div className="watcher-msisdn-row">
        <div className="watcher-msisdn-row-text">{row.watcherMsisdn}</div>
      </div>
    ),
  },
];