import PropTypes from "prop-types";
import "./__test__/signup-login.css";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { Link } from "react-router-dom";

SignupLoginPage.propTypes = {
  page: PropTypes.element.isRequired,
};
function SignupLoginPage(props) {
  return (
    <div className="authentication-container">
      <Link to={`/`} className="tooltip">
        <MdOutlineArrowCircleLeft className="backicon" />
        <span className="tooltiptext">Go Home</span>
      </Link>
      {props.page}
    </div>
  );
}

export default SignupLoginPage;
