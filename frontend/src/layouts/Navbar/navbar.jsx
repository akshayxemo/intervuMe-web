import logo from "../../assets/intervuMe-original-black-logo.svg";
import "./css/navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../router/AuthContext";
function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const threshold = 300;
      const visible = prevScrollPos > currentScrollPos;

      setVisible(currentScrollPos > threshold ? visible : false);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <>
      <nav className={visible ? "nav-sticky" : "navbar"} id="nav">
        <div className="container-1280-width nav-flex">
          <Link to={`/`}>
            <img src={logo} className="nav-logo"></img>
          </Link>
          <div>
            <p>
              {isAuthenticated() ? (
                <Link to={`/user/dashboard`} style={{ fontWeight: "600" }}>
                  Dashboard &nbsp; &rarr;
                </Link>
              ) : (
                <Link to={`/auth/login`} style={{ fontWeight: "600" }}>
                  Login &nbsp; &rarr;
                </Link>
              )}
              <Link to={`/mentor/login`} style={{ fontWeight: "600" }}>
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
