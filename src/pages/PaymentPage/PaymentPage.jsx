import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Navbar } from "../../components";
import config from "../../config";
import PaymentForm from "./PaymentForm/PaymentForm";
import "./PaymentPage.css";

function Payment() {
  const { backendUrl, stripePublishableKey } = config;
 
  const [stripePromise, setStripePromise] = useState(loadStripe(stripePublishableKey));
  const [clientSecret, setClientSecret] = useState("");

  // TODO: get the clientKey from backend
  useEffect(() => {
    const handleFetchClientSecret = async () => {
      // TODO: change backend port
      const res = await fetch(`http://127.0.0.1:8000/create-payment-intent`);
      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    };

    handleFetchClientSecret();
   
  }, []);

  return (
    <>
    <Navbar />
    <div className="payment-page">
      <h1>Enter Payment method</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </div>
    </>
  );
}

export default Payment;