import React, { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";
import HomePageProfile from "./HomePageProfile";
import HomePageCal from "./HomePageCal";
import HomePageEvent from "./HomePageEvent";
import CreatePost from "./CreatePost";
import "./Main.css";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const Main = () => {
  const [clg, setClg] = useState();
  const [eventSel, setEventSel] = useState();
  const [postadd,setPostAdd]=useState();
  const role = JSON.parse(localStorage.getItem("user")).role;

  const handleDataChange = (newData) => {
    setClg(newData);
  };

  const pull_data = (data) => {
    setEventSel(data);
  }

  const getData=(data)=>{
    setPostAdd(data);
  }

  console.log("main loaded");

  return (
    <>
      <div
        className="main_container"
        style={{
    }}
      >
        {/* *******************webview****************** */}
        <div className="main-page-display-web">
          <section className="main">
            <div className="flex m-auto justify-center w-full">
              <div className="main-home-page-profile">
                <scrollable-component scrollbar-visibility="always">
                  <HomePageProfile sendData={handleDataChange} />
                </scrollable-component>
              </div>

              <div className="main-post-dispaly">
                <scrollable-component scrollbar-visibility="always">
                  <div>
                    {role && role === "Club_Member" ? '' : <CreatePost  receive={getData} />}
                  </div>
                  <PostDisplay clgData={clg && clg} receivePost={postadd}/>
                </scrollable-component>
              </div>

              <div className="main-home-page-cal">
                <scrollable-component scrollbar-visibility="always">
                  <div className="home-page-cal-div">
                    <HomePageCal clgData={clg && clg} eventSel={pull_data} />
                  </div>
                  <p className="up-coming-events">UPCOMING EVENTS</p>
                  <HomePageEvent clgData={clg && clg} eveD={eventSel && eventSel} />
                </scrollable-component>
              </div>
            </div>
          </section>
        </div>

        {/* *****************tab view ************************* */}
        <div className="main-page-display-tab">
          <section className="main">
            <div className="main-page-display-tab-left mt-2">
              <scrollable-component scrollbar-visibility="always">
                <HomePageProfile sendData={handleDataChange} />
                <p className="up-coming-events">UP-COMING EVENTS</p>

                <HomePageEvent clgData={clg && clg} />
              </scrollable-component>
            </div>
            <div className="main-page-display-tab-right">
              <scrollable-component scrollbar-visibility="always">
                {role && role === "Club_Member" ? '' : <CreatePost/>}
                <PostDisplay clgData={clg && clg} />
              </scrollable-component>
            </div>
          </section>
        </div>

        {/* ******************mobile view************************* */}
        <div className="main-page-display-mobile">
          <section className="main ">
            <div className="w-[92%] ml-[4%]">
              <HomePageProfile sendData={handleDataChange} />
            </div>
            <div className="w-[92%] ml-[4%]">
              {role && role === "Club_Member" ? '' : <CreatePost />}
            </div>
            <p className="up-coming-events">UP-COMING EVENTS</p>
            <div className="w-[92%] ml-[4%]">
              <HomePageEvent clgData={clg && clg} />
            </div>
            <PostDisplay clgData={clg && clg} />
          </section>
        </div>
      </div>
    </>
  );
};

export default Main;
