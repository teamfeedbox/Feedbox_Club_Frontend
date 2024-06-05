import React, { useState, useEffect, useRef } from "react";
import "./Overview.css";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEnvelope,
  faGraduationCap,
  faIdCard,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown";

import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

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

function Overview(props) {
  const location = useLocation();
  const propsData = location.state;
  // console.log(propsData)

  const [skills, setSkills] = useState([]);
  const [profileSubmit, SetProfileSubmit] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState("Images/girl.jpg");
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [userId, setUserId] = useState("");
  const [show1, setShow1] = useState(false);
  const [data, setData] = useState();

  const [newOption, setNewOption] = useState("");
  const inputRef = useRef(null);

  // const [memberDetail, setMemberDeatil] = useState();

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [{ currentUser }, dispatch] = useStateValue();

  let onSelectNames = (skills) => {
    setSkills(skills);
  };

  useEffect(() => {
    getUser();
    setLoad(false);
  }, [props.send,load]);

  const getUser = async () => {
    if (currentUser) {
      setData(currentUser);
      return;
    }
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result);
    setUserId(result._id);
    dispatch({
      type: "INIT_USER",
      item: result,
    });
    
  };

  const updateSkills = async (userId) => {
    setLoading(true);
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/updateDetail/${userId}`, {
      method: "put",
      body: JSON.stringify({ skills }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    
    
      setLoad(true);
      setLoading(false);
      handleClose1();
      window.location.href = "/profile";
    console.log(result);

  };

  const handleRemove = (e) => {
    console.log(e);
    setSkills(e);
  };

  return (
    <>
      {/* propsData contains data of user from approval page */}
      {propsData === null ? (
        <div className="Overview-Container">
          <div className="Overview-Left">
            <p className="Overview-Left-P">{data && data.bio}</p>
            <div className="Overview-Detail">
              <section>
                <div className="Detail-icon1">
                  <FontAwesomeIcon className="fa-lg" icon={faEnvelope} />
                </div>
                <div className="Profile-Edit-Mail">
                  <div>
                    <span>Email:</span>
                    <p className="Overview-Left-P">{data && data.email}</p>
                  </div>
                  {profileSubmit ? <button type="submit">Save</button> : null}
                </div>
              </section>

              <section>
                <div className="Detail-icon2">
                  <FontAwesomeIcon className="fa-lg" icon={faIdCard} />
                </div>
                <div>
                  <span className="text-[1.1rem] font-[700]">Unique Id: </span>
                  <p className="text-[1rem] font-[400] ">
                    {data && data.uniqueId}
                  </p>
                </div>
              </section>
              <section>
                <div className="Detail-icon3">
                  <FontAwesomeIcon className="fa-lg" icon={faUniversity} />
                </div>
                <div>
                  <span className="text-[1.1rem] font-[700]">University:</span>
                  <p className="text-[1rem] font-[400] ">
                    {data && data.collegeName}
                  </p>
                </div>
              </section>
              <section>
                <div className="Detail-icon4">
                  <FontAwesomeIcon className="fa-lg" icon={faGraduationCap} />
                </div>
                <div>
                  <span className="text-[1.1rem] font-[700] ">Year:</span>
                  <p className="text-[1rem] font-[400] ">
                    {data && data.collegeYear}
                  </p>
                </div>
              </section>
            </div>
            <div className="Overview-Skills">
              <div className="Skills-Title">Skills:</div>
              <div className="Overview-Sub-Skills">
                {data &&
                  data.skills &&
                  data.skills.map((data, index) => (
                    <span
                      style={{
                        background: backColor[index],
                        color: fColor[index],
                      }}
                      key={index}
                      className="Skills"
                    >
                      {data}
                    </span>
                  ))}
                <span
                  className="Add-Event"
                  style={{ marginTop: "15px" }}
                  onClick={handleShow1}
                >
                  <FontAwesomeIcon className="fa-lg" icon={faAdd} />
                </span>
              </div>
            </div>
            {/* ****logout*** */}
          </div>

          {/* modal to add skills */}
          <Modal show={show1}>
            <Modal.Header closeButton onHide={handleClose1}>
              <Modal.Title className="club-member-modal-header">
                Add Skills
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Multiselect
                value={skills}
                onChange={(e) => console.log()}
                placeholder="Add Skill"
                displayValue=""
                isObject={false}
                onKeyPressFn={function noRefCheck() {}}
                onRemove={(e) => {
                  handleRemove(e);
                }}
                onSearch={function noRefCheck() {}}
                onSelect={onSelectNames}
                selectedValues={data && data.skills}
                options={[
                  "Web Development",
                  "App Development",
                  "SEO",
                  "Linkedin Optimization",
                  "Graphic Design",
                  "Video Editing",
                  "Time Management",
                  "Digital Marketing",
                  "Content Writing",
                  "Ads",
                ]}
              />
            </Modal.Body>
            <Modal.Footer>
            <Button
                variant="primary" className="save-btn">
             {loading ? (
                <div
                  className="spinner-border text-blue"
                  role="status"
                  style={{
                    height: "15px",
                    width: "15px",
                    marginTop: "3px",
                  }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <div
                  onClick={() => {
                    // handleClose1();
                    updateSkills(data._id);
                  }}
                >
                  Save
                </div>
              )}
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="Overview-Right">
            <div className="Overview-Right-Statistics">
              <h5 className="text-[1.1rem] font-[700] ">
                Community Statistics:
              </h5>
              <div className="statistics">
                <section>
                  <div className="Detail-icon5">
                    <img src="Images/Money.png"></img>
                  </div>
                  <div className="Right-Sub">
                    <span className="text-[1.1rem] font-[700]">
                      {" "}
                      {data && data.coins}{" "}
                    </span>
                    <p className="text-[1rem] font-[400] ">Coins Collected</p>
                  </div>
                </section>

                <section>
                  <div className="Detail-icon Detail-icon6">
                    <img src="Images/Stars.png"></img>
                  </div>
                  <div className="Right-Sub">
                    <span className="text-[1.1rem] font-[700] ">
                      {" "}
                      {data && data.events.length}{" "}
                    </span>
                    <p className="text-[1rem] font-[400] ">Sessions Attended</p>
                  </div>
                </section>
              </div>
            </div>

            <div className="Overview-Right-Statistics Overview-Right-Statistics1">
              <h5 className="text-[1.1rem] font-[700] ">
                Enrolled Sessions:
                <div></div>
              </h5>
              <section className="Enrolled-Section">
                {data ? (
                  data.interestedEvents.map((date, index) => (
                    <Link
                      to="/calendar"
                      state={{ eventId: date._id }}
                      style={{ textDecoration: "none" }}
                      className="Sessions-Section"
                    >
                      <div style={{ color: "#848283" }}>
                        {new Date(date.eventDate).toString().split(" ")[0]}
                      </div>
                      <div style={{ color: "#010001" }}>
                        {new Date(date.eventDate).toString().split(" ")[2]}{" "}
                        {new Date(date.eventDate).toString().split(" ")[1]}
                      </div>
                      <div style={{ color: "#ff5a5f" }}>{date.eventTime}</div>
                    </Link>
                  ))
                ) : (
                  <div className="text-[1rem] font-[500] flex my-auto mx-2 text-center">
                    {" "}
                    You have not enrolled for any event yet!{" "}
                  </div>
                )}

                <div className="Add-Event-Cont">
                  <Link to="/calendar">
                    <div className="Add-Event1">
                      <FontAwesomeIcon className="fa-lg" icon={faAdd} />
                    </div>
                  </Link>
                </div>
              </section>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="Overview-Container">
          <div className="Overview-Left">
            <p className="Overview-Left-P">{propsData && propsData.bio}</p>
            <div className="Overview-Detail">
              <section>
                <div className="Detail-icon1">
                  <FontAwesomeIcon className="fa-lg" icon={faEnvelope} />
                </div>
                <div className="Profile-Edit-Mail">
                  <div>
                    <span>Email:</span>
                    <p className="Overview-Left-P">
                      {propsData && propsData.email}
                    </p>
                  </div>
                  {profileSubmit ? <button type="submit">Save</button> : null}
                </div>
              </section>

              <section>
                <div className="Detail-icon2">
                  <FontAwesomeIcon className="fa-lg" icon={faIdCard} />
                </div>
                <div>
                  <span className="text-[1.1rem] font-[700]">Unique Id: </span>
                  <p className="text-[1rem] font-[400] ">
                    {propsData && propsData.uniqueId}
                  </p>
                </div>
              </section>
              <section>
                <div className="Detail-icon3">
                  <FontAwesomeIcon className="fa-lg" icon={faUniversity} />
                </div>
                <div>
                  <span className="text-[1.1rem] font-[700]">University:</span>
                  <p className="text-[1rem] font-[400] ">
                    {propsData && propsData.collegeName}
                  </p>
                </div>
              </section>
              <section>
                <div className="Detail-icon4">
                  <FontAwesomeIcon className="fa-lg" icon={faGraduationCap} />
                </div>
                <div>
                  <span className="text-[1.1rem] font-[700] ">Year:</span>
                  <p className="text-[1rem] font-[400] ">
                    {propsData && propsData.collegeYear}
                  </p>
                </div>
              </section>
            </div>
            <div className="Overview-Skills">
              <div className="Skills-Title">Skills:</div>
              <div className="Overview-Sub-Skills">
                {propsData &&
                  propsData.skills &&
                  propsData.skills.map((data, index) => (
                    <span
                      style={{
                        background: backColor[index],
                        color: fColor[index],
                      }}
                      key={index}
                      className="Skills"
                    >
                      {data}
                    </span>
                  ))}
                <span
                  className="Add-Event"
                  style={{ marginTop: "15px" }}
                  onClick={handleShow1}
                >
                  <FontAwesomeIcon className="fa-lg" icon={faAdd} />
                </span>
              </div>
            </div>
          </div>

         

          <div className="Overview-Right">
            <div className="Overview-Right-Statistics">
              <h5 className="text-[1.1rem] font-[700] ">
                Community Statistics:
              </h5>
              <div className="statistics">
                <section>
                  <div className="Detail-icon5">
                    <img src="Images/Money.png"></img>
                  </div>
                  <div className="Right-Sub">
                    <span className="text-[1.1rem] font-[700]">
                      {" "}
                      {propsData && propsData.coins}{" "}
                    </span>
                    <p className="text-[1rem] font-[400] ">Coins Collected</p>
                  </div>
                </section>

                <section>
                  <div className="Detail-icon Detail-icon6">
                    <img src="Images/Stars.png"></img>
                  </div>
                  <div className="Right-Sub">
                    <span className="text-[1.1rem] font-[700] ">
                      {" "}
                      {propsData && propsData.events.length}{" "}
                    </span>
                    <p className="text-[1rem] font-[400] ">Sessions Attended</p>
                  </div>
                </section>
              </div>
            </div>

            <div className="Overview-Right-Statistics Overview-Right-Statistics1">
              <h5 className="text-[1.1rem] font-[700] ">
                Enrolled Sessions:
                <div></div>
              </h5>
              <section className="Enrolled-Section">
                {propsData && propsData.length>0 ? (
                  propsData.interestedEvents.map((date, index) => (
                    <Link
                      to="/calendar"
                      state={{ eventId: date._id }}
                      style={{ textDecoration: "none" }}
                      className="Sessions-Section"
                    >
                      <div style={{ color: "#848283" }}>
                        {new Date(date.eventDate).toString().split(" ")[0]}
                      </div>
                      <div style={{ color: "#010001" }}>
                        {new Date(date.eventDate).toString().split(" ")[2]}{" "}
                        {new Date(date.eventDate).toString().split(" ")[1]}
                      </div>
                      <div style={{ color: "#ff5a5f" }}>{date.eventTime}</div>
                    </Link>
                  ))
                ) : (
                  <div className="text-[1rem] font-[500] flex my-auto mx-2 text-center">
                    {" "}
                    You have not enrolled for any event yet!{" "}
                  </div>
                )}

                <div className="Add-Event-Cont">
                  <Link to="/calendar">
                    <div className="Add-Event1">
                      <FontAwesomeIcon className="fa-lg" icon={faAdd} />
                    </div>
                  </Link>
                </div>
              </section>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Overview;
