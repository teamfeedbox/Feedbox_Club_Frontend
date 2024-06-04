import React from 'react';
import "./LandingMain.css";
import {Link} from 'react-router-dom';
function LandingMain() {
  return (
    <div className='Landing-Main-Container'>
        <div className='Landing-Main-Left'>
            <div className='Landing-Left-box'>
                <p>career seekers & enterpreneurs:</p>
                <h1>
                    genius comes<br/> 
                    in all colours
                </h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum. <b>Are you ready for growth?</b>
                </p>

                <Link to="/register">Register Now</Link>
            </div>
        </div>
        <div  className='Landing-Main-Right'>Right</div>
        
    </div>
  )
}

export default LandingMain