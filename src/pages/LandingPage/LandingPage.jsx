import { Link } from 'react-router-dom'
import './LandingPage.css'
import { ReactComponent as Done } from '../../assets/done.svg'
import { useNavigate } from 'react-router-dom'

function LandingPage() {

  const frame1 = '/images/frame1.png'

  const nav = useNavigate()

  const words = () => {
    nav('/words')
  }

  const sentences = () => {
    nav('/analyze-sentences')
  }

  return (
    <>
    <div className='frame1'>
      <div className='content' style={
        {
          backgroundImage: `url(${frame1})`,
          backgroundRepeat: 'no-repeat',
          // center the image
          backgroundPosition: 'center',
          backgroundSize: '80% auto',
          }
        } id='first-frame'>

        <div className='text-div'>

          <div className='label-div'>
            <label className='motto'>Speak with confidence</label>
          </div>

          <div className='list-div'>
            <div className='item' id='item1'>
              <div className='item-content'>
                <Done className='done-icon'></Done>
                <p className='item-description'>Learn new words and their pronunciations</p>
              </div>
            </div>

            <div className='item' id='item2'>
              <div className='item-content'>
                <Done className='done-icon'></Done>
                <p className='item-description'>Practice sentences and your fluency</p>
              </div>
            </div>

            <div className='item' id='item3'>
              <div className='item-content'>
                <Done className='done-icon'></Done>
                <p className='item-description'>Talk with our A.I. powered chatbot to practice conversations</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className='button-div'>
          <button className='words-button' onClick={words}>
            Words
          </button>
          <button className='sentences-button' onClick={sentences}>
            Sentences
          </button>
        </div>
      </div>
    </div>
    <div className='frame2'>
      <div className='content'>
        
        </div>
    </div>
    <div className='frame3'>
      <div className='content'>
        
        </div>
    </div>
    </>
  )
}

export default LandingPage;
