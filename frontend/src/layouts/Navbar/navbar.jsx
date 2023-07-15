import logo from "../../assets/intervuMe-original-black-logo.svg";
import "./css/navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="container-1280-width nav-flex">
          <Link to={`/`}>
            <img src={logo} className="nav-logo"></img>
          </Link>
          <div>
            <p>
              <Link to={`/auth/login`} style={{ fontWeight: "600" }}>
                Login &nbsp; &rarr;
              </Link>
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
