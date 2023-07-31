import { useState } from "react";
import "./__test__/signup.css";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Loader from "../../components/loader";
import { useAuth } from "../../router/AuthContext";
function SignupForm() {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    gender: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    // Redirect to dashboard if already logged in
    return <Navigate to="/user/dashboard" />;
  }
  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormError("");

      if (formData.password === confirmPassword) {
        // Passwords match, proceed with form submission
        setFormError("");
        setPasswordError("");
        setSubmitError("");
        setIsLoading(true);

        //sending data to the server
        axios
          .post(import.meta.env.VITE_API_URL + "/signup", formData)
          .then((response) => {
            // Handle successful response
            setConfirmPassword("");
            setFormData(initialFormData);
            console.log(response.data);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/auth/success");
            }, 2500);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
            setTimeout(() => {
              setIsLoading(false);
              setSubmitError(error.response.data.message);
            }, 2500);
          });
        console.log(formData);
      } else {
        // Passwords do not match
        setPasswordError("Passwords do not match");
      }
    } else {
      setFormError("Please fill in all the fields.");
    }
  };

  const validateForm = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.gender.trim() !== "" &&
      confirmPassword !== ""
    );
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            {/* <p className="mini-heading color-blue">lets get started</p> */}
            <h1 className="heading-2 text-center">Create an Account</h1>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="full-field"
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email Id</label>
            <br />
            <input
              className="full-field"
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="double-field">
              <div className="left-field">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  className="full-field"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="right-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <br />
                <input
                  className="full-field"
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordInput}
                />
              </div>
            </div>

            <div className="gender-form">
              <label htmlFor="">Gender: </label>
              <div className="option">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />{" "}
                Male
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />{" "}
                Female
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="others"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleInputChange}
                />{" "}
                Others
              </div>
            </div>
            {(passwordError && (
              <p className="form-error-msg">{passwordError}</p>
            )) ||
              (formError && <p className="form-error-msg">{formError}</p>) ||
              (submitError && (
                <p className="server-error-msg">{submitError}</p>
              ))}
            <button
              type="submit"
              className="btn-full btn-black-green"
              style={{ fontWeight: "500" }}
            >
              Sign up
            </button>
          </form>
          <p className="alternate-option">
            Already have an account? &nbsp;
            <Link to={`/auth/login`}>Login</Link>
          </p>
        </div>
      )}
    </>
  );
}

export default SignupForm;
