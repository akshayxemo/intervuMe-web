import PropTypes from "prop-types";
import "../assets/css/card-how-it-works.css";
HowItWorksCard.propTypes = {
  id: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
  src: PropTypes.node.isRequired,
};
function HowItWorksCard(props) {
  return (
    <>
      <div className="card" id={"service-" + props.id}>
        <img src={props.src} />
        <p>{props.text}</p>
      </div>
    </>
  );
}
export default HowItWorksCard;
