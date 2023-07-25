import demoImg from "../assets/demo-pic.jpg";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";
import {
  MdOutlineMail,
  MdOutlinePersonAdd,
  MdOutlineHowToReg,
} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { endOfMonth } from "date-fns";
import { useState } from "react";
import PropTypes from "prop-types";

MentorCard.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

function MentorCard({ id, data }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userAdded, setUserAdded] = useState(false);

  const handleUserAdded = () => {
    setUserAdded(!userAdded);
  };

  // Calculate the first day and last day of the current month
  const currentDate = new Date();
  const lastDayOfMonth = endOfMonth(currentDate);

  // Handler for when a date is selected
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="mentor-card" id={id}>
        <div className="mentor-card-top">
          <div className="mentor-card-top-body">
            <img src={demoImg} alt="" className="mentor-img" />
            <div className="mentor-body">
              <h1 className="mentor-name">{data.username}</h1>
              <p className="mentor-role">{data.role}</p>
              <p
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <MdOutlineMail /> {data.emailId}
              </p>
              <div className="socials mentor-socials">
                <a href="" className="color-gray">
                  <FaFacebook className="facebook" />
                </a>{" "}
                <a href="" className="color-gray">
                  <FaTwitter className="twitter" />
                </a>{" "}
                <a href="" className="color-gray">
                  <FaLinkedin className="linkedin" />
                </a>{" "}
                <a href="" className="color-gray">
                  <FaInstagram className="instagram" />
                </a>{" "}
              </div>
            </div>
          </div>
          {!userAdded ? (
            <MdOutlinePersonAdd
              className="mentor-chat color-blue"
              onClick={handleUserAdded}
            />
          ) : (
            <MdOutlineHowToReg
              className="mentor-chat color-green"
              onClick={handleUserAdded}
            />
          )}
        </div>
        <div className="mentor-booking">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={lastDayOfMonth}
            showTimeSelect
            timeFormat="hh:mm a"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy hh:mm a"
            placeholderText="Select Date and Time"
            className="Date-Time-Picker"
            calendarClassName="custom-time-slot"
          />
          <button className="btn-auto btn-black-green"> Book </button>
        </div>
      </div>
    </>
  );
}

export default MentorCard;
