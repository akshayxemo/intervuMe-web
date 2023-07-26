import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdOutlineCheckCircle, MdErrorOutline, MdClose } from "react-icons/md";
import "../assets/css/toast.css";
import bot from "../assets/bot.png";
import notificationSound from "../assets/notification.wav";

Toast.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};
export function Toast({ value, error, show }) {
  useEffect(() => {
    if (show) {
      var x = document.getElementById("snackbar");
      if (error) {
        x.className = "show bg-red color-white";
      } else x.className = "show bg-green color-white";
    }
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }, [show, error]);
  return (
    <>
      <div id="snackbar">
        {error ? (
          <MdErrorOutline style={{ fontSize: "1.5rem", height: "40px" }} />
        ) : (
          <MdOutlineCheckCircle
            style={{ fontSize: "1.5rem", height: "40px" }}
          />
        )}
        <div>{value}</div>
      </div>
    </>
  );
}

Notification.propTypes = {
  value: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};
export function Notification({ value, show }) {
  const [showNoti, setShowNoti] = useState(false);
  const CloseNotification = () => {
    setShowNoti(!showNoti);
  };
  useEffect(() => {
    // Create an <audio> element and load the sound file
    const audioElement = new Audio(notificationSound);

    // Play the sound when the component mounts
    audioElement.play();

    // Cleanup function to stop the sound when the component unmounts
    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (show) {
      setShowNoti(show);
    }
    setTimeout(function () {
      setShowNoti(false);
    }, 10000);
  }, [show]);
  return (
    <>
      <div id="Notification" className={showNoti ? "show" : ""}>
        <div className="notification-body">
          <MdClose className="toast-close" onClick={CloseNotification} />
          <img src={bot} alt="bot image" className="notification-bot" />
          <div className="notification-text">
            <p className="n-text">{value}</p>
          </div>
        </div>
      </div>
    </>
  );
}
