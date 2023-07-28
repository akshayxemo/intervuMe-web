import { MdOutlineSchedule, MdOutlineDateRange } from "react-icons/md";
import "../assets/css/card-user-session.css";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

UserSessionCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
export default function UserSessionCard(props) {
  console.log(
    `date : ${format(parseISO(props.date), "eee, d MMM yyyy, hh:mm a")}`
  );
  return (
    <>
      <div className="session-wrap">
        <div className="mentor-wrap">
          <div className="mentor-info">
            <h3 className="mentor-name">{props.name}</h3>
            <span className="mentor-title color-red">Mentor</span>
          </div>
          <p className="mentor-desc">{props.role}</p>
        </div>
        <div className="separator"></div>
        <div className="session-time-wrap">
          <div className="session-time">
            <MdOutlineSchedule className="schedule-icon" />
            <p className="schedule-text">
              {format(parseISO(props.date), "hh:mm a")}
            </p>
          </div>
          <div className="session-date">
            <MdOutlineDateRange className="schedule-icon" />
            <p className="schedule-text">
              {format(parseISO(props.date), "eee, d MMM yyyy")}
            </p>
          </div>
        </div>
        <div className="separator"></div>
        <div className="session-status-wrap">
          <div className="session-status">
            <div
              className={
                props.status == "completed"
                  ? "status-color bg-green"
                  : props.status == "upcoming"
                  ? "status-color bg-yellow"
                  : props.status == "ongoing"
                  ? "status-color bg-blue"
                  : "status-color bg-red"
              }
            ></div>
            <p className="status-info">{props.status}</p>
            <Link
              to={`/video-room?sessionToken=${props.token}`}
              target="_blank"
              className="btn"
            >
              Join Meeting
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
