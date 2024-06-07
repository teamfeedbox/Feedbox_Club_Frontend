import { faArrowUpRightFromSquare, faUserGroup, faWandSparkles, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./HomePageProfile.css";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";

const backColor = [
  "#EDC7E2",
  "#C7EDCF",
  "#EDE7C7",
  "#EDC7C7",
  "#B5A6E1",
  "#B4B4B4",
  "#72C4FF",
  "#e9f5db",
  "#fad643",
  "#E3B47C",
];

const fColor = [
  "#9B0483",
  "#2AA100",
  "#A67904",
  "#A10000",
  "#5C0684",
  "#363636",
  "#035794",
  "#718355",
  "#76520E",
  "#744E37",
];

const HomePageProfile = (props) => {

  const [college, setCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const [clgEvents, setClgEvents] = useState([]);
  const [clgUsers, setClgUsers] = useState(0);
  const [allUser, setallUser] = useState([]);
  const [selected, setSelected] = useState(false);
  const role = JSON.parse(localStorage.getItem("user")).role

  const [{ currentUser, allEventsData, colleges, allUsers },dispatch] = useStateValue();
  const data = currentUser; // current user
  const event = allEventsData;
  const allClgs = colleges;

  useEffect(() => {
    console.log("khushi profile page");
    getallUser();
    setLoading(false);
  }, [loading]);

  // get all users
  const getallUser = async () => {
    if (allUsers) {
      setallUser(allUsers);
    } else {
// <<<<<<< HEAD
//       let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/get");
// =======
      let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/get`);
// >>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      result = await result.json();
      let array = [];
      result.map(data => {
        if (data.role == "Lead" || data.role == "Admin" || data.role == "Club_Member") {
          array.push(data)
        }
      })
      setallUser(array);
      dispatch({
        type: 'INIT_ALL_USERS',
        item: array,
      });
    }
  }

  const handleCollege = (e) => {
    setCollege(e.target.value)
    props.sendData(e.target.value)
    let clgEvents = [], usercount = 0;
    if (e.target.value === "All") {
      setClgEvents(event)
      setClgUsers(allUser.length)
    } else {
      event.map((eve) => {
        if (eve.postedBy.collegeName === e.target.value) {
          clgEvents.push(eve)
        }
      })
      allUser.map((user) => {
        if (user.collegeName === e.target.value && (user.role == "Lead" || user.role == "Admin" || user.role == "Club_Member")) {
          usercount++;
        }
      })
      setClgEvents(clgEvents)
      setClgUsers(usercount)
    }
    setSelected(true);
  }

  return (
    <div className="HomePageProfile mt-[10px] md:mt-[20px] lg:mt-[20px]">
      {/*-------------- for web and tab view------------- */}
      <div className="hidden md:block lg:block innerDIV">
        <div className="home-profile-bg-doodle">
          <img src={"Images/doodle-profile-bg.png"} alt="" />
          <Link style={{ textDecoration: "none" }} to="/profile">
            <button className="home-profile-visit-profile">
              <FontAwesomeIcon
                className="home-profile-visit-profile-icon"
                icon={faArrowUpRightFromSquare}
              />
            </button>
          </Link>
        </div>
        <div className="home-profile-main-info">
          <div className="home-profile-main-photo">
            <img src={data && data.img} alt="" />
          </div>
          <div className="home-profile-name-section">
            <p className="home-profile-name-section-name">{data && data.name}</p>
            <p className="home-profile-name-section-desig">
              {data && data.role == "Super_Admin"
                ? "Super Admin"
                : data && data.role == "Club_Member"
                  ? "Club Member"
                  : data && data.role}
            </p>
          </div>
        </div>

        {role && (role === "Admin" || role === "Super_Admin") &&
          <div className="m-3 flex flex-col pb-3">
            <div className="font-[700] text-[1.1rem]">Select College:</div>
            <div className=" ">
              <select
                name="College"
                id="College"
                className="border w-[280px] rounded p-1 mt-1 text-[1rem] font-[400] cursor-pointer" onChange={handleCollege}
              >
                <option disabled selected className="hidden">
                  College
                </option>
                <option value="All">All</option>
                {allClgs && allClgs.length > 0 &&
                  allClgs.map((clg) => <option value={clg}>{clg}</option>)}
              </select>
            </div>
          </div>}

        {/* not for super admin and admin*/}
        {role && (role === 'Lead' || role === 'Club_Member' || role === "Admin")
          ?
          <div className="pb-3 ">
            <div className="home-profile-skill-div">
              <h6>Skills:</h6>
              <div className="home-profile-skills">
                {data &&
                  data.skills.map((item, index) => (
                    <div key={item._id} style={{ background: backColor[index], color: fColor[index] }}>
                      {item}
                    </div>
                  ))}
              </div>
            </div>

            <div className="home-profile-coin-section">
              <div className="home-profile-coins">
                <img src="Images/Money.png" alt="" />
              </div>
              <div className="home-profile-coins-content">
                <h6> {data && data.coins} </h6>
                <div>Coins Collected</div>
              </div>
            </div></div>
          : ''}

        {/* for super admin */}
        {role && role == 'Super_Admin' && <div className="m-3 flex-col pb-3">
          <div className="flex mt-2 w-[280px] rounded shadow-sm h-[60px] ">
            <div className=" w-[45px] h-[45px] mt-1  ml-3 rounded bg-blue-200">
              <FontAwesomeIcon
                className="w-[25px] h-[25px] m-2.5 text-blue-800"
                icon={faUserGroup}
              />
            </div>
            <div className=" flex flex-col  pl-2">
              <h className=" text-[1.1rem] md:text-[16px]   font-[600]">
                Total Students:
              </h>
              <p className=" text-[1.5rem] font-[700] p-0 relative bottom-2">
                {selected ? clgUsers ? clgUsers : 0 : allUser.length > 0 ? allUser.length : 0}
              </p>
            </div>
          </div>

          <div className="flex mt-2 w-[280px] rounded shadow-sm h-[60px] ">
            <div className=" w-[45px] h-[45px] mt-1  ml-3 rounded bg-green-200">
              <FontAwesomeIcon
                className="w-[25px] h-[25px] m-2.5 text-green-800"
                icon={faWandSparkles}
              />
            </div>
            <div className=" flex flex-col  pl-2">
              <h1 className=" text-[1.1rem] md:text-[16px]   font-[600]">
                Total Events:
              </h1>
              <p className=" text-[1.5rem] font-[700] p-0 relative bottom-2">{selected ? clgEvents.length > 0 ? clgEvents.length : 0 : event ? event.length : 0}</p>
            </div>
          </div>
        </div>}
      </div>

      {/* --------------------for mobile view (only for super admin) -------------------- */}
      {role && (role === 'Super_Admin' || role === "Admin") ?
        <div className="block md:hidden lg:hidden px-3 pt-3 pb-3">
          <div className=" ">
            <select
              name="College"
              id="College"
              // className="border w-[280px] rounded p-1 mt-1 text-[1rem] font-[400]" onChange={handleCollege}
              className="border w-[100%] rounded p-1 text-[1rem] font-[400]" onChange={handleCollege}

            >
              <option disabled selected className="hidden">
                College
              </option>
              <option value="All">All</option>
              {allClgs && allClgs.length > 0 &&
                allClgs.map((clg) => <option value={clg}>{clg}</option>)}
            </select>


            {/* <select
              name="College"
              id="College"
              className="border w-[100%] rounded p-1 text-[1rem] font-[400]" onChange={handleCollege}
            >
              <option disabled selected className="hidden">
                College
              </option>
              {allClgs && allClgs.length > 0 &&
                allClgs.map((clg) => <option key={clg._id} value={clg}>{clg}</option>)}
            </select> */}
          </div>
        </div> : ''}
    </div>

  );
};

export default HomePageProfile;
