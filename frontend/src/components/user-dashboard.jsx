import demoImg from "../assets/demo-img.png";
import "../assets/css/user-dashboard.css";
import UserDashboardChart from "./user-dashboard-chart";
import UserSessionCard from "./card-user-session";
// import { subDays } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// const data = [];
// function randomNumber(min, max) {
//   return (Math.random() * (max - min) + min).toFixed(2);
// }

// for (let num = 7; num >= 0; num--) {
//   data.push({
//     date: subDays(new Date(), num).toISOString(),
//     technicalSkill: randomNumber(1, 5),
//     problemSolving: randomNumber(1, 5),
//     communication: randomNumber(1, 5),
//   });
// }
function UserDashboard() {
  const [userdata, setUserData] = useState(null);
  const [sessionData, setSessionData] = useState([]);
  const [updateSession, setUpdateSession] = useState();
  const [data, setData] = useState([]);
  const roughData = [];
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/user/dashboard",
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

    const searchResults = async () => {
      await axios
        .get(import.meta.env.VITE_API_URL + "/user-results", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          console.log(data);
          if (roughData.length === 0) {
            response.data.forEach((item) => {
              roughData.push({
                date: item.date,
                technicalSkill: item.result.technicalSkill,
                problemSolving: item.result.problemSolving,
                communicationSkill: item.result.communicationSkill,
              });
            });
          }
          roughData.sort((a, b) => new Date(a.date) - new Date(b.date));
          console.log(roughData);
          setData(roughData);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    // Function to fetch data from the server
    fetchData();
    searchResults();
    // window.location.reload();
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
        {/*.................. charts ..............*/}
        <div className="performance-chart">
          <div className="performance-header">
            <h1 className="performance-title">performance</h1>
            {data.length !== 0 ? (
              <UserDashboardChart data={data} />
            ) : (
              <div className="No-session">
                You dont have any performance result to show
              </div>
            )}
          </div>
        </div>
        <div className="interview-sessions">
          <div className="session-header">
            <h1 className="session-title">My Sessions</h1>
          </div>
          <div className="session-list">
            {sessionData.map((item) => {
              return (
                <UserSessionCard
                  key={item._id}
                  id={item._id}
                  mentorId={item.mentorId}
                  name={item.mentorName}
                  role={item.mentorRole}
                  email={item.mentorEmail}
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
export default UserDashboard;
