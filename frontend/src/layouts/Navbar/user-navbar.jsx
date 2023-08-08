import "./css/user-nav.css";
import logo from "../../assets/intervuMe-original-white-logo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MdOutlineDashboard,
  MdOutlineSupervisorAccount,
  // MdOutlineTask,
  // MdOutlineSettings,
  MdOutlineSubscriptions,
  // MdOutlineAnalytics,
  MdOutlineInfo,
  MdOutlineDoNotDisturbOn,
  MdOutlineClose,
} from "react-icons/md";
import PropTypes from "prop-types";
import { useAuth } from "../../router/AuthContext";
import Loader from "../../components/loader";

UserNav.propTypes = {
  func: PropTypes.func.isRequired,
  navControl: PropTypes.func.isRequired,
};

function UserNav(props) {
  const [activeNav, setActiveNav] = useState("dashboard");
  // Memoize the activeNav value using useMemo
  useEffect(() => {
    // Your code to determine the activeNav value
    // For example, you can extract it from the URL or use some other logic
    // Here, we'll assume it's extracted from the URL pathname
    const pathname = window.location.pathname;
    if (pathname === "/user/dashboard") {
      setActiveNav("dashboard");
    } else if (pathname === "/mentors") {
      setActiveNav("mentors");
    } else if (pathname === "/tasks") {
      setActiveNav("tasks");
    } else if (pathname === "/user/settings") {
      setActiveNav("settings");
    } else if (pathname === "/user/subscriptions") {
      setActiveNav("subs");
    } else if (pathname === "/user/performance") {
      setActiveNav("performance");
    } else if (pathname === "/help-information") {
      setActiveNav("h&i");
    } else {
      setActiveNav("dashboard"); // Default value
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  const handleActiveNav = (item) => {
    setActiveNav(item);
    if (window.innerWidth <= 600) {
      props.navControl(false);
    }
  };
  const handleLogOut = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      logout(); // logging out removing the token from localstorage
      // <Navigate to="/" />;
    }, 1500);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="logo-display">
        <Link to={`/`} style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} className="dashboard-logo" />
        </Link>
        <MdOutlineClose className="close-icon" onClick={props.func} />
      </div>
      <div className="navigations">
        <Link
          to={`/user/dashboard`}
          className={activeNav === "dashboard" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("dashboard")}
        >
          <div className="nav-icon">
            <MdOutlineDashboard className="icon" />
          </div>
          <div className="nav-text">Dashboard</div>
        </Link>
        <Link
          to={`/mentors`}
          className={activeNav === "mentors" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("mentors")}
        >
          <div className="nav-icon">
            <MdOutlineSupervisorAccount className="icon" />
          </div>
          <div className="nav-text">Mentors</div>
        </Link>
        {/* <Link
          to={`/tasks`}
          className={activeNav === "tasks" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("tasks")}
        >
          <div className="nav-icon">
            <MdOutlineTask className="icon" />
          </div>
          <div className="nav-text">Tasks</div>
        </Link> */}
        {/* <Link
          to={`/user/settings`}
          className={activeNav === "settings" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("settings")}
        >
          <div className="nav-icon">
            <MdOutlineSettings className="icon" />
          </div>
          <div className="nav-text">Settings</div>
        </Link> */}
        <Link
          to={`/user/subscriptions`}
          className={activeNav === "subs" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("subs")}
        >
          <div className="nav-icon">
            <MdOutlineSubscriptions className="icon" />
          </div>
          <div className="nav-text">Subscription</div>
        </Link>
        {/* <Link
          to={`/user/performance`}
          className={activeNav === "performance" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("performance")}
        >
          <div className="nav-icon">
            <MdOutlineAnalytics className="icon" />
          </div>
          <div className="nav-text">performance</div>
        </Link> */}
      </div>
      <div className="navigations">
        <Link
          to={`/help-information`}
          className={activeNav === "h&i" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("h&i")}
        >
          <div className="nav-icon">
            <MdOutlineInfo className="icon" />
          </div>
          <div className="nav-text">Help & information</div>
        </Link>
        <div className="nav logout" onClick={handleLogOut}>
          <div className="nav-icon">
            <MdOutlineDoNotDisturbOn className="icon" />
          </div>
          <div className="nav-text">logout</div>
        </div>
      </div>
    </>
  );
}
export default UserNav;
