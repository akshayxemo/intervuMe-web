import UserNav from "../../layouts/Navbar/user-navbar";
import "./dashboard.css";
import PropTypes from "prop-types";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { useState, useEffect } from "react";
Dashboard.propTypes = {
  Body: PropTypes.element,
  Chat: PropTypes.element,
};
function Dashboard(props) {
  const [navShow, setNavShow] = useState(true);
  const handleNavShow = () => {
    setNavShow(!navShow);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setNavShow(false);
      } else {
        setNavShow(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="container-lg-no-pd">
        <div className="dashboard">
          <div
            className={
              navShow ? "user-nav user-nav-full" : "user-nav user-nav-none"
            }
          >
            <UserNav func={handleNavShow} navControl={setNavShow} />
          </div>
          <div className="content-layout">
            <div className="nav-control-btn" onClick={handleNavShow}>
              {navShow ? (
                <MdOutlineChevronLeft className="nav-control-icon" />
              ) : (
                <MdOutlineChevronRight className="nav-control-icon" />
              )}
            </div>
            <div className="dashboard-container">{props.Body}</div>
            <div className="dashboard-chat-container">{props.Chat}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
