import "./css/user-nav.css";
import logo from "../../assets/intervuMe-original-white-logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineSupervisorAccount,
  MdOutlineTask,
  MdOutlineSettings,
  MdOutlineSubscriptions,
  MdOutlineAnalytics,
  MdOutlineInfo,
  MdOutlineDoNotDisturbOn,
  MdOutlineClose,
} from "react-icons/md";
import PropTypes from "prop-types";
UserNav.propTypes = {
  func: PropTypes.func.isRequired,
  navControl: PropTypes.func.isRequired,
};
function UserNav(props) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const handleActiveNav = (navItem) => {
    setActiveNav(navItem);
    props.navControl(false);
  };
  return (
    <>
      <div className="logo-display">
        <img src={logo} className="dashboard-logo" />
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
        <Link
          to={`/tasks`}
          className={activeNav === "tasks" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("tasks")}
        >
          <div className="nav-icon">
            <MdOutlineTask className="icon" />
          </div>
          <div className="nav-text">Tasks</div>
        </Link>
        <Link
          to={`/user/settings`}
          className={activeNav === "settings" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("settings")}
        >
          <div className="nav-icon">
            <MdOutlineSettings className="icon" />
          </div>
          <div className="nav-text">Settings</div>
        </Link>
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
        <Link
          to={`/user/performance`}
          className={activeNav === "performance" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("performance")}
        >
          <div className="nav-icon">
            <MdOutlineAnalytics className="icon" />
          </div>
          <div className="nav-text">performance</div>
        </Link>
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
        <Link to={`/logout`} className="nav logout">
          <div className="nav-icon">
            <MdOutlineDoNotDisturbOn className="icon" />
          </div>
          <div className="nav-text">logout</div>
        </Link>
      </div>
    </>
  );
}
export default UserNav;
