import { Link } from "react-router-dom";
import "./CtaButton.css";

function CtaButton({text}) {
  return(
    <Link to="/analyze-sentences" className="cta-button" role="button">
      <span className="text">{text}</span>
    </Link>
  );
}

export default CtaButton;