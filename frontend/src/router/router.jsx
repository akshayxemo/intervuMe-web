import Home from "../pages/Home/home";
import Dashboard from "../pages/Dashboard/dashboard";
import UserNav from "../layouts/Navbar/user-navbar";
import MentorNav from "../layouts/Navbar/mentor-nav";
import UserDashboard from "../components/user-dashboard";
import MentorDashboard from "../components/mentor-dashboard";
import UserChat from "../components/user-chat-section";
import Mentors from "../components/mentors";
import SignupLoginPage from "../pages/signup/signup-login";
import SignupForm from "../pages/signup/signup";
import LoginForm from "../pages/signup/login";
import MentorLoginForm from "../pages/signup/mentor-login";
import SignupSuccess from "../pages/signup/signup-success";
import ForgetPasswordForm from "../pages/signup/forget-password";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Loader from "../components/loader";
import VideoCall from "../components/videoCall";
import MentorVideoCall from "../components/mentorVideoCall";
import GiveResult from "../components/giveResult";
import MentorChatSection from "../components/mentor-chat-section";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AdminLogin from "../pages/signup/adminLogin";
import Subscription from "../pages/Subscription/subscription";
import SubscriptionSuccess from "../pages/Subscription/success";
import UpdateSub from "../pages/Subscription/updateSub";
import SubscriptionCancel from "../pages/Subscription/cancel";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/auth/login"
          element={<SignupLoginPage page={<LoginForm />} />}
        />
        <Route
          path="/auth/signup"
          element={<SignupLoginPage page={<SignupForm />} />}
        />
        <Route
          path="/auth/forget-password"
          element={<SignupLoginPage page={<ForgetPasswordForm />} />}
        />
        <Route path="/auth/success" element={<SignupSuccess />} />
        <Route path="/loader" element={<Loader />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                Nav={UserNav}
                Body={<UserDashboard />}
                Chat={<UserChat />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentors"
          element={
            <ProtectedRoute>
              <Dashboard Nav={UserNav} Body={<Mentors />} Chat={<UserChat />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/subscriptions"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route path="/subscription" element={<UpdateSub />} />
        <Route path="/subscription/success" element={<SubscriptionSuccess />} />
        <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
        <Route
          path="/mentor/login"
          element={<SignupLoginPage page={<MentorLoginForm />} />}
        />
        <Route
          path="/mentor/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                Nav={MentorNav}
                Body={<MentorDashboard />}
                Chat={<MentorChatSection />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video-room/:sessionId/:mentorId"
          element={<VideoCall />}
        />
        <Route
          path="/mentor/video-room/:sessionId/:menteeId"
          element={<MentorVideoCall />}
        />
        <Route
          path="/mentor/give-result/:sessionId/:id"
          element={
            <ProtectedRoute>
              <GiveResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/login"
          element={<SignupLoginPage page={<AdminLogin />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

//   [
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/user/dashboard",
//     element: <Dashboard Body={<UserDashboard />} Chat={<UserChat />} />,
//   },
//   {
//     path: "/mentors",
//     element: <Dashboard Body={<h1>ha</h1>} Chat={<UserChat />} />,
//   },
//   {
//     path: "/auth",
//     element: <SignupLoginPage page={<LoginForm />} />,
//   },
//   {
//     path: "/auth/login",
//     element: <SignupLoginPage page={<LoginForm />} />,
//   },
//   {
//     path: "/auth/signup",
//     element: <SignupLoginPage page={<SignupForm />} />,
//   },
//   {
//     path: "/auth/forget-password",
//     element: <SignupLoginPage page={<ForgetPasswordForm />} />,
//   },
//   {
//     path: "/auth/success",
//     element: <SignupSuccess />,
//   },
// ]
// );

export default Router;
