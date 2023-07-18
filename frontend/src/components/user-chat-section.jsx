import "../assets/css/user-chat-section.css";
import demoImg from "../assets/demo-pic.png";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";
export default function UserChat() {
  return (
    <>
      <div className="chat-section-wrap">
        <div className="reciver-details">
          <img src={demoImg} className="reciver-img" />
          <h1 className="reciver-name">Jenifer Mikelson</h1>
          <p className="reciver-desc">Full Stack Developer at Google</p>
          <div className="socials">
            <FaFacebook className="social-icon" />
            <FaLinkedin className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaTwitter className="social-icon" />
          </div>
        </div>
        <div className="span-tag">--- Activity ---</div>
        <div className="chat-section"></div>
        <div className="send-message-section"></div>
      </div>
    </>
  );
}
