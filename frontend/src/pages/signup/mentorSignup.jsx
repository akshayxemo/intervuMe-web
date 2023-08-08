import { useState } from "react";
import "./__test__/signup.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import { MdClose } from "react-icons/md";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function MentorSignup() {
  //   const navigate = useNavigate();
  const timeSlot = {
    zero: [],
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
  };
  const initialFormData = {
    name: "",
    email: "",
    workAt: "",
    role: "",
    password: "",
    gender: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [slot, setSlot] = useState(timeSlot);
  const [time, setTime] = useState(new Date());
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleTimeSlot = (selectedTimeSlot, selectedTime) => {
    setTime(selectedTime);
    const stringData = format(selectedTime, "hh:mm a"); // Your string data to push

    // Update the slot state by pushing stringData into the selected time slot's array
    setSlot((prevSlot) => ({
      ...prevSlot,
      [selectedTimeSlot]: [...prevSlot[selectedTimeSlot], stringData],
    }));
  };

  const handleRemoveTimeSlot = (selectedTimeSlot, index) => {
    // Create a copy of the slot state
    const updatedSlot = { ...slot };

    // Remove the item at the specified index from the selected time slot's array
    updatedSlot[selectedTimeSlot].splice(index, 1);

    // Update the slot state
    setSlot(updatedSlot);
  };

  const convertToNewtimeSlot = (timeSlot) => {
    const newTimeSlot = {};
    Object.keys(timeSlot).forEach((key, index) => {
      newTimeSlot[index] = timeSlot[key];
    });
    return newTimeSlot;
  };

  //   const appendNewKey = () => {
  //     const newTimeSlot = convertToNewtimeSlot(slot);
  //     // Create a new object by spreading the current state and adding the new key-value pair
  //     const newData = {
  //       ...formData,
  //       availableTimes: newTimeSlot,
  //     };

  //     // Update the state with the new object
  //     setFormData(newData);
  //   };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormError("");

      if (formData.password === confirmPassword) {
        // Passwords match, proceed with form submission
        setFormError("");
        setPasswordError("");
        setSubmitError("");

        const form = {
          name: formData.name,
          email: formData.email,
          workAt: formData.workAt,
          role: formData.role,
          password: formData.password,
          gender: formData.gender,
          availableTimes: convertToNewtimeSlot(slot),
        };
        // console.log(form);

        //sending data to the server
        axios
          .post(import.meta.env.VITE_API_URL + "/mentor/signup", form)
          .then((response) => {
            // Handle successful response
            setConfirmPassword("");
            setFormData(initialFormData);
            setSuccess(true);
            setSlot(timeSlot);
            console.log(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
            setTimeout(() => {
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
      formData.role.trim() !== "" &&
      formData.workAt.trim() !== "" &&
      confirmPassword !== ""
    );
  };
  return (
    <>
      <div className="form-admin">
        {success && (
          <Alert severity="success" style={{ marginBottom: "1rem" }}>
            Mentor Added Successfully
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <h1 className="heading text-center">Add a Mentor</h1>
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
            <div className="left-field" style={{ flexGrow: "1" }}>
              <label htmlFor="workAt">Company</label>
              <br />
              <input
                className="full-field"
                type="text"
                id="workAt"
                name="workAt"
                placeholder="company you working for"
                value={formData.workAt}
                onChange={handleInputChange}
              />
            </div>
            <div className="right-field" style={{ flexGrow: "1" }}>
              <label htmlFor="role">Role</label>
              <br />
              <input
                className="full-field"
                type="text"
                id="role"
                name="role"
                placeholder="enter your role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="double-field">
            <div className="left-field" style={{ flexGrow: "1" }}>
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
            <div className="right-field" style={{ flexGrow: "1" }}>
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
          <div className="select-time">
            <div className="day">
              <p>Sunday: </p>
              {slot.zero.map((item, index) => {
                return (
                  <span className="time-slot" key={item + "zero"}>
                    {item}{" "}
                    <MdClose
                      className="delete-time-slot"
                      onClick={() => handleRemoveTimeSlot("zero", index)}
                    />{" "}
                  </span>
                );
              })}
              <DatePicker
                selected={time}
                name="zero"
                onChange={(newTime) => handleTimeSlot("zero", newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="adminDatepicker"
              />
            </div>

            <div className="day">
              <p>Monday: </p>
              {slot.one.map((item, index) => {
                return (
                  <span className="time-slot" key={item + "one"}>
                    {item}{" "}
                    <MdClose
                      className="delete-time-slot"
                      onClick={() => handleRemoveTimeSlot("one", index)}
                    />{" "}
                  </span>
                );
              })}
              <DatePicker
                selected={time}
                name="one"
                onChange={(newTime) => handleTimeSlot("one", newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="adminDatepicker"
              />
            </div>

            <div className="day">
              <p>Tuesday: </p>
              {slot.two.map((item, index) => {
                return (
                  <span className="time-slot" key={item + "two"}>
                    {item}{" "}
                    <MdClose
                      className="delete-time-slot"
                      onClick={() => handleRemoveTimeSlot("two", index)}
                    />{" "}
                  </span>
                );
              })}
              <DatePicker
                selected={time}
                name="two"
                onChange={(newTime) => handleTimeSlot("two", newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="adminDatepicker"
              />
            </div>

            <div className="day">
              <p>Wednesday: </p>
              {slot.three.map((item, index) => {
                return (
                  <span className="time-slot" key={item + "three"}>
                    {item}{" "}
                    <MdClose
                      className="delete-time-slot"
                      onClick={() => handleRemoveTimeSlot("three", index)}
                    />{" "}
                  </span>
                );
              })}
              <DatePicker
                selected={time}
                name="three"
                onChange={(newTime) => handleTimeSlot("three", newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="adminDatepicker"
              />
            </div>

            <div className="day">
              <p>Thursday: </p>
              {slot.four.map((item, index) => {
                return (
                  <span className="time-slot" key={item + "four"}>
                    {item}{" "}
                    <MdClose
                      className="delete-time-slot"
                      onClick={() => handleRemoveTimeSlot("four", index)}
                    />{" "}
                  </span>
                );
              })}
              <DatePicker
                selected={time}
                name="four"
                onChange={(newTime) => handleTimeSlot("four", newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="adminDatepicker"
              />
            </div>

            <div className="day">
              <p>Friday: </p>
              {slot.five.map((item, index) => {
                return (
                  <span className="time-slot" key={item + "five"}>
                    {item}{" "}
                    <MdClose
                      className="delete-time-slot"
                      onClick={() => handleRemoveTimeSlot("five", index)}
                    />{" "}
                  </span>
                );
              })}
              <DatePicker
                selected={time}
                name="five"
                onChange={(newTime) => handleTimeSlot("five", newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="adminDatepicker"
              />
            </div>

            <div className="day">
              <p>Saturday: </p>
              {slot.six.map((item, index) => {
                return (
                  <span className="time-slot" key={item + "six"}>
                    {item}{" "}
                    <MdClose
                      className="delete-time-slot"
                      onClick={() => handleRemoveTimeSlot("six", index)}
                    />{" "}
                  </span>
                );
              })}
              <DatePicker
                selected={time}
                name="six"
                onChange={(newTime) => handleTimeSlot("six", newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="adminDatepicker"
              />
            </div>
          </div>
          {(passwordError && (
            <Alert severity="error" style={{ margin: "1rem" }}>
              {passwordError}
            </Alert>
          )) ||
            (formError && (
              <Alert severity="error" style={{ margin: "1rem" }}>
                {formError}
              </Alert>
            )) ||
            (submitError && (
              <Alert severity="error" style={{ margin: "1rem" }}>
                {submitError}
              </Alert>
            ))}
          <button
            type="submit"
            className="btn-full btn-black-green"
            style={{ fontWeight: "500" }}
          >
            ADD
          </button>
        </form>
      </div>
    </>
  );
}

export default MentorSignup;
