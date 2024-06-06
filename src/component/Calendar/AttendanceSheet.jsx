import React, { useEffect, useState } from "react";
import {
  faCircle,
  faLocationDot,
  faClock,
  faCalendarAlt,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import "./AttendanceSheet.css";
import NavbarRes from "../navbar/NavbarRes";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AttendanceSheet = () => {
  const location = useLocation();
  // Bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setLoading2(true);
    setShow(true);
    setLoading2(false);
  }

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [eventDuration, setEventDuration] = useState();
  const eventId = location.state.eventId;
  const [currentUserId, setcurrentUserId] = useState();

  useEffect(() => {
    getEvent();
    setLoading(false);

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    // console.log(user.id)
    setcurrentUserId(user.id);
  }, [loading]);

  const getEvent = async () => {
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/getEvent/${eventId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    console.log(result[0], "s;lkcfjihdgefy");
    setCurrentEvent(result[0]);
    setData(result[0].attendance);
    setValue(result[0].attendance);
  };

  const searchHandler = (e) => {
    if (e.target.value != "") {
      let val = e.target.value;
      let matched = [];
      value.length > 0 &&
        value.forEach((user) => {
          const data = user.name.toLowerCase().includes(val.toLowerCase());
          if (data) {
            matched.push(user);
          }
        });
      setData(matched);
    } else {
      setData(value);
    }
  };

  const handleCheckbox = (value) => {
    if (value.checked) {
      if (!checkedUsers.includes(value.val)) {
        setCheckedUsers((arr) => [...arr, value.val]);
      }
    } else {
      if (checkedUsers.includes(value.val)) {
        setCheckedUsers(checkedUsers.filter((item) => item != value.val));
      }
    }
  };

  const handleSubmit = async (e) => {
    setLoading2(true);
    e.preventDefault();
    // console.log(checkedUsers);
    if (checkedUsers.length > 0) {
      let absentees = [];
      let attendees = [];
      data.map((val) => {
        if (!checkedUsers.includes(val._id)) {
          absentees.push(val._id);
        } else {
          let obj = {
            id: val._id,
            coins: val.coins ? val.coins + 10 : 10,
          };
          attendees.push(obj);
        }
      });
      // console.log(absentees,"absentees");
      console.log(attendees);

      // delete absentee from events attendance array
      let result = await fetch(
        `https://club-community-feedbox2-0-sdcn.vercel.app/update/event/${currentEvent._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ absentees, eventDuration }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      const res = await result.json();
      console.log(res, "response");

      // console.log(currentEvent)
      // console.log(eventDuration);

      // update users coins and events aaray
      let userData = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/update/coins/events`, {
        method: "PUT",
        body: JSON.stringify({ attendees, currentEvent }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      setShow(false);
      setSubmitted(true);
      setLoading(true);

      // notifications
      attendees.map(async (val) => {
        await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/addNotifications", {
          method: "post",
          body: JSON.stringify({
            message: "Congrats! +10 coins added.",
            messageScope: "coins",
            userId: val.id,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }).then((res) => {
          // alert(res.json)
        });
      });
    }
    setLoading2(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Are you sure you want to submit?</Modal.Title>
            <FontAwesomeIcon
              className="fa-lg"
              icon={faXmark}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>
          <Modal.Body>
            <input
              className="block border-solid   p-2.5 w-full text-sm text-black-600 bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 border-black-600"
              placeholder="Event duration in minute"
              type="number"
              min={1}
              name="number"
              required
              onChange={(e) => setEventDuration(e.target.value)}
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-between w-[100vw]">
              <div className="attendance-model-btn" onClick={handleClose}>
                Back
              </div>
              <button className="attendance-model-btn">
                {
                  loading2 ?
                    <div
                      class="spinner-border text-white"
                      role="status"
                      style={{ height: "15px", width: "15px", marginTop: "3px" }}
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    :
                    <button type="submit">
                      Submit Attendence
                    </button>
                }
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="attendance">
        <div className="attendance-right">
          <h1>Attendance Sheet</h1>

          {/* *********Containing Title of event and search functionality********* */}

          <section className="attendence-title">
            {/* *****************Event title******************** */}
            <h5 className="mt-2 pl-2 md:ml-4">
              Event : {currentEvent && currentEvent.title}
            </h5>

            {/* ****************search functionality***************** */}
            <div className="form-inline  my-lg-0 res-table-search">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search by name"
                aria-label="Search"
                onChange={searchHandler}
              />
              <button className="btn btn-primary my-0 my-sm-0">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </section>

          {/* ***********attendance sheet display in the form of table************** */}
          <div className="attendance-sheet">
            <table className="table table-hover" rowKey="name">
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Attendee</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Year</th>
                  {currentEvent && !currentEvent.attendanceSubmitted && (
                    <th>Status</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <th scope="row"> {index + 1} </th>
                      <td> {item.name} </td>
                      <td>{item.branch}</td>
                      <td>{item.collegeYear}</td>
                      {currentEvent && !currentEvent.attendanceSubmitted && (
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item._id}
                              id="flexCheckDefault"
                              onChange={(e) =>
                                handleCheckbox({
                                  checked: e.target.checked,
                                  val: e.target.value,
                                })
                              }
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {data.length > 0 ? (
            <div className="attendance-count">
              {currentEvent && !currentEvent.attendanceSubmitted ?
                <div>
                  Total Attendee :
                  <span>
                    {checkedUsers.length > 0 ? checkedUsers.length : 0}
                  </span>
                </div> :
                <div>
                  Event Duration&nbsp;:&nbsp;
                  <span>
                    {currentEvent.eventDuration} minutes
                  </span>
                </div>
              }
              <div>
                Total Enrolled: <span>{data.length > 0 && data.length}</span>
              </div>
            </div>
          ) : (
            <div style={{textAlign:"center",padding:"20px"}}>No Interested Students!</div>
          )}
          {data.length > 0 ? (
            <div className="flex justify-between mx-12 my-5">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/calendar");
                }}
              >
                Back
              </button>


              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}

                disabled={currentEvent && currentEvent.attendanceSubmitted}
              >
                {currentEvent && currentEvent.attendanceSubmitted
                  ? "Submitted"
                  : "Submit"}
              </button>

            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default AttendanceSheet;
