import "./admin.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-icon.svg";
import MentorSignup from "../../pages/signup/mentorSignup";
import { useAuth } from "../../router/AuthContext";
import Loader from "../../components/loader";
import { useState } from "react";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
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
      <div className="container-lg">
        <div className="admin-head">
          <h1 className="admin-heading text-center">ADMIN-Dashboard</h1>
          <div className="navigation-bar">
            <Link to={`/`}>
              <img src={logo} className="admin-nav-logo" alt="logo"></img>
            </Link>
            <button className="btn btn-yellow" onClick={handleLogOut}>
              Log out
            </button>
          </div>
          <div className="container-1280-width">
            <div className="mentor-signup">
              <MentorSignup />
            </div>
            <div className="admin-body">
              <div className="details-and-request">
                <div className="total-users-count"></div>
                <div className="requests"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
