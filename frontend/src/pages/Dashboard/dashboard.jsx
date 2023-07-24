// import UserNav from "../../layouts/Navbar/user-navbar";
import "./dashboard.css";
import PropTypes from "prop-types";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineClose,
  MdSms,
} from "react-icons/md";
import { useState, useEffect } from "react";
Dashboard.propTypes = {
  Nav: PropTypes.elementType,
  Body: PropTypes.element,
  Chat: PropTypes.element,
};
function Dashboard({ Nav, Body, Chat }) {
  const [navShow, setNavShow] = useState(true);
  const [chatShow, setChatShow] = useState(false);
  const [navShowContent, setNavShowContent] = useState(true);
  const handleChatShow = () => {
    setChatShow(!chatShow);
  };
  const handleNavShow = () => {
    setNavShow(!navShow);
    // setNavShowContent(!navShow);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setNavShow(false);
        setNavShowContent(false);
      } else {
        setNavShow(true);
        setNavShowContent(true);
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
              navShow
                ? "user-nav user-nav-full"
                : "user-nav user-nav-none display-none"
            }
          >
            <Nav func={handleNavShow} navControl={setNavShow} />
          </div>
          <div
            className={
              navShow && navShowContent
                ? "content-layout content-layout-clipped"
                : "content-layout content-layout-full"
            }
          >
            <div className="nav-control-btn" onClick={handleNavShow}>
              {navShow ? (
                <MdOutlineChevronLeft className="nav-control-icon" />
              ) : (
                <MdOutlineChevronRight className="nav-control-icon" />
              )}
            </div>
            <div
              className={
                chatShow
                  ? "dashboard-container dashboard-container-clapped"
                  : "dashboard-container dashboard-container-full"
              }
            >
              {Body}
            </div>
            <div
              className={
                chatShow
                  ? "dashboard-chat-container chat-container-full"
                  : "dashboard-chat-container chat-container-none"
              }
            >
              <div className="chat-icon-wrap" onClick={handleChatShow}>
                <MdSms className="chat-icon" />
              </div>
              <MdOutlineClose
                className={chatShow ? "close-chat" : "display-none"}
                onClick={handleChatShow}
              />
              {chatShow ? Chat : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
