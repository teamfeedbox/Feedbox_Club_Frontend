import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faBell,
  faRightFromBracket,
  faSignal,
  faTh,
  faThLarge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";

import { Link } from "react-router-dom";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";

const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 10px;

 
`;

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #6adf76;
  background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  // position: relative;

  &:hover {
    background-color: #00c9ff;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }

  .notification_icon{
    position:relative;
  }
  .notification_icon .light{
    position:absolute;
    width:10px;
    height:10px;
    background-color:red;
    border-radius:50%;
    top:-10px;
    right:-10px;
  }
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  // border: 2px solid #00c9ff;
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: gray;
    //   background-color: #00c9ff;
    // margin-right : 10px;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;
const Links = styled(Link)`
  // text-decoration: none;
  // color: inherit;
  // font-size: inherit;
`;

export function Accessibility(props) {
  const [notification, setNotification] = useState(false);
  const [light, setlight] = useState(false)
  const [user, setUser] = useState();
  // const [role, setRole] = useState();

  const getNotifications = async () => {
    let notifi = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/getNotifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    notifi = await notifi.json();
    
    let oldLength = localStorage.getItem("notification-length")
    if(notifi.length > oldLength){
      setlight(true)
    }
  }

  useEffect(() => {
    // getUser();
    getNotifications()
  }, [light,notification]);

  const selectedPage = window.location.pathname;

  const logoutHandler = () => {
    localStorage.setItem("user",null);
    localStorage.setItem("jwt",null);
  };

  const handleCross = () => {
    setNotification(false);
    setlight(false)
  };

  return (
    <AccessibilityContainer>
      {/* *********************profile icon*************************** */}
      {/* {role !== "Super_Admin" ? ( */}
        <Link
          to="/profile"
          title="Profile Page"
          className={
            selectedPage === "/profile" || selectedPage === "/dashboard"
              ? "hidden"
              : "block"
          }
        >
          <LoginButton>
            <FontAwesomeIcon icon={faUser} className="fa-xl" />
          </LoginButton>
        </Link>
        
      {/* )  */}
      {/* *************************Dashboard****************************** */}
      {/* {role === "Super_Admin" ? (
        <Links
          to="/dashboard"
          title="Dashboard"
          className={
            selectedPage === "/dashboard" || selectedPage === "/profile"
              ? "hidden"
              : "block"
          }
        >
          <LoginButton>
            <FontAwesomeIcon icon={faSignal} className="fa-xl" />
          </LoginButton>
        </Links>
      ) : (
        ""
      )} */}
      {/* *************************logout************************************ */}
      <Links
        to="/"
        title="Logout"
        onClick={logoutHandler}
        className={
          selectedPage === "/profile" || selectedPage === "/dashboard"
            ? "block"
            : "hidden"
        }
      >
        <LoginButton>
          <FontAwesomeIcon icon={faRightFromBracket} className="fa-xl" />
        </LoginButton>
      </Links>
      {/* *******************notification bell**************** */}
      <RegisterButton
        title="Notification"
        onClick={() => {
          setNotification(!notification);
          setlight(false);
        }}
      >
        <div className="notification_icon">
      {light && !notification && <div className="light"></div>}
        <FontAwesomeIcon  icon={faBell} className="fa-xl" />
        </div>
      </RegisterButton>

      {notification ? <Notification props={{ handleCross }} /> : ""}
    </AccessibilityContainer>
  );
}
