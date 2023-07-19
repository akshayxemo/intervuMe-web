import Home from "../pages/Home/home";
import Dashboard from "../pages/Dashboard/dashboard";
import UserDashboard from "../components/user-dashboard";
import UserChat from "../components/user-chat-section";
import SignupLoginPage from "../pages/signup/signup-login";
import SignupForm from "../pages/signup/signup";
import LoginForm from "../pages/signup/login";
import SignupSuccess from "../pages/signup/signup-success";
import ForgetPasswordForm from "../pages/signup/forget-password";
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
    element: <Dashboard Body={<UserDashboard />} Chat={<UserChat />} />,
  },
  {
    path: "/mentors",
    element: <Dashboard Body={<h1>ha</h1>} Chat={<UserChat />} />,
  },
  {
    path: "/auth",
    element: <SignupLoginPage page={<LoginForm />} />,
  },
  {
    path: "/auth/login",
    element: <SignupLoginPage page={<LoginForm />} />,
  },
  {
    path: "/auth/signup",
    element: <SignupLoginPage page={<SignupForm />} />,
  },
  {
    path: "/auth/forget-password",
    element: <SignupLoginPage page={<ForgetPasswordForm />} />,
  },
  {
    path: "/auth/success",
    element: <SignupSuccess />,
  },
]);

export default Router;
