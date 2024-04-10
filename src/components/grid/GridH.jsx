import "../../styles/GridF.css";
import Datagrid from "../Datagrid";
import { useState } from "react";
import { columns } from "./GridHColumns";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Lightbox from "../Lightbox";
import useVotes from "../../hooks/useVotes";

const GridH = ({ party }) => {
  const { votesDetails } = useVotes();
  const rows = votesDetails
    ? votesDetails.map((vote, index) => {
        vote.id = index;
        return vote;
      })
    : null;
  const [open, setOpen] = useState(false);
  const handleOpenTally = (row) => () => {
    setSlides([row.imageUrl]);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [slides, setSlides] = useState([]);
  const tallySheetColumn = {
    field: "tally",
    headerName: "Tally Sheet",
    width: 100,
    renderCell: ({ row }) => {
      return (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <IconButton
            disabled={row.imageUrl === ""}
            onClick={handleOpenTally(row)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </div>
      );
    },
  };

  return rows && rows.length > 0 ? (
    <>
      <Lightbox open={open} handleClose={handleClose} slides={slides} />
      {party ? (
        <Datagrid
          columns={[...columns, tallySheetColumn]}
          rows={rows.filter((row) => row.candidateName === party)}
        />
      ) : (
        <Datagrid columns={[...columns, tallySheetColumn]} rows={rows} />
      )}
    </>
  ) : (
    <>No data available</>
  );
};

export default GridH;
