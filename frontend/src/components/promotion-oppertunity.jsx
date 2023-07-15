import "../assets/css/promotion-oppertunity.css";
import hikeImg from "../assets/hike.svg";
import googleIcon from "../assets/google-icon.svg";
import amazonIcon from "../assets/amazon-icon.svg";
import youtubeIcon from "../assets/youtube-icon.svg";
import windowsIcon from "../assets/windows-icon.svg";
function PromoOpper() {
  return (
    <>
      <div className="promo-sec">
        <div className="promo-item">
          <img src={hikeImg} height={"40px"} />
          <div className="hike-text">
            <h1>150%</h1>
            <p>Average Hike</p>
          </div>
        </div>
        <span className="vertical-mini-line"></span>
        <div className="promo-item">
          <p>
            Get Placed At Top <br />
            Companies Like
          </p>
        </div>
        <span className="vertical-mini-line"></span>
        <div className="promo-item">
          <img src={googleIcon} alt="Google" className="promo-icon" />
          <img src={amazonIcon} alt="Amazon" className="promo-icon" />
          <img src={windowsIcon} alt="Windows" className="promo-icon" />
          <img src={youtubeIcon} alt="Youtube" className="promo-icon" />
        </div>
      </div>
    </>
  );
}

export default PromoOpper;
