import PropTypes from "prop-types";
import { useEffect } from "react";
import { MdOutlineCheckCircle, MdErrorOutline } from "react-icons/md";
Toast.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};
function Toast({ value, error, show }) {
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
  }, []);
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

export default Toast;
