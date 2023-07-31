import "../assets/css/mentors.css";
import MentorCard from "./card-mentor";
import axios from "axios";
import { useState, useEffect } from "react";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/mentors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data.mentor);
        setMentors(response.data.mentor);
      });
  }, []);

  console.log("console", mentors);
  return (
    <>
      <div className="mentors-header">
        <h1 className="mentors-title">MENTORS</h1>
        <p className="mentors-desc">
          you can look for mentors and book an interview session or add them to
          your chat room
        </p>
      </div>
      <div className="mentorbody">
        {mentors.length !== 0 ? (
          mentors.map((mentor) => {
            return (
              <MentorCard key={mentor._id} id={mentor._id} data={mentor} />
            );
          })
        ) : (
          <p className="color-red text-center" style={{ width: "100%" }}>
            No Mentors found
          </p>
        )}
      </div>
    </>
  );
}

export default Mentors;
