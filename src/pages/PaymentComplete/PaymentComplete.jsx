import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import "./PaymentComplete.css"

function PaymentComplete() {
  return (
    <>
      <Navbar />
      <div className="payment-complete-page">
        <div className="message">
          <img src="images/payment-complete.png" alt="thank-you-note" />
          <h1>Your Payment is Successful!</h1>
          <p>You've done it! Your payment is complete, and you're ready to unlock your full pronunciation potential.</p>
          <Link to="/words">Start Your Journey!</Link>

        </div>
      </div>
    </>
  );
}

export default PaymentComplete;