import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./protectedroutes/Protected";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const App = () => {
  const session = useSelector((state) => state.session);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route element={<ProtectedRoutes session={session} />}>
          <Route
            path="/portal/dashboard"
            element={<Dashboard session={session} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
