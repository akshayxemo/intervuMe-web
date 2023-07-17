import PropTypes from "prop-types";
import quote from "../assets/quota.svg";
import "../assets/css/feedback-card.css";
FeedbackCard.propTypes = {
  id: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  image: PropTypes.node.isRequired,
  quote: PropTypes.node.isRequired,
  date: PropTypes.node.isRequired,
};
function FeedbackCard(props) {
  return (
    <>
      <div className="feedback-card">
        <div className="card-top">
          <div className="user">
            <img src={props.image} className="user-img" />
            <h2 className="f-user-name">{props.name}</h2>
          </div>
          <img src={quote} className="quote-img" />
        </div>
        <div className="card-body">
          <p>{props.quote}</p>
        </div>
        <div className="card-info">
          <p>{props.date}</p>
        </div>
      </div>
    </>
  );
}
export default FeedbackCard;
