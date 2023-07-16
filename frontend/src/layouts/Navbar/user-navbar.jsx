import "./css/user-nav.css";
import logo from "../../assets/intervuMe-original-black-logo.svg";
import { Link } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineSupervisorAccount,
  MdOutlineTask,
  MdOutlineSettings,
  MdOutlineSubscriptions,
  MdOutlineAnalytics,
  MdOutlineInfo,
  MdOutlineDoNotDisturbOn,
} from "react-icons/md";
function UserNav() {
  return (
    <>
      <div className="user-nav">
        <div className="logo-display">
          <img src={logo} className="dashboard-logo" />
        </div>
        <div className="navigations">
          <div className="nav nav-active">
            <div className="nav-icon">
              <MdOutlineDashboard className="icon" />
            </div>
            <div className="nav-text">Dashboard</div>
          </div>
          <div className="nav">
            <div className="nav-icon">
              <MdOutlineSupervisorAccount className="icon" />
            </div>
            <div className="nav-text">Mentors</div>
          </div>
          <div className="nav">
            <div className="nav-icon">
              <MdOutlineTask className="icon" />
            </div>
            <div className="nav-text">Tasks</div>
          </div>
          <div className="nav">
            <div className="nav-icon">
              <MdOutlineSettings className="icon" />
            </div>
            <div className="nav-text">Settings</div>
          </div>
          <div className="nav">
            <div className="nav-icon">
              <MdOutlineSubscriptions className="icon" />
            </div>
            <div className="nav-text">Subscription</div>
          </div>
          <div className="nav">
            <div className="nav-icon">
              <MdOutlineAnalytics className="icon" />
            </div>
            <div className="nav-text">performence</div>
          </div>
        </div>
        <div className="navigations">
          <div className="nav">
            <div className="nav-icon">
              <MdOutlineInfo className="icon" />
            </div>
            <div className="nav-text">Help & information</div>
          </div>
          <Link to={`/logout`} className="nav logout">
            <div className="nav-icon">
              <MdOutlineDoNotDisturbOn className="icon" />
            </div>
            <div className="nav-text">logout</div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default UserNav;
