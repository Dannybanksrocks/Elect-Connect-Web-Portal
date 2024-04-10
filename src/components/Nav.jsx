import { useState } from "react";
import "../styles/Nav.css";
import Section from "./Section";
import { Avatar, IconButton, MenuItem } from "@mui/material";
import Menu from "./Menu";
import { sessionEnd } from "../redux/features/Session";
import { useDispatch } from "react-redux";

const Nav = ({ session }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    dispatch(sessionEnd());
  };

  return (
    <nav>
      <Section innerClassName={"nav"}>
        <div className="nav-title"></div>
        <IconButton onClick={handleClick}>
          <Avatar src="/" alt={session?.accessRole} />
        </IconButton>
      </Section>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        position={"right"}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </nav>
  );
};

export default Nav;
