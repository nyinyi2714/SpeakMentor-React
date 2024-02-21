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
            <p>Try practicing single words and explore the platform at no cost.</p>
            <ul className="features">
              <li><img src={TickSvg} /> Practice 50 Single Words per day</li>
              <li><img src={TickSvg} /> Practice Sentences (up to 200 words)</li>
              <li><img src={CrossSvg} /> Conversations with AI Chatbot</li>
            </ul>
            <button className="subscription-btn">Start Exploring</button>
          </section>

          <section
            className="subscription-option anual">
            <span className="best-deal">Best Value 35% OFF <img src={StarSvg} /></span>
            <h2>ANUAL PLAN</h2> 
            <h3>
              $12.99
              <span className="small-text">per month</span>
            </h3>
            <p>
              Unlock your full potential with unlimited words, sentence practice, and Conversations with AI Chatbot. 
            </p>
            <p>
              <i>Charge anually at 155.88 USD</i>
            </p>
            <ul className="features">
              <li><img src={WhiteTickSvg} /> Practice <span className="underline">Unlimited</span> Single Words</li>
              <li><img src={WhiteTickSvg} /> Practice Sentences (up to <span className="underline">1000</span> words)</li>
              <li><img src={WhiteTickSvg} /> Conversations with AI Chatbot</li>
            </ul>
            <button className="subscription-btn">Unlock Your Full Potential</button>
          </section>  

          <section
            className="subscription-option">
            <h2>MONTHLY PLAN</h2> 
            <h3>
              $19.99
              <span className="small-text">per month</span>
            </h3>
            <p>Enjoy all the essential features, including sentences and Conversations with AI Chatbot, with the flexibility to cancel anytime.</p>
            <ul className="features">
              <li><img src={TickSvg} /> Practice <span className="underline">Unlimited</span> Single Words</li>
              <li><img src={TickSvg} /> Practice Sentences (up to <span className="underline">1000</span> words)</li>
              <li><img src={TickSvg} /> Conversations with AI Chatbot</li>
            </ul>
            <button className="subscription-btn">Start Practicing Today</button>
          </section>
          
        </div>
      </div>
    </>
  );
}

export default SubscriptionPage;
