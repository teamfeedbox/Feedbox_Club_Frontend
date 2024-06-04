import React from "react";
import "./Curriculum.css";
// import data
import {curriculumData} from "../../component_data/landing_curriculum";
import {carouselData} from "../../component_data/curriculumCarousel"
import {Link} from 'react-router-dom'
// import other depencies
import  { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
const Curriculum = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
    <div className="Curriculum">
      <div className="Curriculum-head">
        <h2>The YC Curriculum</h2>
        <p>
          Learn how to build a top startup - from the same people who helped
          Airbnb, Doordash, Stripe, Reddit, and Coinbase get started.
        </p>
      </div>

      {/* Cards */}
      <div className="curriculum-cards">
        {
          curriculumData.map((item)=>
            <div className="curriculum-card">
            <img src={item.img} alt="speaker1"></img>
            <div className="card-data">
              <div className="card-title">{item.title}</div>
              <div className="card-text">{item.text}</div>
            </div>
          </div>
          )
        }
          
          
      </div>

        <div className="curriculum-carousel">
      <Carousel activeIndex={index} onSelect={handleSelect} >
        {
          carouselData.map((item)=>
          <Carousel.Item >
            <div className="curriculum-carousel-inside">
              <div className="curriculum-carousel-left">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <h4>{item.name}</h4>
              </div>
              <div className="curriculum-carousel-right">
                <img src={item.img} alt="alumni image"/>
              </div>
            </div>
          </Carousel.Item>
          )
        }
      
          </Carousel>
          </div>
          </div>

          {/* footer */}
          <div className="landing-footer">
            <Link to='/' className="footer-logo">
            <img src='Images/banner.png' alt="Feedbox logo"></img>
            </Link>
            <div className="footer-middle">
              <li>About</li>
              <li>Privacy</li>
              <li>FAQ</li>
              <li>Help</li>
            </div>

            <Link to='/register' className="footer-btn-parent">
              <button className="footer-btn">Register Now</button>
            </Link>
          </div>
      
      </div>
  );
};

export default Curriculum;
