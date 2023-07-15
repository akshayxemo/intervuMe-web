import Promo from "./promotion-oppertunity";
import { Link } from "react-router-dom";
import "../assets/css/hero.css";
function Hero() {
  return (
    <>
      <div className="container-1280-width flex-center-column text-center hero-container">
        <h1 className="hero-heading">
          Ace Your Interviews <br /> with personalized 1:1 mentorship
        </h1>
        <Link to={`/auth/signup`} className="btn btn-yellow">
          Start Your Journey
        </Link>
        <p className="text-center">
          There&apos;s a FREE TRIAL SESSION that you can use to
          <br />
          find your perfect match
        </p>
        <Promo />
      </div>
    </>
  );
}

export default Hero;
