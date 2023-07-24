import "../assets/css/mentors.css";
import demoImg from "../assets/demo-pic.png";
import {
  FaCommentDots,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaAt,
} from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { endOfMonth } from "date-fns";
import { useState } from "react";

function Mentors() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Calculate the first day and last day of the current month
  const currentDate = new Date();
  const lastDayOfMonth = endOfMonth(currentDate);

  // Handler for when a date is selected
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="mentorbody">
        <div className="mentor-card">
          <div className="mentor-card-top">
            <div className="mentor-card-top-body">
              <img src={demoImg} alt="" className="mentor-img" />
              <div className="mentor-body">
                <h1 className="mentor-name">Abhisek Chatterjee</h1>
                <p className="mentor-role">Software engineer at google</p>
                <div className="socials mentor-socials">
                  <FaFacebook className="facebook" />{" "}
                  <FaTwitter className="twitter" />{" "}
                  <FaLinkedin className="linkedin" />{" "}
                  <FaInstagram className="instagram" />{" "}
                  <FaAt className="email" />
                </div>
              </div>
            </div>
            <FaCommentDots className="mentor-chat color-blue" />
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
      </div>
    </>
  );
}

export default Mentors;
