import "./css/user-nav.css";
import logo from "../../assets/intervuMe-original-white-logo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MdOutlineDashboard,
  MdOutlineSettings,
  MdOutlineInfo,
  MdOutlineDoNotDisturbOn,
  MdOutlineClose,
} from "react-icons/md";
import PropTypes from "prop-types";
import { useAuth } from "../../router/AuthContext";
import Loader from "../../components/loader";

MentorNav.propTypes = {
  func: PropTypes.func.isRequired,
  navControl: PropTypes.func.isRequired,
};

function MentorNav(props) {
  const [activeNav, setActiveNav] = useState("dashboard");
  // Memoize the activeNav value using useMemo
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/mentor/dashboard") {
      setActiveNav("dashboard");
    } else if (pathname === "/mentor/settings") {
      setActiveNav("settings");
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
          to={`/mentor/dashboard`}
          className={activeNav === "dashboard" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("dashboard")}
        >
          <div className="nav-icon">
            <MdOutlineDashboard className="icon" />
          </div>
          <div className="nav-text">Dashboard</div>
        </Link>
        <Link
          to={`/mentor/settings`}
          className={activeNav === "settings" ? "nav nav-active" : "nav"}
          onClick={() => handleActiveNav("settings")}
        >
          <div className="nav-icon">
            <MdOutlineSettings className="icon" />
          </div>
          <div className="nav-text">Settings</div>
        </Link>
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
export default MentorNav;
