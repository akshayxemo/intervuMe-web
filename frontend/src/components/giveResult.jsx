import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import "../assets/css/giveResult.css";
import BasicSelect from "./select-value-from";
import pic from "../assets/demo-pic.jpg";

export default function GiveResult() {
  const { sessionId, id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [isFilled, setIsFilled] = useState(false);
  const [technicalSkill, setTechnicalSkill] = useState("");
  const [problemSolving, setProblemSolving] = useState("");
  const [communication, setCommunication] = useState("");
  const [resultGiven, setResultGiven] = useState(false);

  const getMenteeDetails = async () => {
    await axios
      .post(import.meta.env.VITE_API_URL + "/user-details", { userId: id })
      .then((response) => {
        console.log(response.data);
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMenteeDetails();
  }, []);

  const recivedTechnicalSkillValue = (value) => {
    setTechnicalSkill(value);
    setIsFilled(false);
  };

  const recivedProblemSolving = (value) => {
    setProblemSolving(value);
    setIsFilled(false);
  };

  const recivedCommunication = (value) => {
    setCommunication(value);
    setIsFilled(false);
  };

  const handleSubmit = async () => {
    if (technicalSkill && problemSolving && communication) {
      const form = {
        userId: id,
        sessionId: sessionId,
        technicalSkill: technicalSkill,
        problemSolving: problemSolving,
        communicationSkill: communication,
      };
      console.log(form);
      await axios
        .post(import.meta.env.VITE_API_URL + "/generate-result", form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log(response);
          setCommunication("");
          setTechnicalSkill("");
          setProblemSolving("");
          setResultGiven(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setIsFilled(true);
    }
  };

  if (resultGiven) {
    return <Navigate to="/mentor/dashboard" replace />;
  }
  return (
    <>
      <div className="container-lg result-wrap">
        <div className="result-back-image"></div>
        <div className="result-card">
          <div className="resultent-person-details">
            <img src={pic} className="user-image" />
            <h1 className="heading">{userDetails.username}</h1>
            <p className="email-info">
              <MdOutlineMail /> {userDetails.emailId}
            </p>
          </div>
          <div className="result-input-fields">
            <div className="skills-result-box">
              <BasicSelect
                sendDataToParent={recivedTechnicalSkillValue}
                base={"Technical Skill"}
                val={technicalSkill}
              />
            </div>
            <div className="skills-result-box">
              <BasicSelect
                sendDataToParent={recivedProblemSolving}
                base={"Problem Solving"}
                val={problemSolving}
              />
            </div>
            <div className="skills-result-box">
              <BasicSelect
                sendDataToParent={recivedCommunication}
                base={"Communication Skill"}
                val={communication}
              />
            </div>
          </div>
          <button className="btn-full btn-black-blue" onClick={handleSubmit}>
            Give the result
          </button>
          {isFilled && (
            <p
              className="color-white bg-red"
              style={{ padding: "1rem", marginTop: "8px", borderRadius: "5px" }}
            >
              Please fill all the field
            </p>
          )}
        </div>
      </div>
    </>
  );
}
