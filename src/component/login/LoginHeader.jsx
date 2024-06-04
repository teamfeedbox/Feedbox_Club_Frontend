import React from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faCompass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="login-header">
      <div>
        
      <Link to={"/"} className="login-header-left">
        <img src="Images/banner.png" alt="" />
      </Link>
      </div>
      <div className="login-header-right">
        {/* <div className="login-header-overall-icons">
          <div className="login-header-icon">
            <FontAwesomeIcon className="fa-lg" icon={faCompass} />
            Discover
          </div>

          <div className="login-header-icon">
            <FontAwesomeIcon className="fa-lg" icon={faUserGroup} />
            People
          </div>

          <div className="login-header-icon">
            <FontAwesomeIcon className="fa-lg" icon={faChalkboardUser} />
            Learning
          </div>
        </div> */}

        <div className="login-header-overall-button">
          {/* <Link to="/register" className="joinnow-login-header">
            Register
          </Link>
          <Link to="/login" className="signin-login-header">
            Log in
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
