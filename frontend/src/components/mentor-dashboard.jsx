import demoImg from "../assets/demo-img.png";
import "../assets/css/user-dashboard.css";

import MentorSessionCard from "./card-mentor-session";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function MentorDashboard() {
  const [userdata, setUserData] = useState(null);
  const [sessionData, setSessionData] = useState([]);
  const [updateSession, setUpdateSession] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/mentor/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data.username);
        if (response.data.sessions) {
          const sortedSessions = response.data.sessions.sort((a, b) => {
            if (
              (a.status === "upcoming" && b.status !== "upcoming") ||
              (a.status === "ongoing" && b.status !== "ongoing")
            ) {
              return -1;
            } else if (
              (a.status !== "upcoming" && b.status === "upcoming") ||
              (a.status !== "ongoing" && b.status === "ongoing")
            ) {
              return 1;
            } else {
              return a.sessionDate.localeCompare(b.sessionDate);
            }
          });
          setSessionData(sortedSessions);
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    // Function to fetch data from the server
    fetchData();
  }, [updateSession]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL + "", {
      query: { token: token },
    });
    try {
      socket.on("connect", () => {
        console.log("Connected to server", socket.id);
        socket.emit("joinRoom", token);
      });
      socket.on("sessionUpdateds", (session) => {
        console.log("recived");
        console.log(session);
        setUpdateSession(session);
      });
      socket.on("NewBooking-MentorNotification", (session) => {
        setUpdateSession(session);
      });
    } catch (err) {
      console.error(err);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="dashboard-body">
        <div className="user-info-wrap">
          <div className="user-info">
            <h1 className="user-name">Hello, {userdata}</h1>
            <p className="sub-line">Track your progress here. Keep it Up.</p>
          </div>
          <div className="user-image-wrap">
            <img src={demoImg} className="user-image" />
          </div>
        </div>
        <div className="interview-sessions">
          <div className="session-header">
            <h1 className="session-title">My Sessions</h1>
          </div>
          <div className="session-list">
            {sessionData.map((item) => {
              return (
                <MentorSessionCard
                  key={item._id}
                  sessionId={item._id}
                  userId={item.userId}
                  name={item.userName}
                  email={item.userEmail}
                  date={item.sessionDate}
                  time={item.sessionTime}
                  status={item.status}
                  token={item.sessionToken}
                  result={item.result}
                  resultStatus={item.resultStatus}
                />
              );
            })}
            {!sessionData.length && (
              <div className="No-session">No Session found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default MentorDashboard;
