import "./home.css";
import Navbar from "../../layouts/Navbar/navbar";
import Hero from "../../components/hero";
import Hero2 from "../../components/hero2";
import Hero3 from "../../components/hero3";
import HomeFeedback from "../../components/home-feedbacks";
import Footer from "../../layouts/Footer/footer";
import HowItWorks from "../../components/how-it-works";
function Home() {
  return (
    <>
      <div className="gredient-bg container-lg">
        <Navbar />
        <Hero />
      </div>
      <HowItWorks />
      <Hero2 />
      <Hero3 />
      <HomeFeedback />
      <Footer />
    </>
  );
}

export default Home;
