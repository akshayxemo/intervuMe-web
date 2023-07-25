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
import { endOfMonth, format } from "date-fns";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Toast from "./toast";

MentorCard.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

function MentorCard({ id, data }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userAdded, setUserAdded] = useState(false);
  const [notSelected, setNotSelected] = useState(true);
  const [sessionResponse, setSessionResponse] = useState();
  const [toastError, setToastError] = useState(false);
  const [availableTimes, setAvailableTimes] = useState({});

  useEffect(() => {
    setAvailableTimes(data.availableTimes);
  }, []);

  const handleUserAdded = () => {
    setUserAdded(!userAdded);
  };

  // Calculate the first day and last day of the current month
  const currentDate = new Date();
  const lastDayOfMonth = endOfMonth(currentDate);

  const filterPassedTime = (time) => {
    // console.log(format(time, "MMMM d, yyyy"));
    // console.log(time.getDay());
    const selected_date = format(time, "MMMM d, yyyy");
    const dayOfWeek = time.getDay();
    // console.log(new Date(`${selected_date} ${availableTimes[dayOfWeek][0]}`));
    const times = availableTimes[dayOfWeek].map((time) => {
      return new Date(`${selected_date} ${time}`).toISOString();
    });

    const currentDate = new Date();
    const selectedDate = new Date(time);
    console.error(selectedDate);
    console.log(times);
    console.log(times.includes(selectedDate.toISOString()));
    return (
      currentDate.getTime() < selectedDate.getTime() &&
      times.includes(selectedDate.toISOString())
    );
  };

  const filterTime = (time) => {
    const selected_date = format(time, "MMMM d, yyyy");
    const dayOfWeek = time.getDay();
    // console.log(new Date(`${selected_date} ${availableTimes[dayOfWeek][0]}`));
    const times = availableTimes[dayOfWeek].map((time) => {
      return new Date(`${selected_date} ${time}`).toISOString();
    });
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime() &&
      times.includes(selectedDate.toISOString())
      ? ""
      : "display-none";
  };

  const handleColor = (time) => {
    return time.getHours() > 12 ? "color-green" : "color-red";
  };

  const getTimeClass = (time) => {
    return `${filterTime(time)} ${handleColor(time)}`;
  };
  // Handler for when a date is selected
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNotSelected(true);
  };

  const handleSessionBooking = async () => {
    if (selectedDate) {
      setSessionResponse(null);
      setToastError(false);
      setNotSelected(true);
      const session = await {
        mentorId: id,
        sessionDate: format(selectedDate, "MMMM d, yyyy"),
        sessionTime: format(selectedDate, "hh:mm a"),
      };
      console.log(session);
      await axios
        .post("http://localhost:3000/session/add", session, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setSessionResponse(response.data.message);
          setSelectedDate(null);
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response.data.details);
          setSessionResponse(err.response.data.error);
          setToastError(true);
        });
    } else {
      setNotSelected(false);
      console.error("select a date");
    }
  };

  return (
    <>
      {sessionResponse && (
        <Toast value={sessionResponse} error={toastError} show={true} />
      )}
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
            timeIntervals={60}
            timeCaption="Time"
            filterTime={filterPassedTime}
            timeClassName={getTimeClass}
            dateFormat="MMMM d, yyyy-hh:mm a"
            placeholderText="Select Date and Time"
            className={
              notSelected
                ? "Date-Time-Picker"
                : "Date-Time-Picker border-red placeholder-red"
            }
            calendarClassName="custom-time-slot"
            withPortal
          />
          <button
            className="btn-auto btn-black-green"
            onClick={handleSessionBooking}
          >
            {" "}
            Book{" "}
          </button>
        </div>
        {!notSelected && (
          <span className="color-red">please select a date and time</span>
        )}
      </div>
    </>
  );
}

export default MentorCard;
