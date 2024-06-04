import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 2s ease-in-out;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 700;
  font-size: 1.1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;

  &:hover {
    border-top: 2px solid #00c9ff;
    color: #00c9ff;
  }
`;

const LinkItemHighlight = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #00c9ff;
  font-weight: 700;
  font-size: 1.1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 220ms ease-in-out;
  border-bottom: 3px solid #00c9ff;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: inherit;

  &:hover {
    color: #00c9ff;
  }
`;

export function NavLinks(props) {
  const selectedPage = window.location.pathname;
  const role =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).role;
  console.log(role);

  return (
    <NavLinksContainer>
      <LinksWrapper>
        {selectedPage === "/main" ? (
          <LinkItemHighlight>
            <Links to="/main">Home</Links>
          </LinkItemHighlight>
        ) : (
          <LinkItem>
            <Links to="/main">Home</Links>
          </LinkItem>
        )}

        {selectedPage === "/calendar" || selectedPage === "/attendance" ? (
          <LinkItemHighlight>
            <Links to="/calendar">Calendar</Links>
          </LinkItemHighlight>
        ) : (
          <LinkItem>
            <Links to="/calendar">Calendar</Links>
          </LinkItem>
        )}

        {role &&
        (role === "Admin" || role === "Lead" || role === "Super_Admin") ? (
          <div>
            {selectedPage === "/approvals" ? (
              <LinkItemHighlight>
                <Links to="/approvals">Approvals</Links>
              </LinkItemHighlight>
            ) : (
              <LinkItem>
                <Links to="/approvals">Approvals</Links>
              </LinkItem>
            )}
          </div>
        ) : (
          ""
        )}

        {selectedPage === "/rescources" ||
        selectedPage === "/rescourcesDisplay" ? (
          <LinkItemHighlight>
            <Links to="/rescources">Resources</Links>
          </LinkItemHighlight>
        ) : (
          <LinkItem>
            <Links to="/rescources">Resources</Links>
          </LinkItem>
        )}

{/* 28 May 2024 Change to avoid purchase and error page. */}
        {role && (role === "Club_Member" || role === "Lead") ? (
          selectedPage === "/store" ? (
            <LinkItemHighlight>
              <Links to="/store">Store</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/store">Store</Links>
            </LinkItem>
          )
        ) : (
          ""
        )}
        
        {role && (role === "Super_Admin") ? (
          selectedPage === "/addproduct" ? (
            <LinkItemHighlight>
              <Links to="/addproduct">Add Product</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/addproduct">Add Product</Links>
            </LinkItem>
          )
        ) : (
          ""
        )}
        
        {role && (role === "Super_Admin") ? (
          selectedPage === "/showproducts" ? (
            <LinkItemHighlight>
              <Links to="/showproducts">Products</Links>
            </LinkItemHighlight>
          ) : (
            <LinkItem>
              <Links to="/showproducts">Products</Links>
            </LinkItem>
          )
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
      </LinksWrapper>
    </NavLinksContainer>
  );
}
