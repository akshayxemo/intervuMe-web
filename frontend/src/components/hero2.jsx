import bookingImg from "../assets/Home-booking-vector-image.svg";
import "../assets/css/hero2.css";
function Hero2() {
  return (
    <>
      <div className="container-lg">
        <div className="container-1280-width hero2-sec">
          <div className="hero2-text">
            <h1 className="big-heading">
              Book technical{" "}
              <span className="color-green">mock interviews </span>
              with engineers from top companies
            </h1>
            <p className="big-desc">
              Connect with a seasoned senior engineer who has conducted
              interviews at renowned companies, simulating real interview
              scenarios with relevant questions.
            </p>
          </div>
          <div className="hero2-img">
            <img src={bookingImg} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Hero2;
