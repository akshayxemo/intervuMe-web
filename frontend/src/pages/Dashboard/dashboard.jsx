import UserNav from "../../layouts/Navbar/user-navbar";
import "./dashboard.css";
import PropTypes from "prop-types";

Dashboard.propTypes = {
  Body: PropTypes.element,
  Chat: PropTypes.element,
};
function Dashboard(props) {
  return (
    <>
      <div className="container-lg-no-pd">
        <div className="dashboard">
          <UserNav />
          <div className="content-layout">
            {props.Body}
            {props.Chat}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
