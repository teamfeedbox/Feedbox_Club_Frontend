// import React, { useState } from "react";
// import { useMediaQuery } from "react-responsive";
// import styled from "styled-components";
// import Logo from "../assets/logo1.png";
// import { Accessibility } from "./accessibility";
// import { NavLinks } from "./navLinks";
// import { DeviceSize } from "../responsive";
// import { MobileNavLinks } from "./mobileNavLinks";
// import { Link } from "react-router-dom";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import Sidebar from "../store/Sidebar";

// const NavbarContainer = styled.div`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 60px;
//   box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
//   display: flex;
//   align-items: center;
//   padding: 0 1.5em;
//   background: white;
//   z-index: 99;
// `;

// const LeftSection = styled.div`
//   display: flex;
//   gap: 20px;
//   align-items: center;
//   width: 140px;
//   @media screen and (max-width: 700px) {
//     margin-left: -10px;
//   }
// `;

// const MiddleSection = styled.div`
//   display: flex;
//   flex: 2;
//   height: 100%;
//   justify-content: center;
// `;

// const RightSection = styled.div`
//   display: flex;
// `;

// const SidebarContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 250px;
//   background: #fff;
//   z-index: 100;
//   padding-top: 60px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   transform: ${({ isOpen }) =>
//     isOpen ? "translateX(0)" : "translateX(-100%)"};
//   transition: transform 0.3s ease-in-out;
// `;

// export default function NavbarRes(props) {
//   const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
//   const selectedPage = window.location.pathname;
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <NavbarContainer>
//         <LeftSection>
//           {/* <Logo /> */}
//           {selectedPage === "/store" && (
//             <div
//               className="hamburger"
//               onClick={toggleSidebar}
//               style={{ cursor: "pointer" }}
//             >
//               <MenuRoundedIcon />
//             </div>
//           )}

//           <div>
//             <Link to="/main">
//               <div>
//                 <img
//                   className={
//                     selectedPage === "/store" ? "max-w-[155%]" : "max-w-[110%]"
//                   }
//                   src={Logo}
//                   alt=""
//                 />
//               </div>
//             </Link>
//           </div>
//         </LeftSection>
//         <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
//         <RightSection>
//           {!isMobile && <Accessibility />}
//           {isMobile && <MobileNavLinks />}
//         </RightSection>
//       </NavbarContainer>
//       {selectedPage === '/store' && isSidebarOpen && <Sidebar/>}
//     </>
//   );
// }

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Logo from "../assets/logo1.png";
import { Accessibility } from "./accessibility";
import { NavLinks } from "./navLinks";
import { DeviceSize } from "../responsive";
import { MobileNavLinks } from "./mobileNavLinks";
import { Link } from "react-router-dom";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  background: white;
  z-index: 99;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 140px;
  @media screen and (max-width: 700px) {
    margin-left: -10px;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background: #fff;
  z-index: 100;
  padding-top: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
`;

export default function NavbarRes(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const selectedPage = window.location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavbarContainer>
        <LeftSection>
          {/* <Logo /> */}
          {/* {selectedPage === "/store" && (
            <div
              className="hamburger"
              onClick={toggleSidebar}
              style={{ cursor: "pointer" }}
            >
              <img src={hamburger} alt="" />
            </div>
          )} */}

          <div>
            <Link to="/main">
              <div className="w-[130px] h-[110px] flex items-center justify-center mt-4">
                <img
                  className={`object-contain  w-full h-full ${selectedPage === "/store" ? "max-w-none" : ""}`}
                  src={Logo}
                  alt="LOGO"
                />
              </div>
            </Link>
          </div>
        </LeftSection>
        <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
        <RightSection>
          {!isMobile && <Accessibility />}
          {isMobile && <MobileNavLinks />}
        </RightSection>
      </NavbarContainer>
      {/* {selectedPage === '/store' && isSidebarOpen && <Sidebar/>} */}
      {/* NOT SHOW */}
    </>
  );
}
