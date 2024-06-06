import React, { useState, useEffect } from "react";
import "./HomePageEvent.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { useStateValue } from "../../StateProvider";
import Cal from "./date.png";

const HomePageEvent = (props) => {
  const [event, setEvent] = useState([]);
  const [loading,setLoading]=useState(true);

  const [{ allEventsData }] = useStateValue();

  const handleEvents = (res) => {
    // res ----> all events coming from props
    setLoading(true);
    let today = new Date();
    let result = [];
    res.map((event) => {
      let eveDate = new Date(event.eventDate + " " + event.eventTime);
      if (today < eveDate) {
        result.push(event);
      }
    });
    result = result.reverse();
    // setLoading(false);
    if (props.clgData) {
      if (result.length > 0) {
        if (props.clgData === "All") {
          setEvent(result);
        } else {
          let array = [];
          if (props.eveD) {
            result.map((eve) => {
              if (
                eve.postedBy.collegeName === props.clgData &&
                eve.eventDate === props.eveD
              ) {
                array.push(eve);
              }
            });
          } else {
            result.map((eve) => {
              if (eve.postedBy.collegeName === props.clgData) {
                array.push(eve);
              }
            });
          }
          if (array.length > 0) {
            setEvent(array);
          } else {
            setEvent([]);
          }
        }
        setLoading(false);
      }
    } else if (props.eveD) {
      let array = [];
      result.map((eve) => {
        if (eve.eventDate === props.eveD) {
          array.push(eve);
        }
      });
      if (array.length > 0) {
        setEvent(array);
      } else {
        setEvent([]);
      }
      setLoading(false);
    } else {
      setEvent(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allEventsData) {
      handleEvents(allEventsData);
    }
  }, [props, props.clgData]);

  return (
    <div className="overall-main-page-event">
      {
      !loading && event ?
      <div className="event-main-div-res">
        {event.length > 0 ? (
          event.map((item) => (
            <div className="HomePageEvent" key={item._id}>
              <div className="upcoming_event_title">{item.title}</div>
              <div className="home-page-event-time">
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    version="1.1"
                  >
                    <g transform="matrix(1,0,0,1,0,0)">
                      <path
                        d="M0,14H4v4H0v-4Zm6,4h5v-4H6v4ZM0,12H4v-4H0v4Zm6,12h5v-4H6v4Zm7-12h5v-4h-5v4Zm-7,0h5v-4H6v4ZM0,24H4v-4H0v4ZM20,12h4v-4h-4v4Zm-7,12h5v-4h-5v4Zm7,0h4v-4h-4v4Zm1-22h-3V0h-2V2H8V0h-2V2H3C1.35,2,0,3.35,0,5v1H24v-1c0-1.65-1.35-3-3-3Zm-1,16h4v-4h-4v4Zm-7,0h5v-4h-5v4Z"
                        fill="#eb732fff"
                        data-original-color="#000000ff"
                      />
                    </g>
                  </svg>
                {/* <img src={Cal} alt="cal" /> */}
                <p className="home-page-event-time-p">
                  Event Date : {item.eventDate}
                </p>
              </div>
              <div className="home-page-event-description">{item.desc}</div>
              <div className="home-page-event-button">
                <Link to="/calendar" state={{ eventId: item._id }}>
                  <button className="home-page-event-button-knowmore">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          
          // Skeleton view for event 
          <div className="HomePageEvent">
            <div style={{textAlign:"center"}}>No Upcoming Events !</div>
          </div>
        )}
      </div>:
      <div className="HomePageEvent">
      <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      }
      

      {/* mobile view */}
      <div className="main-event-carousel">
        <Carousel
          autoPlay
          interval="5000"
          showArrows={true}
          showIndicators={true}
          showThumbs={false}
          infiniteLoop
        >
          {event.map((item, index) => (
            <div className="HomePageEvent">
              <Scrollbars style={{ height: "150px" }}>
                <h2> {item.title} </h2>
                <div className="home-page-event-time">
                
                  <FontAwesomeIcon icon={faClock} className="fa-xl" />
                  <p className="home-page-event-time-p">{item.eventDate}</p>
                </div>
                <div className="home-page-event-description">{item.desc}</div>
                <div className="home-page-event-button pb-3">
                  <Link to="/calendar" state={{ eventId: item._id }}>
                    <button className="home-page-event-button-knowmore">
                      Know More
                    </button>
                  </Link>
                </div>
              </Scrollbars>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePageEvent;
