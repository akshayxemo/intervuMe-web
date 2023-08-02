import {
  MdOutlineSchedule,
  MdOutlineDateRange,
  MdOutlineEmail,
  MdClose,
} from "react-icons/md";
import "../assets/css/card-user-session.css";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useState } from "react";

UserSessionCard.propTypes = {
  id: PropTypes.string.isRequired,
  mentorId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  result: PropTypes.object,
  resultStatus: PropTypes.string.isRequired,
};

const labels = {
  0.5: "Very Bad",
  1: "Bad",
  1.5: "Very Poor",
  2: "Poor",
  2.5: "Ok",
  3: "Normal",
  3.5: "Good",
  4: "Very Good",
  4.5: "Excellent",
  5: "Outstanding",
};

export default function UserSessionCard(props) {
  const [showDetails, setShowDetails] = useState(false);

  const showResult = async () => {
    setShowDetails(!showDetails);
  };

  const getLabel = (value) => {
    return `${labels[value]}`;
  };

  return (
    <>
      {showDetails && (
        <div className="resultcard">
          <div
            className="close-result-btn bg-blue color-white"
            onClick={showResult}
          >
            <MdClose />
          </div>
          <div className="mentor">
            <p className="color-red">mentor</p>
            <h1 className="heading">{props.name}</h1>
            <p>{props.role}</p>
            <p
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <MdOutlineEmail /> {props.email}
            </p>
          </div>
          <div className="result">
            <div className="result-item">
              <h1>Technical Skill : </h1>
              <span>
                <h1>{props.result.technicalSkill}</h1>
                {getLabel(props.result.technicalSkill)}
              </span>
            </div>
            <div className="result-item">
              <h1>Problem Solving : </h1>
              <span>
                <h1>{props.result.problemSolving}</h1>
                {getLabel(props.result.problemSolving)}
              </span>
            </div>
            <div className="result-item">
              <h1>Communication Skill : </h1>
              <span>
                <h1>{props.result.communicationSkill}</h1>
                {getLabel(props.result.communicationSkill)}
              </span>
            </div>
          </div>
          <p className="session-date-time">
            {format(parseISO(props.date), "eee, d MMM yyyy, hh:mm a")}
          </p>
        </div>
      )}
      <div className="session-wrap">
        <div className="mentor-wrap">
          <div className="mentor-info">
            <h3 className="mentor-name">{props.name}</h3>
            <span className="mentor-title color-red">Mentor</span>
          </div>
          <p className="mentor-desc">{props.role}</p>
          <p
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <MdOutlineEmail /> {props.email}
          </p>
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
            {props.status === "ongoing" ? (
              <Link
                to={`/video-room/${props.id}/${props.mentorId}?sessionToken=${props.token}&mentorName=${props.name}`}
                className="btn"
                style={{
                  padding: "0.5rem",
                  minWidth: "100px",
                  marginLeft: "1rem",
                }}
              >
                Join Meeting
              </Link>
            ) : null}
            {props.resultStatus === "published" ? (
              <div
                className="btn btn-transparent color-green"
                style={{
                  padding: "0.5rem",
                  minWidth: "100px",
                  marginLeft: "1rem",
                }}
                onClick={showResult}
              >
                View Result
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
