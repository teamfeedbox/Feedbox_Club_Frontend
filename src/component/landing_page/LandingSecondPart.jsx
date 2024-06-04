import React from 'react';
import "./LandingSecondPart.css";
import Curriculum from './Curriculum';
function Landing() {
  return (
    <div className='landing-container'>
        {/* second section */}
        <div className='landing-second-section'>
            <b className='landing-second-head'>
            How FeedBox Community works
            </b>
            <div className='landing-second'>
                <li className='landing-second-con'>Get the essential advice for ambitious startup
                     founders, taught by Y Combinator partners and 
                     industry leaders.
                </li>
                <li className='landing-second-con'>Go at your own pace. It will take approximately 
                    7 weeks if you spend 1-2 hours/week.
                </li>
            </div>
            <b className='landing-second-head'>
            Who is FeedBox Community for?
            </b>
            <div className='landing-second'>
                <li className='landing-second-con'>It’s for anyone at the early stages of building
                     a startup, turning a side project into a company, 
                     or anyone curious to learn about becoming a founder.
                </li>
               
            </div>
        </div>
    </div>
  )
}

export default Landing