import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {

return (
  <div className='frontpage'>
      <div className='welcome-div'>
          <div>
              <h1 className='title'>Welcome to <br/></h1>
          </div>
          <div className="landingpage-logo">
              <Link to="/"><img src="/images/main-logo-alt.png" alt="logo" /></Link>
          </div>
          <div className='button-div'>
              <Link to="/login" className='nav-login'>Login</Link>
              <Link to="/register" className='nav-register'>Register</Link>
              <Link to="/words" className='nav-homepage'>Words</Link>
              <Link to="/analyze-sentences" className='nav-assessment'>Sentences</Link>
          </div>
      </div>
      <div className='about-div'>
          <div className='about-body'>
            <h1 className='about-title'>About</h1>
            <p className='about-text'>    
                We're Speak Mentor, your go-to online platform for mastering English pronunciation and accent reduction. Discover and learn the correct pronunciation of words with our easy-to-use search feature. Enhance your speaking skills further by practicing unscripted sentences and receive personalized feedback on the areas where you need improvement.
            </p>
          </div>
            <img src="/images/lpi1.png" alt="logo" />
      </div>
        <div className='features-div'>
            <img src="/images/lpi3.png" alt="logo" />
            <div className='features-body'>
                <h1 className='features-title'>Features</h1>
                <p className='features-text'>
                    - Search for words and get their pronunciation <br/>
                    - Practice unscripted sentences and receive feedback <br/>
                    - Track your progress and see your improvement over time <br/>
                    - Personalized learning experience <br/>
                    - Accessible on any device
                </p>
            </div>
        </div>
        <div className='creators-div'>
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
        </div>
  </div>
)
}

export default LandingPage;
