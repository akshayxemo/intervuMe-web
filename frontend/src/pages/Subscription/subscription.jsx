import { MdCheck, MdClose } from "react-icons/md";
import Navbar from "../../layouts/Navbar/navbar";
import "./subscription.css";
import Footer from "../../layouts/Footer/footer";
export default function Subscription() {
  return (
    <>
      <div className="container-lg-no-pd flexfit">
        <div className="container-lg">
          <Navbar />
          <div className="container-1280-width ">
            <div className="subscription-sec">
              <div className="subscription-card bg-white">
                <h1 className="subs-heading">{"Plus"}</h1>
                <div className="plan-details">
                  <p className="plan-item">
                    <MdCheck className="color-green" /> &nbsp; 1:1 video call (2
                    per month)
                  </p>
                  <p className="plan-item">
                    <MdCheck className="color-green" /> &nbsp; Get Performance
                    result
                  </p>
                  <p className="plan-item">
                    <MdClose className="color-red" /> &nbsp; Chat with mentor
                  </p>
                  <p className="plan-item">
                    <MdCheck className="color-green" /> &nbsp; Unlimited Mock
                    test
                  </p>
                </div>
                <button className="btn-full btn-blue">
                  &#8377; 999 / month
                </button>
              </div>

              <div className="subscription-card bg-gray color-white">
                <h1 className="subs-heading">{"Pro"}</h1>
                <div className="plan-details">
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; 1:1 video call (4
                    per month)
                  </p>
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; Get Performance
                    result
                  </p>
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; Chat with mentor
                  </p>
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; Unlimited Mock
                    test
                  </p>
                </div>
                <button className="btn-full btn-green">
                  &#8377; 2599 / month
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
