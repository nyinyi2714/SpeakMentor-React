import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className='frontpage'>
      <div className='welcome-div'>
        <div>
          <h1 className='title'>Welcome to <br /></h1>
        </div>
        <div className="landingpage-logo">
          <Link to="/"><img src="/images/main-logo-alt.png" alt="logo" /></Link>
        </div>
        <div className='button-div'>
          <Link to="/login" className='nav-login'>Login</Link>
          <Link to="/register" className='nav-register'>Register</Link>
        </div>
      </div>

      <div className="features-wrapper">
        <h2>The Features We Offer</h2>
        <div className="features">
          <Link className="feature" to="/words">
            <h3>Word Pronunciation</h3>
            <p>Search for English words to listen to their correct pronunciation, then practice saying them yourself. Receive personalized feedback to help you refine your pronunciation.</p>
          </Link>
          <Link className="feature" to="/analyze-sentences">
            <h3>Sentence Practice</h3>
            <p> Level up by practicing phrases or sentences, with the flexibility to analyze passages up to 1,000 words. Get a detailed pronunciation analysis and a fluency score to track your progress.</p>
          </Link>
          <Link className="feature" to="/chatbot">
            <h3>AI Chatbot</h3>
            <p>Looking for a conversational partner? Our AI chatbot simulates real-world English conversations, allowing you to practice and build confidence in a casual, interactive setting.</p>
          </Link>
        </div>
        
      </div>

      <div className='about-div'>
        <div className='about-body'>
          <h1 className='about-title'>About Us</h1>
          <p className='about-text'>
            Welcome to Speak Mentor, the online platform designed to help you master English pronunciation. Our intuitive search feature allows you to find the correct pronunciation of words quickly and easily. Take your speaking skills to the next level by practicing with our AI Chatbot and receiving personalized feedback to improve on areas that need a little extra attention.
          </p>
        </div>
        <img src="/images/lpi1.png" alt="logo" />
      </div>

      {/* <div className='creators-div'>
        <div className='creators-body'>
          <h1 className='creators-title'>Meet the creators</h1>
          <p className='creators-text'>
            Speak Mentor was created by a team of passionate developers and language experts. We are dedicated to providing a platform that will help you improve your English speaking skills. We believe that everyone should have access to the tools and resources needed to become a confident and fluent English speaker.
          </p>
        </div>
        <div className='creator-icons'>
          <div className='creator-icon-photo'>
            <img src='/images/icon1.png'></img>
            <p className='creator-name'>Arya</p>
            <p className='creator-role'>Frontend</p>
          </div>
          <div className='creator-icon-photo'>
            <img src='/images/icon2.png'></img>
            <p className='creator-name'>David</p>
            <p className='creator-role'>Backend</p>
          </div>
          <div className='creator-icon-photo'>
            <img src='/images/icon3.png'></img>
            <p className='creator-name'>John</p>
            <p className='creator-role'>Fullstack</p>
          </div>
          <div className='creator-icon-photo'>
            <img src='/images/icon4.png'></img>
            <p className='creator-name'>Nyi Nyi</p>
            <p className='creator-role'>Frontend</p>
          </div>
          <div className='creator-icon-photo'>
            <img src='/images/icon5.png'></img>
            <p className='creator-name'>Miguel</p>
            <p className='creator-role'>Backend</p>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default LandingPage;
