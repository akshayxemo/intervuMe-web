import PropTypes from "prop-types";
import "./__test__/Signup-login.css";

SignupLoginPage.propTypes = {
  page: PropTypes.element.isRequired,
};
function SignupLoginPage(props) {
  return <div className="authentication-container">{props.page}</div>;
}

export default SignupLoginPage;
