import React from 'react'
import './SignUp.css'

import LoginHeader from '../login/LoginHeader'
import SignupPage from './SignupPage'

const SignUp = () => {
  return (
    <div className='sign-up'>
        <LoginHeader />
        <SignupPage />
    </div>
  )
}

export default SignUp