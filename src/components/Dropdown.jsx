import "../styles/Dropdown.css"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { getPartyColor } from "./Colors";

export const DropDown = ({ handleClick, value }) => (
  <div className="drop-down" onClick={handleClick}>
    <div className="drop-down-selected">
      <div
        style={{ background: `${value ? getPartyColor(value) : "#c5c5c5"}` }}
        className="drop-down-selected-bullet"
      ></div>
      <div>{value ?? "ALL"}</div>
    </div>
    <div>
      <ExpandMoreRoundedIcon style={{ fontSize: 20 }} />
    </div>
  </div>
);
