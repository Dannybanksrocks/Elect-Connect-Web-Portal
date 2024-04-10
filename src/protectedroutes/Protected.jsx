import { Outlet } from "react-router";
import Redirect from "../components/Redirect";

const Protected = ({ session }) => {
  return session ? <Outlet /> : <Redirect path={"/"} />;
};

export default Protected;
