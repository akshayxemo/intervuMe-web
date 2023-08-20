import { BsFillXCircleFill } from "react-icons/bs";
import "./status.css";
import { Link } from "react-router-dom";

export default function SubscriptionCancel() {
  return (
    <>
      <div className="container-lg">
        <div className="subs-status-box">
          <div className="status-box">
            <BsFillXCircleFill className="color-red status-icon" />
            <h2>Payment Failure</h2>
            <Link to={`/user/subscriptions`} className="btn-back">
              go back
            </Link>
          </div>
        </div>
      </div>
      )
    </>
  );
}
