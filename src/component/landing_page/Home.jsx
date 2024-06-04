import React from 'react'
import LandingSecondPart from "./LandingSecondPart";
import Curriculum from './Curriculum'
import LandingMain from './LandingMain';

const Home = () => {
  return (
    <div style={{
        'background' : '#F6F6EF'
    }}>
      <LandingMain/>
        <LandingSecondPart/>
        <Curriculum />
    </div>
  )
}

export default Home