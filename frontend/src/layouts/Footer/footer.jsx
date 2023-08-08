import "./footer.css";
import logo from "../../assets/intervuMe-original-gray-logo.svg";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";
import { useAuth } from "../../router/AuthContext";

function Footer() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div className="container-lg bg-black">
        <div className="container-1280-width footer">
          <Link to={`/`}>
            <img src={logo} />
          </Link>
          <p>Copyright © 2022 intervuMe</p>
          <div className="social-icons">
            <a href="#" target="_blank">
              <FaFacebook className="social-icon facebook" />
            </a>
            <a href="#" target="_blank">
              <FaTwitter className="social-icon twitter" />
            </a>
            <a href="#" target="_blank">
              <FaInstagram className="social-icon instagram" />
            </a>
            <a href="#" target="_blank">
              <FaLinkedin className="social-icon linkedin" />
            </a>
          </div>
        </div>
        {isAuthenticated() ? (
          ""
        ) : (
          <div
            style={{
              paddingBottom: "1rem",
              width: "100%",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Link to={`/admin/login`} className="btn btn-black-blue">
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Footer;
