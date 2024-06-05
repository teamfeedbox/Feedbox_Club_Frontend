import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import {
  faLocationDot,
  faClock,
  faCirclePlus,
  faCalendarAlt,
  faXmark,
  faPodcast,
  faFlag,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import "./ReactBigCalendar.css";
import { useStateValue } from "../../StateProvider";
// import bg from "../assets/mainBg.png";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const location = useLocation();
  const eveId = location.state && location.state.eventId;

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venue, setVenue] = useState("");
  const [desc, setDesc] = useState("");
  const [scope, setScope] = useState();
  const [speaker, setSpeaker] = useState("");
  const [myEvent, setMyEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [deletebtn, setDeleteBtn] = useState(false);
  const [clgSelected, setClgSelected] = useState();
  const [allClgs, setAllClgs] = useState([]);
  const [eventPre, setEventPre] = useState("Calendar-view-events-hide");
  const [user, setUser] = useState();
  const [eventClicked, setEventClicked] = useState(false);
  // state for Add Event pop up
  const [addEventModel, setAddEventModel] = useState(false);
  // State for preview Event
  const [preEventModel, setPreEventModel] = useState(false);
  // Show and hide interested button
  const [interestedBtn, setInterestedBtn] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState();
  // const [id, setId] = useState();
  const [eventData, setEventData] = useState([]);
  const [dupliEvents, setDupliEvents] = useState([]);
  const [handleClgSel, setHandleClgSel] = useState(false);
  const [infinite, setInfinite] = useState(true);
  const [MAVisibility, setMAVisibility] = useState(false);
  const [eventProp, setEventProp] = useState(true);
  const [calIntersted, setCalInterested] = useState(false);
  const [load, setLoad] = useState(false);

  const id =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).id;
  const role =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).role;
  const college =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).college;

  const [{ allEventsData, currentUser }, dispatch] = useStateValue();

  // Mindate for diasble previous dates in calender
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const mindate = [yyyy, mm, dd].join("-");

  // get user
  const getUser = async () => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      result = await result.json();
      setUser(result);
    }
  };

  const compareDate = (date, time) => {
    let today = new Date();
    let eveDate = new Date(date + " " + time);
    setMAVisibility(today > eveDate);
  };

  // show particular event
  const setCalenderEvent = (value) => {
    setInterestedBtn(true);
    let myEvent;
    let data = [];
    if (allEventsData) data = allEventsData;
    else if (dupliEvents) data = dupliEvents;

    data.map(function (val, index) {
      console.log(val._id, value);
      if (val._id === value) {
        setMyEvent(val);
        compareDate(val.eventDate, val.eventTime);
        setEventPre("Calendar-view-events");
        setPreEventModel(true);
        myEvent = val;
        console.log("1");
        setEventProp(false);
      }
    });
    myEvent &&
      myEvent.attendance.map((data) => {
        if (data._id === id) {
          console.log("3");
          setInterestedBtn(false);
        }
      });
    setLoading(false);
  };

  // Get all Colleges
  const getColleges = async () => {
    const data = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/colleges/get`);
    const res = await data.json();
    let val = [];
    res.map((data) => {
      val.push(data.name);
    });
    setAllClgs(val);
  };

  // Get All Events
  const showEvent = async () => {
    let result;
    if (allEventsData) {
      result = allEventsData;
    } else {
      console.log("lojihihi");
      setInfinite(false);
      result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/getAllEvent`);
      result = await result.json();
      dispatch({
        type: "INIT_ALL_EVENT",
        item: result,
      });
    }
    console.log(result, "llllol");
    setDupliEvents(result);
    if (role === "Super_Admin") {
      result.map((data, i) => {
        data.start = new Date(data.eventDate + " " + data.eventTime);
        data.end = new Date(data.eventDate + " " + data.eventTime);
        data.id = i;
      });
      setEventData(result);
      setLoading(false);
    } else {
      let array = [];
      result.map((data, i) => {
        if (data.collegeName == college || data.scope == "public") {
          data.start = new Date(data.eventDate + " " + data.eventTime);
          data.end = new Date(data.eventDate + " " + data.eventTime);
          data.id = i;
        }
        array.push(data);
      });
      setEventData(array);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clgSelected) {
      if (clgSelected === "All") {
        setEventData(dupliEvents);
      } else {
        let array = [];
        dupliEvents.length > 0 &&
          dupliEvents.map((eve, i) => {
            if (eve.collegeName === clgSelected) {
              array.push(eve);
            }
          });
        setEventData(array);
      }
    } else {
      if (infinite || calIntersted) {
        setCalInterested(false);
        showEvent();
      }
    }
    if (eventClicked && selectedEvent) {
      setEventClicked(false);
      setMAVisibility(false);
      setCalenderEvent(selectedEvent._id);
    } else {
      if (eveId && eventProp) {
        console.log("eveId", eveId);
        setCalenderEvent(eveId);
      }
    }

    getUser();
    getColleges();
    setLoading(false);
    setLoad(false);
  }, [eventClicked, selectedEvent, clgSelected, loading, load]);

  // Mark Interested
  const attendanceUpdate = async (eveid) => {
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/updateEvent/${eveid}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    console.log(allEventsData, "all");
    console.log(result, "result");

    allEventsData.map((data, i) => {
      if (data._id === result._id) {
        data.attendance = result.attendance;
      }
    });

    console.log(allEventsData, "new");

    dispatch({
      type: "INIT_ALL_EVENT",
      item: allEventsData,
    });

    let data = await fetch(
      `https://club-community-feedbox2-0-sdcn.vercel.app/update/interested/events/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ event: myEvent }),
      }
    );
    const res = await data.json();
    console.log(res);
    setInterestedBtn(false);
    setCalInterested(true);
    setLoading(true);
    setInfinite(true);
  };

  // toastify
  if (typeof window !== "undefined") {
    injectStyle();
  }

  // create event
  const addEvent = async (e) => {
    setLoading2(true);
    console.log(loading);
    let val = {
      title,
      eventDate,
      eventTime,
      venue,
      desc,
      speaker,
    };

    if (role == "Lead") {
      val["scope"] = college;
      val["collegeName"] = college;
    } else if (role == "Admin") {
      val["scope"] = scope;
      val["collegeName"] = college;
    } else if (role == "Super_Admin") {
      val["scope"] = scope;
      val["collegeName"] = scope;
    }

    console.log(val, "val");
    e.preventDefault();
    toast.dark("Event Created Successfully!");
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/createEvent`, {
      method: "post",
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();

    console.log(result.event, "resultvbnvvbnvn");
    console.log(allEventsData, "pppp");
    const newData = [...allEventsData, result.event];

    console.log(newData, "newdata");
    dispatch({
      type: "INIT_ALL_EVENT",
      item: newData,
    });

    setTitle("");
    setScope("");
    setEventDate("");
    setEventTime("");
    setVenue("");
    setDesc("");
    setSpeaker("");
    setClgSelected();
    setAddEventModel(false);

    //  notification
    await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/addNotifications`, {
      method: "post",
      body: JSON.stringify({
        message: ` Alert: Join ${title} on ${eventDate} ${eventTime} at ${venue}`,
        messageScope: scope,
        userId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      // toast("Event Created Successfully!");
      setLoading2(false);
    });

    setLoad(true);
    setInfinite(true);
  };

  // handle event on select from react big calender
  const handleEvent = (val) => {
    setEventClicked(true);
    setSelectedEvent(val);
  };
  const handleSelect = ({ start }) => {
    const a = JSON.stringify(start);
    //  console.log(a.slice(1, 11))
    var tempDate = a.slice(1, 11);
    let today1 = new Date();
    // console.log(today1);
    var date = new Date().getDate();
    date -= 1;
    if (date < 10) {
      date = "0" + date;
    }
    var month = new Date().getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = new Date().getFullYear();
    var currentDate = year + "-" + month + "-" + date;

    if (tempDate < currentDate) {
      if (role !== "Club_Member")
        // toast.dark("Can't create event for previous date");
        alert("Can't create event for previous date");
    } else {
      if (role !== "Club_Member") setAddEventModel(true);
    }
  };

  // Delete Event
  const cancelEvent = async (id) => {
    setLoading2(true);
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/deleteEvent/${id}`, {
      method: "delete",
    });
    result = await result.json();
    setDeleteBtn(false);
    setLoading(false);
    setPreEventModel(false);

    //  notification
    //  await fetch("https://club-community-feedbox2-0-sdcn.vercel.app///addNotifications", {
    //   method: "post",
    //   body: JSON.stringify({
    //     message: ` Alert: ${title} has been cancelled`,
    //     messageScope: scope,
    //     userId: id,

    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("jwt"),
    //   },
    // }).then((res) => {
    //   // alert(res.json)
    //   setLoading(false);
    //   window.location.href="/calendar"
    // });
    setLoading2(false);

    window.location.href = "/calendar";
  };

  // Handle selection of clg
  const handleCollege = (e) => {
    setPreEventModel(false);
    setSelectedEvent("");
    setClgSelected(e.target.value);
  };

  return (
    <>
      <div className="Calendar-container"  style={{
      backgroundColor: 'white'
    }}>
        <div className="Calendar-left">
          {/* ----------------college dropdown for super admin--------------- */}
          {role && (role == "Super_Admin" || role === "Admin") ? (
            <div className=" my-4 mx-1 ">
              <select
                className="p-2 border-2 font-semibold text-[#3174AD] border-[#3174AD] rounded-3xl w-[100%] cursor-pointer"
                value={clgSelected}
                onChange={(e) => {
                  handleCollege(e);
                  setHandleClgSel(true);
                }}
              >
                <option className=" " value="College" hidden selected disabled>
                  College
                </option>
                <option value="All">All</option>
                {allClgs.length > 0 &&
                  allClgs.map((clg, i) => (
                    <option key={i} value={clg}>
                      {clg}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            ""
          )}

          {/* -----------Button to add event in calendar------------------*/}
          {role && role !== "Club_Member" ? (
            <div
              className="Calendar-add"
              onClick={() => {
                setAddEventModel(true);
                setPreEventModel(false);
              }}
            >
              <div>
                Create Event
                <FontAwesomeIcon
                  style={{ margin: "0px 0px 0px 10px" }}
                  icon={faCirclePlus}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {/* ------------Already created------------------------*/}
          <div className="Calendar-view">
            {preEventModel ? (
              <div
                className="Calendar-view-title"
                style={{ borderRadius: "20px 20px 0px 0px" }}
              >
                Events Preview
              </div>
            ) : (
              <div
                className="Calendar-view-title"
                style={{ borderRadius: "20px" }}
              >
                Events Preview
              </div>
            )}
          </div>

          {/* ------------Model to show already created event-------------------- */}
          {preEventModel ? (
            <div className="Calendar-view-events-container">
              <div className={eventPre}>
                <div className="event-pre-handle">
                  <div className="event-title">{myEvent && myEvent.title}</div>
                  <div
                    className="cancel-view-event"
                    onClick={() => {
                      setPreEventModel(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
                <div className="event-profile">
                  <FontAwesomeIcon
                    style={{ margin: "0 10px 0 0", color : "#ec4882" }}
                    icon={faPodcast}
                  />
                  {myEvent && myEvent.speaker}
                </div>
                <div className="event-profile">
                  <FontAwesomeIcon
                    style={{ margin: "0 10px 0 0", color : "#ec4882" }}
                    icon={faUniversity}
                  />
                  {myEvent && myEvent.postedBy.role === "Super_Admin"
                    ? "Super Admin"
                    : myEvent.postedBy.collegeName}
                </div>
                <div className="event-minor">
                  <div>
                    <FontAwesomeIcon
                      style={{ margin: "0 10px 0 0", color : "#ec4882" }}
                      icon={faLocationDot}
                    />
                    {myEvent && myEvent.venue}
                  </div>
                  <div>
                    <FontAwesomeIcon
                      style={{ margin: "0 10px 0 0", color : "#ec4882" }}
                      icon={faCalendarAlt}
                    />
                    {myEvent && myEvent.eventDate}
                  </div>

                  <div>
                    <FontAwesomeIcon
                      style={{ margin: "0 10px 0 0", color : "#ec4882" }}
                      icon={faClock}
                    />
                    {myEvent && myEvent.eventTime}
                  </div>
                </div>
                <div className="Pre-Event-desc">
                  <b>Descrpition</b>
                  <br />
                  {myEvent && myEvent.desc}
                </div>
                <div className="preview-button">
                  {role && role !== "Super_Admin" ? (
                    id && myEvent && id !== myEvent.postedBy._id ? (
                      new Date(myEvent && myEvent.eventDate).getTime() >
                      new Date(mindate).getTime() ? (
                        interestedBtn ? (
                          <button
                            type="button"
                            onClick={() => {
                              attendanceUpdate(myEvent && myEvent._id);
                              setInterestedBtn(false);
                            }}
                            style={{backgroundColor : '#9647ff'}}
                          >
                            Interested
                          </button>
                        ) : (
                          <button
                            type="button"
                            style={{
                              pointerEvents: "none",
                              backgroundColor: '#9647ff'
                            }}
                          >
                            Interested
                          </button>
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}

                  {(role === "Admin" ||
                    role === "Super_Admin" ||
                    (id && myEvent && id == myEvent.postedBy._id)) && (
                    <button
                      onClick={() => {
                        setDeleteBtn(true);
                      }}
                      style={{backgroundColor : "#9647ff"}}
                    >
                      Delete Event
                    </button>
                  )}

                  {deletebtn && (
                    <Modal show={deletebtn} onHide={() => setDeleteBtn(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure ?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: "black", display: "flex" }}>
                        Do you really want to delete this Event ? This process
                        cannot be undone.
                      </Modal.Body>
                      <Modal.Footer style={{ justifyContent: "right" }}>
                        <Button variant="danger">
                          {loading2 ? (
                            <div
                              class="spinner-border text-white"
                              role="status"
                              style={{ height: "15px", width: "15px" }}
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <div onClick={() => cancelEvent(myEvent._id)}>
                              Delete
                            </div>
                          )}
                        </Button>

                        <Button
                          variant="light"
                          onClick={() => setDeleteBtn(false)}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                </div>

                {MAVisibility && (
                  <div style={{ textAlign: "center" }}>
                    {role === "Admin" ||
                    role === "Super_Admin" ||
                    (id && myEvent && id == myEvent.postedBy._id) ? (
                      <button className="Mark-Attendence-btn">
                        <Link
                          to={"/attendance/" + (myEvent && myEvent.title)}
                          state={{ eventId: myEvent && myEvent._id }}
                          onClick={() => {
                            setEventPre("Calendar-view-events-hide");
                          }}
                        >
                          {myEvent && myEvent.attendanceSubmitted
                            ? "View Attendance"
                            : "Mark Attendance"}
                        </Link>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* -----------------Large right side Calendar------------------- */}
        <div className="React-Big-Calendar-Original">
          <Calendar
            views={["month", "agenda", "day"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={eventData}
            onSelectEvent={handleEvent}
            step={20}
            onSelectSlot={handleSelect}
          />
        </div>

        {/* to show popup to add event (Add Event) */}
        {addEventModel ? (
          <div className="Calendar-add-drop-container">
            <div className="Calendar-add-drop">
              <form onSubmit={addEvent}>
                <div className="calender-add-title">
                  <span>Create an Event</span>
                  <div
                    className="cancel-button"
                    onClick={() => {
                      setAddEventModel(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
                <div className="Calendar-title">
                  <span>Title</span>
                  <input
                    type="text"
                    required
                    placeholder="Add Event Title"
                    value={title}
                    maxlength="50"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    border: "1.5px solid black",
                    padding: "10px 10px 15px 10px",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>General</span>
                  {role !== "Lead" && (
                    <div className="input-container">
                      <FontAwesomeIcon
                        style={{ margin: "7px 10px 0 0" }}
                        icon={faFlag}
                      />
                      <select
                        required
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                      >
                        <option value="" selected disabled hidden>
                          Select Community
                        </option>
                        <option value="public" className="text-black">
                          Public
                        </option>
                        {(role === "Admin" || role === "Lead") && (
                          <option value={college} className="text-black">
                            {college}
                          </option>
                        )}
                        {role === "Super_Admin" &&
                          allClgs &&
                          allClgs.length > 0 &&
                          allClgs.map((clg) => (
                            <option value={clg} className="text-black">
                              {clg}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  <div className="input-container">
                    <FontAwesomeIcon
                      style={{ margin: "7px 10px 0 0" }}
                      icon={faPodcast}
                    />
                    <input
                      type="Speaker Name"
                      placeholder="Add Speaker Name"
                      value={speaker}
                      required
                      onChange={(e) => setSpeaker(e.target.value)}
                    ></input>
                  </div>
                  <div className="input-container">
                    <FontAwesomeIcon
                      style={{ margin: "7px 10px 0 0" }}
                      icon={faCalendarAlt}
                    />
                    <input
                      type="date"
                      required
                      value={eventDate}
                      min={mindate}
                      onChange={(e) => setEventDate(e.target.value)}
                    ></input>
                  </div>
                  <div className="input-container">
                    <FontAwesomeIcon
                      style={{ margin: "7px 10px 0 0" }}
                      icon={faClock}
                    />
                    <input
                      type="time"
                      required
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    ></input>
                  </div>
                  <div className="input-container">
                    <FontAwesomeIcon
                      style={{ margin: "7px 15px 0 0" }}
                      icon={faLocationDot}
                    />
                    <input
                      type="text"
                      placeholder="Add Venue...."
                      value={venue}
                      required
                      onChange={(e) => setVenue(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className="input-container input-container1"
                  style={{
                    margin: "25px 0 25px 0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="description">Descrpition</div>
                  <textarea
                    name="message"
                    rows="3"
                    cols="30"
                    placeholder="About . . ."
                    value={desc}
                    required
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="submit-button">
                  <button className="Calendar-submit">
                    {loading2 ? (
                      <div
                        class="spinner-border text-white"
                        role="status"
                        style={{ height: "15px", width: "15px" }}
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <button type="submit">Create</button>
                    )}
                  </button>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
