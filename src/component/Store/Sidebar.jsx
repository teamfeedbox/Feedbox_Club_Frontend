// Sidebar.js
import React,{useState} from "react";
import styled from "styled-components";
import { NavLinks } from "../navbar/navLinks";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background: #fff;
  margin-top: 65px;
  z-index: 100;
  padding-top: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SidebarContent = styled.div`
  padding: 20px;
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SidebarItem = styled.div`
margin-bottom: 10px;
border-radius: 5px;
padding: 10px;
cursor: pointer;
transition: background-color 0.3s;
// &:hover {
//   background-color: #f0f0f0;
// }
${({ selected }) =>
  selected &&
  `
  background-color: #007bff;
  color: #fff;
`}
`;

const Sidebar = ({ isOpen }) => {
  const [selectedItem, setSelectedItem] = useState("Merchandise");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <SidebarContainer style={{ transform: isOpen ? "translateX(0)" : "translateX(0%)" }}>
      <SidebarContent>
        <SidebarTitle>Menu</SidebarTitle>
        <SidebarItem selected={selectedItem === "Merchandise"} onClick={() => handleItemClick("Merchandise")}>Merchandise</SidebarItem>
        <SidebarItem selected={selectedItem === "Coupons"} onClick={() => handleItemClick("Coupons")}>Coupons</SidebarItem>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
