import "../styles/Dashboard.css";
import "../styles/Grid.css";
import ItemA from "../components/grid/GridA";
import ItemB from "../components/grid/GridB";
import ItemC from "../components/grid/GridC";
import ItemD from "../components/grid/GridD";
import ItemE from "../components/grid/GridE";
import ItemF from "../components/grid/GridF";
import ItemG from "../components/grid/GridG";
import ItemH from "../components/grid/GridH";
import ItemI from "../components/grid/GridI";
import ItemJ from "../components/grid/GridJ";

import ItemA2 from "../components/grid/GridA2";
import ItemB2 from "../components/grid/GridB2";
import ItemC2 from "../components/grid/GridC2";
import ItemD2 from "../components/grid/GridD2";
import ItemE2 from "../components/grid/GridE2";
import ItemG2 from "../components/grid/GridG2";

import ItemA3 from "../components/grid/GridA3";
import ItemB3 from "../components/grid/GridB3";
import ItemC3 from "../components/grid/GridC3";
import ItemD3 from "../components/grid/GridD3";
import ItemE3 from "../components/grid/GridE3";

import { Fragment, useState } from "react";
import Menu from "../components/Menu";
import { getPartyColor } from "../components/Colors";
import { MenuItem } from "@mui/material";
import Section from "../components/Section";
import { DropDown } from "../components/Dropdown";
import { GridItem } from "../components/GridItem";
import Nav from "../components/Nav";

const Dashboard = ({ session }) => {
  const { accessRole, countyAccess, districtAccess } = session;
  const parties = ["ALL", "CDC", "UP"];
  const [party, setParty] = useState(null);
  const handlePartyChange = (newParty) => () => {
    if (newParty === "ALL") {
      setParty(null);
    } else {
      setParty(newParty);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const gridClasses = {
    "National-Viewer": "national-grid",
    "County-Viewer": "county-grid",
    "District-Viewer": "district-grid",
  };

  const Slides = {
    "National-Viewer": [
      <GridItem
        grid={"a"}
        title={"Win Margin"}
        titleHelPer={"Results Coming In"}
      >
        <ItemA />
      </GridItem>,
      <GridItem
        centeredTitle
        grid={"b"}
        title={"Presidential Election Results Nationwide"}
      >
        <ItemB />
      </GridItem>,
      <GridItem grid={"c"} title={"Voting Precincts"}>
        <ItemC />
      </GridItem>,
      <GridItem
        grid={"d"}
        title={"Vote Per Precincts"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemD party={party} />
      </GridItem>,
      <GridItem grid={"e"} title={"Polling Places"}>
        <ItemE />
      </GridItem>,
      <GridItem
        grid={"f"}
        title={"Votes Per Polling Places"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemF party={party} />
      </GridItem>,
      <GridItem
        grid={"g"}
        title={"New Results Coming In"}
        titleHelPer={"Results in the last hour"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemG party={party} />
      </GridItem>,
      <GridItem
        grid={"h"}
        title={"Incoming Tally Sheet Results"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemH party={party} />
      </GridItem>,
      <GridItem
        grid={"i"}
        title={"Votes Per Counties"}
        titleHelPer={"Based on Precinct Votes"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemI party={party} />
      </GridItem>,
      <GridItem
        grid={"j"}
        title={"Hotspot Polling Places"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemJ party={party} />
      </GridItem>,
    ],
    "County-Viewer": [
      <GridItem
        grid={"a"}
        title={"Win Margin"}
        titleHelPer={"Results Coming In"}
      >
        <ItemA2 countyAccess={countyAccess} />
      </GridItem>,
      <GridItem grid={"b"} title={"Presidential Election Results Nationwide"}>
        <ItemB2 countyAccess={countyAccess} />
      </GridItem>,
      <GridItem grid={"c"} title={"Polling"}>
        <ItemC2 countyAccess={countyAccess} />
      </GridItem>,
      <GridItem
        grid={"d"}
        title={"Polling Big Wins"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemD2 countyAccess={countyAccess} party={party} />
      </GridItem>,
      <GridItem
        grid={"e"}
        title={"New Results Coming In"}
        titleHelPer={"Results in the last hour"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemE2 countyAccess={countyAccess} party={party} />
      </GridItem>,
      <GridItem
        grid={"g"}
        title={"Hotspot Polling Number"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemG2 countyAccess={countyAccess} party={party} />
      </GridItem>,
    ],
    "District-Viewer": [
      <GridItem
        grid={"a"}
        title={"Win Margin"}
        titleHelPer={"Results Coming In"}
      >
        <ItemA3 districtAccess={districtAccess} />
      </GridItem>,
      <GridItem grid={"b"} title={"Presidential Election Results Nationwide"}>
        <ItemB3 districtAccess={districtAccess} />
      </GridItem>,
      <GridItem grid={"c"} title={"Polling"}>
        <ItemC3 districtAccess={districtAccess} />
      </GridItem>,
      <GridItem
        grid={"d"}
        title={"Polling Big Wins"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemD3 districtAccess={districtAccess} party={party} />
      </GridItem>,
      <GridItem
        grid={"e"}
        title={"New Results Coming In"}
        titleHelPer={"Results in the last hour"}
        filter={<DropDown handleClick={handleClick} value={party} />}
      >
        <ItemE3 districtAccess={districtAccess} party={party} />
      </GridItem>,
    ],
  };

  return (
    <div className="dashboard-v2">
      <div>
        <Nav session={session} />
      </div>

      <Section>
        <center>
          <strong>
            <h2>ElectConnect Dashboard</h2>
          </strong>
        </center>
      </Section>

      <Section innerClassName="dashboard-v2-inner">
        {accessRole && (
          <div className={`grid ${gridClasses[accessRole]}`}>
            {Slides[accessRole].map((grid, index) => (
              <Fragment key={index}>{grid}</Fragment>
            ))}
          </div>
        )}
      </Section>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        position={"right"}
      >
        {parties.map((_party, index) => (
          <MenuItem
            selected={_party === party}
            key={index}
            onClick={handlePartyChange(_party)}
          >
            <div className="slide-show-item-dropdown-menu-item">
              <div
                style={{ background: getPartyColor(_party) }}
                className="slide-show-item-dropdown-menu-item-bullet"
              ></div>
              <div>{_party}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dashboard;
