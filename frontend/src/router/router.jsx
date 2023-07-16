import Home from "../pages/Home/home";
import UserDashboard from "../pages/dashboard/user-dashboard";
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
    element: <UserDashboard />,
  },
]);

export default Router;
