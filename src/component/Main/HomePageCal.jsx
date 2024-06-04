import React, { useEffect, useState } from "react";
import "./HomePageCal.css";
import Calendar from "react-calendar";
import { useStateValue } from "../../StateProvider";
import moment from 'moment';

const HomePageCal = ({ clgData, eventSel }) => {
  const [value, onChange] = useState(new Date());
  const [event, setEvent] = useState([]);
  const [dupData, setDupData] = useState([]);

  const [{ allEventsData },dispatch] = useStateValue();

  useEffect(() => {
    if (dupData) {
      console.log("yes");
      let today = new Date();
      let result = [];
      let newResult = [];
      dupData.map((event) => {
        let eveDate = new Date(event.eventDate + " " + event.eventTime);
        if (today < eveDate) {
          result.push(event.eventDate)
          newResult.push(event);
        }
      })
      result = result.reverse();
      setEvent(result);
      if (clgData) {
        if (clgData === "All") {
          setEvent(result);
        } else {
          if (dupData.length > 0) {
            let array = [];
            newResult.map((eve) => {
              if (eve.postedBy.collegeName === clgData) {
                array.push(eve.eventDate);
              }
            })
            if (array.length > 0) {
              setEvent(array);
            } else {
              setEvent([]);
            }
          }
        }
      } else {
        setEvent(result);
      }
    }

    if (allEventsData) {
      setDupData(allEventsData)
    } else {
      getAllEvents();
    }
  }, [clgData,dupData])

  const getAllEvents =async () => {
    let res = await fetch("https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/getAllEvent");
    res = await res.json();
    dispatch({
      type: 'INIT_ALL_EVENT',
      item: res,
    });
  }

  const handleChange = (day) => {
    const date = moment(day).format("YYYY-MM-DD");
    console.log(date, "cal");
    eventSel(date)
  }

  return (
    <div className="home-page-cal">
      <div className="calendar-container">
        <Calendar onChange={handleChange} value={value}
          showYearPicker={false}
          tileClassName={({ date, view }) => {
            if (event.find(x => x === moment(date).format("YYYY-MM-DD"))) {
              return 'highlightbtn1'
            }
          }} />
      </div>
    </div>
  );
};

export default HomePageCal;
