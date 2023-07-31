import "./__test__/signup.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgetPasswordForm() {
  const initialFormData = {
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormError("");
      console.log(formData);
      axios
        .post(import.meta.env.VITE_API_URL + "/forget-password", formData)
        .then((response) => {
          // Handle successful response
          setFormError("");
          setFormData(initialFormData);
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } else {
      setFormError("Please fill in all the fields.");
    }
  };

  const validateForm = () => {
    return formData.email.trim() !== "";
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <p className="mini-heading color-red">Password Recovery</p>
        <h1 className="heading-2">Forget Password!</h1>
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
        {formError && <p className="form-error-msg">{formError}</p>}
        <button type="submit" className="btn-full btn-black-blue">
          Submit
        </button>
      </form>
      <p className="alternate-option">
        Dont Have any account? <Link to={`/auth/signup`}>SignUp</Link>
      </p>
    </div>
  );
}

export default ForgetPasswordForm;
