import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import { gsap } from "gsap";
import "./PaymentComplete.css"

function PaymentComplete() {
  const messageRef = useRef(null);

  useEffect(() => {
    gsap.from(messageRef.current.children, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: 0.2,
      stagger: 0.12,
    });

  }, [])

  return (
    <>
      <Navbar />
      <div className="payment-complete-page">
        <div ref={messageRef} className="message">
          <img src="images/payment-complete.png" alt="thank-you-note" />
          <h1>Thank you for your subscription!</h1>
          <p>Your payment is complete, and you're ready to unlock your full pronunciation potential.</p>
          <Link to="/words">Start Your Journey!</Link>
        </div>
      </div>
    </>
  );
}

export default PaymentComplete;