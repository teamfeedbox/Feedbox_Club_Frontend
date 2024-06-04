import React, { useState } from "react";
import "./Rescources.css";
import { Link } from "react-router-dom";
import RescourcesTable from "./RescourcesTable";
import NavbarRes from "../navbar/NavbarRes";
const Rescources = () => {
  const [temp, setTemp] = useState(0);
  const [name, setName] = useState("");
  const [skill, setSkills] = useState([
    { name: "Web Development", img: "Images/web-development-50.png" },
    { name: "App Development", img: "Images/icons8-deployment-50.png" },
    {
      name: "Search Engine Optimization",
      img: "Images/icons8-search-engine-optimization-68.png",
    },
    { name: "Social Media Optimization", img: "Images/icons8-advanced-search-50.png" },
    { name: "Graphic Designing", img: "Images/icons8-windows-10-personalization-50.png" },
    { name: "Video Editing", img: "icons8-video-editing-.png" },
    { name: "Time Management", img:"Images/icons8-time-management-skills-50 (1).png" },
    { name: "Digital Marketing", img: "Images/icons8-digital-marketing-64 (1).png" },
    { name: "Content Writing", img: "Images/icons8-writing-down-48 (1).png" },
    { name: "Performance Marketing", img: "Images/icons8-performance-goal-48 (1).png" },
  ]);

  let colors = ["#9647ff", "#eb732f", "#ec4882", "#417cd3"];

  return (
    <>
      <div className="Rescources">
        <h1>RESOURCES</h1>

        {/* ----------------college dropdown for super admin--------------- */}

        {/* <div className=" my-4 mx-1 ">
            <select className="p-2 border-2 font-[700] text-[1rem] border-[#000] rounded-3xl w-[90%] md:w-[20%]">
              <option className=" " selected disabled hidden>College</option>
              <option>Shri Vaishnav Vidyapeeth Vishwavidyalaya</option>
              <option>IET-DAVV</option>
            </select>

          </div> */}
          
        <div className="Rescources-overall-card">
          {skill.map((item, index) => (
            <Link
              to="/rescourcesDisplay"
              className="Rescources-card shadow-gray-300 shadow-lg"
              state={item}
              key={index}
              style={{
                width: "20em",
                height: "6em",
                backgroundColor: colors[index % colors.length],
              }}
            >
              <div className="flex flex-start" style={{border: "1px dashed", height: "6em", backgroundColor : "white", borderRadius: '10px', width : "18em", borderColor : colors[index % colors.length], padding : ".5em"}}>
                <div className="Rescources-card-img" style={{ width: "2.5em", height: "2.5em"}}>
                  <img src={item.img} alt="" style={{ width: "5em", height: "2.5em"}}/>
                </div>
                <div className="Rescources-card-content" style={{height: "2.5em", margin : "1em 0 1em 1em"}}>
                  <div style={{height: "2.5em", margin : "0"}}>{item.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Rescources;
