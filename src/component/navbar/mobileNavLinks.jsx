import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibility";
import { MenuToggle } from "./menuToggle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faRightFromBracket,
  faUser,} from "@fortawesome/free-solid-svg-icons";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 9;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 10px;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
  margin-top: -5px;
  transition: all 2s ease-in-out;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;

  margin-bottom: 10px;
`;

const LinkItemHighlight = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #00c9ff;

  font-weight: 500;
  font-size: 1.1rem;
  display: flex;

  margin-bottom: 10px;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

const Marginer = styled.div`
  height: 2em;
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1.4em;
  color: #222;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  transition: all 240ms ease-in-out;
  cursor: pointer;


  &:hover {
    color: gray;
  }
  `;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    getUser();
  }, []);
  // const userId = JSON.parse(localStorage.getItem("user")).decodedToken._id;
  // console.log(userId)
  const getUser = async () => {
    // console.log(id)
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setRole(result.role);

    // console.log(id)
    setUser(result);

    // if (result) {
    //   getUser();
    // }
  };

  const logoutHandler = () => {
    localStorage.clear();
  };

  const selectedPage = window.location.pathname;

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper onClick={() => {setOpen(!isOpen)}}>
          {selectedPage === "/main" ? (
            <LinkItemHighlight>
              <Links to="/main">Home</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/main">Home</Links>
            </LinkItem>
          )}

          {/* {selectedPage === "/profile" ? (
            <LinkItemHighlight>
              <Link to="/profile">Profile</Link>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Link to="/profile">Profile</Link>
            </LinkItem>
          )} */}

          {selectedPage === "/calendar" || selectedPage === "/attendance" ? (
            <LinkItemHighlight>
              <Links to="/calendar">Calendar</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/calendar">Calendar</Links>
            </LinkItem>
          )}

          {role !== "Club_Member" ? (
            <div>
              {selectedPage === "/approvals" ? (
                <LinkItemHighlight>
                  <Links to="/approvals">Approvals</Links>
                </LinkItemHighlight>
              ) : (
                <LinkItem>
                  <Links to="/approvals">Approvals</Links>
                </LinkItem>
              )}{" "}
            </div>
          ) : (
            ""
          )}

          {selectedPage === "/rescources" ||
          selectedPage === "/rescourcesDisplay" ? (
            <LinkItemHighlight>
              <Links to="/rescources">Rescources</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/rescources">Rescources</Links>
            </LinkItem>
          )}

          {selectedPage === "/notification" ? (
            <LinkItemHighlight>
              <Links to="/notification">Notification</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/notification">Notification</Links>
            </LinkItem>
          )}

          {/* Adding store in toggle options Date: 04/04/2024 */}
          {/* 30 May 2024 restrict access to store for  */}
          {(role === "Club_Member") ? (
            <div>
          {selectedPage === "/store" ? (
            <LinkItemHighlight>
              <Links to="/store">Store</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/store">Store</Links>
            </LinkItem>
          )}
          </div>
          ) : (
            ""
          )}

          {role === "Super_Admin" ? (
            <div>
              {selectedPage === "/addproduct" ? (
                <LinkItemHighlight>
                  <Links to="/addproduct">Add Product</Links>
                </LinkItemHighlight>
              ) : (
                <LinkItem>
                  <Links to="/addproduct">Add Product</Links>
                </LinkItem>
              )}
            </div>
          ) : (
            ""
          )} 

          {role === "Super_Admin" ? (
            <div>
              {selectedPage === "/showproducts" ? (
                <LinkItemHighlight>
                  <Links to="/showproducts">Product</Links>
                </LinkItemHighlight>
              ) : (
                <LinkItem>
                  <Links to="/showproducts">Product</Links>
                </LinkItem>
              )}
            </div>
          ) : (
            ""
          )} 
            {/*  */}
          {/* {role !== "Super_Admin" ? (
            <div>
              {selectedPage === "/profile" ? (
                <LinkItemHighlight>
                  <Links to="/profile">Profile</Links>
                </LinkItemHighlight>
              ) : (
                <LinkItem>
                  <Links to="/profile">Profile</Links>
                </LinkItem>
              )}
            </div>
          ) : (
            ""
          )} */}

          {role === "Super_Admin" ? (
            <div>
              {selectedPage === "/profile" ? (
                <LinkItemHighlight>
                  <Links to="/profile">Dashboard</Links>
                </LinkItemHighlight>
              ) : (
                <LinkItem>
                  <Links to="/profile">Dashboard</Links>
                </LinkItem>
              )}
            </div>
          ) : (
            ""
          )} 

          {selectedPage === "/faq" ? (
            <LinkItemHighlight>
              <Links to="/faq">FAQs</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/faq">FAQs</Links>
            </LinkItem>
          )}

          <Links
            to="/"
            title="Logout"
            onClick={logoutHandler}
          >
            <LoginButton>
              <FontAwesomeIcon icon={faRightFromBracket} className="fa-xl" />
            </LoginButton>
          </Links>

          <Marginer />
          {/* <Accessibility /> */}
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
