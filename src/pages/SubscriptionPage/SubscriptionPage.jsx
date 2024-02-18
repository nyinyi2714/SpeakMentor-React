// SubscriptionPage.js
import { Navbar } from "../../components";

import TickSvg from "../../assets/tick.svg";
import WhiteTickSvg from "../../assets/white-tick.svg";
import CrossSvg from "../../assets/cross.svg";
import StarSvg from "../../assets/stars.svg";

import "./SubscriptionPage.css";

function SubscriptionPage() {
  return (
    <>
      <Navbar />
      <div className="subscription-page">
        <h1>Choose Your Plan</h1>
        <div className="subscription-options">
          <section
            className="subscription-option">
            <h2>FREE PLAN</h2> 
            <h3>
              $0
              <span className="small-text">per month</span>
            </h3>
            <p>For testing our app. Lorem ipsum dolor sit amet.</p>
            <ul className="features">
              <li><img src={TickSvg} /> Practice Single Word</li>
              <li><img src={TickSvg} /> Limit 10 words per day</li>
              <li><img src={CrossSvg} /> Practice Sentences</li>
              <li><img src={CrossSvg} /> Chatbot Conversations</li>
            </ul>
            <button className="subscription-btn">Get Started</button>
          </section>

          <section
            className="subscription-option anual">
            <span className="best-deal">Best Deal <img src={StarSvg} /></span>
            <h2>ANUAL PLAN</h2> 
            <h3>
              $12.99
              <span className="small-text">per month</span>
              <p className="small-text">Billed anually at $155.88</p>
            </h3>
            <p>For testing our app. Lorem ipsum dolor sit amet.</p>
            <ul className="features">
              <li><img src={WhiteTickSvg} /> Practice Single Word</li>
              <li><img src={WhiteTickSvg} /> Unlimited Words  </li>
              <li><img src={WhiteTickSvg} /> Practice Sentences</li>
              <li><img src={WhiteTickSvg} /> Chatbot Conversations</li>
            </ul>
            <button className="subscription-btn">Get Started</button>
          </section>  

          <section
            className="subscription-option">
            <h2>MONTHLY PLAN</h2> 
            <h3>
              $19.99
              <span className="small-text">per month</span>
            </h3>
            <p>For testing our app. Lorem ipsum dolor sit amet.</p>
            <ul className="features">
              <li><img src={TickSvg} /> Practice Single Word</li>
              <li><img src={TickSvg} /> Unlimited Words </li>
              <li><img src={TickSvg} /> Practice Sentences</li>
              <li><img src={TickSvg} /> Chatbot Conversations</li>
            </ul>
            <button className="subscription-btn">Get Started</button>
          </section>
          
        </div>
      </div>
    </>
  );
}

export default SubscriptionPage;
