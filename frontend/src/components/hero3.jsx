import feedbackImg from "../assets/Home-feedback-vector-image.svg";
import "../assets/css/hero3.css";
function Hero3() {
  return (
    <>
      <div className="container-lg">
        <div className="container-1280-width hero3-sec">
          <div className="hero3-img">
            <img src={feedbackImg} />
          </div>
          <div className="hero3-text">
            <h1 className="big-heading">
              Get detailed, actionable
              <span className="color-red"> feedback </span>
              from experts
            </h1>
            <p className="big-desc">
              Receive valuable feedback from a senior engineer who has played a
              pivotal role in hiring at FAANG, providing detailed insights on
              your strengths and areas for improvement after each session.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero3;
