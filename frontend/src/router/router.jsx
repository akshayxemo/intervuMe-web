import Home from "../pages/Home/home";
import Dashboard from "../pages/Dashboard/dashboard";
import UserDashboard from "../components/user-dashboard";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/user/dashboard",
    element: <Dashboard Body={<UserDashboard />} />,
  },
]);

export default Router;
