import "./CtaButton.css";

function CtaButton({text}) {
  return(
    <button className="cta-button" role="button">
      <span className="text">{text}</span>
    </button>
  );
}

export default CtaButton;