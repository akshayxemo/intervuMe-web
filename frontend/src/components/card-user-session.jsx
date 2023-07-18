import { MdOutlineSchedule, MdOutlineDateRange } from "react-icons/md";
import "../assets/css/card-user-session.css";
export default function UserSessionCard() {
  return (
    <>
      <div className="session-wrap">
        <div className="mentor-wrap">
          <div className="mentor-info">
            <h3 className="mentor-name">Jenifer Mikelson</h3>
            <span className="mentor-title color-red">Mentor</span>
          </div>
          <p className="mentor-desc">Full Stack Developer at Google</p>
        </div>
        <div className="separator"></div>
        <div className="session-time-wrap">
          <div className="session-time">
            <MdOutlineSchedule className="schedule-icon" />
            <p className="schedule-text">12:30 PM</p>
          </div>
          <div className="session-date">
            <MdOutlineDateRange className="schedule-icon" />
            <p className="schedule-text">Aug 2, 2023</p>
          </div>
        </div>
        <div className="separator"></div>
        <div className="session-status-wrap">
          <div className="session-status">
            <div className="status-color bg-green"></div>
            <p className="status-info">Completed</p>
          </div>
        </div>
      </div>
    </>
  );
}
