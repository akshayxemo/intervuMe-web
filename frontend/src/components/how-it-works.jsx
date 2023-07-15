import "../assets/css/how-it-works.css";
import HowItWorksCard from "./card-how-it-works";
import clockIcon from "../assets/clock-icon-white.svg";
import resultIcon from "../assets/result-icon-white.svg";
import interviewIcon from "../assets/virtual-interview-icon-white.svg";

function HowItWorks() {
  const cardItems = [
    { id: 1, text: "Book mock interviews whenever you like.", src: clockIcon },
    {
      id: 2,
      text: "Give Interviewer in virtual 1:1 video session.",
      src: interviewIcon,
    },
    { id: 3, text: "Get detailed, actionable feedback.", src: resultIcon },
  ];
  const cards = cardItems.map((item) => {
    return (
      <HowItWorksCard
        key={item.id}
        id={item.id}
        text={item.text}
        src={item.src}
      />
    );
  });
  return (
    <>
      <div className="container-lg how-it-works">
        <div className="container-1280-width">
          <h1 className="heading text-center">How It Works</h1>
          <div className="how-it-works-cards">{cards}</div>
        </div>
      </div>
    </>
  );
}
export default HowItWorks;
