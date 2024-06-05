import React, { useEffect, useState } from "react";
import "./ProfileEvent.css";
import {
  faCalendar,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {Link} from "react-router-dom"


// const id = JSON.parse(localStorage.getItem("user")).decodedToken._id;
// console.log(id)

const ProfileEvent = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [data, setData] = useState([]);
  const[loading1,setLoading1]=useState(false);
  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    setLoading1(true);
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/myEvent`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);
    setData(result);
    setLoading1(false);
  };

  return (
    <div className="profile-event-overall">
      {
        loading1 ?
        <div
          role="status"
          style={{ height: "15px", width: "15px",margin:'auto'}}
        >
          <span className="text-black m-auto">Loading...</span>
        </div>:
        data.length ? (
          data.map((item) => (
            <div key={item._id} className="profile-event-card">
              <h4>{item.title}</h4>
              <div className="profile-event-icon-desc">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="fa-xl"
                  style={{ color: "#FE0000" }}
                />
                <p>{item.venue}</p>
              </div>
  
              <div className="profile-event-icon-desc-flex">
                <div className="profile-event-icon-desc">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="fa-xl"
                    style={{ color: "#0028B7" }}
                  />
                  <p>{item.eventDate}</p>
                </div>
                <div className="profile-event-icon-desc">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="fa-xl"
                    style={{ color: "#B70099" }}
                  />
                  <p>{item.eventTime}</p>
                </div>
              </div>
  
              <div className="profile-event-description">
                <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>
                  Description:
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    fontWeight: "400",
                    fontSize: "1.1rem",
                  }}
                >
                  {item.desc}
                </div>
              </div>
  
              <div className="profile-event-footer">
                <div className="profile-event-date">
                  {" "}
                  {item &&
                    item.date &&
                    timeAgo.format(new Date(item.date).getTime() - 60 * 1000)}
                </div>
                {/* <Link to='/calendar' state={{eventId:item._id}}> */}
  
                <Link  to='/calendar' state={{eventId:item._id}} className="profile-event-button">
                  View In Calendar
                  </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="font-[700] text-[1.1rem] pt-2 text-center m-auto">
            You haven't posted any event yet!
          </div>
        )}
      
    </div>
  );
};

export default ProfileEvent;
