import "./home.css";
import Navbar from "../../layouts/Navbar/navbar";
import Hero from "../../components/hero";
import HowItWorks from "../../components/how-it-works";
function Home() {
  return (
    <>
      <div className="gredient-bg container-lg">
        <Navbar />
        <Hero />
      </div>
      <HowItWorks />
    </>
  );
}

export default Home;
