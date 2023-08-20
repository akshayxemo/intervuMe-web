import { BsFillCheckCircleFill } from "react-icons/bs";
import "./status.css";
import { Link } from "react-router-dom";

export default function SubscriptionSuccess() {
  return (
    <>
      <div className="container-lg">
        <div className="subs-status-box">
          <div className="status-box">
            <BsFillCheckCircleFill className="color-green status-icon" />
            <h2>Payment Successfully Recived</h2>
            <Link to={`/user/dashboard`} className="btn-back">
              Done
            </Link>
          </div>
        </div>
      </div>
      )
    </>
  );
}
