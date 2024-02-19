import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

import "./PaymentForm.css";

export default function PaymentForm() {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
      redirect: 'if_required',
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } 
    else if (paymentIntent?.status === "succeeded") {
      // Handle successful payment
      navigate("/payment-complete");
    }  
    else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  const showPaymentForm = () => {
    setIsFormLoaded(true);
  };

  return (
    <>
    {!isFormLoaded && <h2 className="payment-loading">Please Wait...</h2>}
    <form className={`payment-form ${isFormLoaded && "loaded"}`} id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" onLoaderStart={showPaymentForm} />
      <button className="payment-btn btn" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Subscribe Now"}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </>
  );
}