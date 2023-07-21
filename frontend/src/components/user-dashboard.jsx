import demoImg from "../assets/demo-img.png";
import "../assets/css/user-dashboard.css";
import UserDashboardChart from "./user-dashboard-chart";
import UserSessionCard from "./card-user-session";
import { subDays } from "date-fns";
import axios from "axios";
import { useEffect, useState } from "react";
const data = [];
function randomNumber(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

for (let num = 7; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString(),
    technicalSkill: randomNumber(1, 5),
    problemSolving: randomNumber(1, 5),
    communication: randomNumber(1, 5),
  });
}

function UserDashboard() {
  const [userdata, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

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
            <UserDashboardChart data={data} />
          </div>
        </div>
        <div className="interview-sessions">
          <div className="session-header">
            <h1 className="session-title">My Sessions</h1>
          </div>
          <div className="session-list">
            <UserSessionCard />
            <UserSessionCard />
            <UserSessionCard />
            <UserSessionCard />
          </div>
        </div>
      </div>
    </>
  );
}
export default UserDashboard;
