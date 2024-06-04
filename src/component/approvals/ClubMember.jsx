import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";
import Overview from "../Profile/Overview";

const ClubMember = ({ props }) => {
  const [searchval, setSearchVal] = useState("");
  const [clubMember, setClubMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState();
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [member, setMember] = useState("");

  const role = JSON.parse(localStorage.getItem("user")).role;
  const currentCollege = JSON.parse(localStorage.getItem("user")).college;

  const handleClose = () => {
    setShow(false);
    setConfirm(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const getUser = async () => {
    setLoading3(true);
    try {
      const result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/get`);
      const res = await result.json();
      const cm = res.filter((data) => data.role === "Club_Member").reverse();
      if (role === "Super_Admin") {
        if (props.clg) {
          if (props.clg === "All") {
            setData(cm);
            setClubMember(cm);
          } else {
            const clgSel = cm.filter((data) => data.collegeName === props.clg);
            setData(clgSel);
            setClubMember(clgSel);
          }
        } else {
          setClubMember(cm);
          setData(cm);
        }
      } else {
        const clg = cm.filter((data) => data.collegeName === currentCollege);
        setClubMember(clg);
        setData(clg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading3(false);
    }
  };

  useEffect(
    () => {
      getUser();
      setLoad(false);
    },
    [props, load],
    loading3
  );

  // search user
  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    if (e.target.value !== "") {
      let matched = [];
      data.length > 0 &&
        data.forEach((user) => {
          const value = user.name.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setClubMember(matched);
    } else {
      setClubMember(data);
    }
  };

  // submit handler for making club member as lead
  const submitHandler = async () => {
    if (role === "Admin" || role === "Super_Admin") {
      if (value && position) {
        setLoading(true);
        let val;
        if (value === "Admin") {
          val = {
            role: value,
            position: position,
          };
        } else if (value === "Lead") {
          val = {
            role: value,
            position: position,
          };
        }
        const data = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/updateDetail/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(val),
        });
        const res = await data.json();
        console.log(res);
        setConfirm(false);
        setShow(false);
        setPosition("");
        setValue("");
        setId("");
        setName("");
        setLoading(false);
        setLoad(true);
      } else {
        alert("Please input Position and role...");
      }
    } else {
      if (position) {
        setLoading(true);
        let val = {
          role: "Lead",
          position: position,
        };
        const data = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/updateDetail/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(val),
        });
        const res = await data.json();
        console.log(res);
        setConfirm(false);
        setShow(false);
        setPosition("");
        setValue("");
        setId("");
        setName("");
        setLoading(false);
        setLoad(true);
      } else {
        alert("Please input Position...");
      }
    }

    //  notification
    await fetch("https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/addNotifications", {
      method: "post",
      body: JSON.stringify({
        message: `Congrats: Now You are upgraded Club Member to ${value}, please login again`,
        messageScope: "private",
        userId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      // alert(res.json)
      setConfirm(false);
      setShow(false);
      setPosition("");
      setValue("");
      setId("");
      setName("");
      setLoading(false);
      setLoad(true);
    });
  };

  return (
    <div>
      {/* search */}
      <div className="pending-approval-search">
        <div className="relative text-lg bg-transparent text-gray-800">
          <div className="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3">
            <input
              className="bg-transparent w-full  border-none mr-10 px-2 text-[1rem] font-[400] leading-tight focus:outline-none"
              type="text"
              value={searchval}
              onChange={searchHandler}
              placeholder="Search Member..."
            />
            <button type="submit" className="absolute right-0 top-2 mr-4 ">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      {/* table  */}
      <div className="lg:border">
        <Scrollbars style={{ height: "250px" }}>
          <table className="table-auto w-full max-w-[1300px]">
            <tbody className="text-sm divide-y divide-gray-100 max-w-[1150px]">
              {loading3 ? (
                <div
                  className="spinner-border text-blue"
                  role="status"
                  style={{
                    height: "35px",
                    width: "35px",
                    marginTop: "15px",
                    marginLeft: "80px",
                  }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : clubMember.length > 0 ? (
                clubMember.map((member) => (
                  <tr className="flex justify-between max-w-[1150px]">
                    <td className="p-2 w-[200px] lg:w-[300px]">
                      <div className="flex items-center">
                        <img
                          className="rounded-full w-[40px] h-[40px] object-center"
                          src={member.img}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />
                        {
                         role==="Super_Admin" || role=== "Admin" ?
                          <Link
                          className="link-to-profile"
                          to="/profile"
                          state={member}
                        >
                          <div className="ml-2 text-[.8rem] md:text-[1rem]  lg:text-[1.05rem]  font-[400]">
                            {" "}
                            {member.name}{" "}
                          </div>
                        </Link>:
                        <div className="ml-2 text-[.8rem] md:text-[1rem]  lg:text-[1.05rem]  font-[400]">
                        {" "}
                        {member.name}{" "}
                      </div>
                        }

                        
                      </div>
                    </td>
                    <td className="p-2 lg:flex items-center hidden md:block">
                      <div className=" text-gray-800 text-[1rem] font-[400]">
                        {member.branch}
                      </div>
                    </td>
                    <td className="pt-2 pb-2 flex justify-end">
                      <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                        <button className="bg-[#407CD4] h-[25px] py-3 flex items-center px-3 rounded-xl text-white bg-[#00D22E] hover:bg-[#03821f]">
                          <div
                            className=" text-[.5rem] md:text-[1rem]  lg:text-[1.05rem] font-[500]"
                            onClick={() => {
                              setId(member._id);
                              setName(member.name);
                              handleShow();
                            }}
                          >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />

                            {role === "Lead"
                              ? " Make Lead"
                              : " Make Lead/ Make Admin"}
                          </div>
                        </button>
                      </div>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        className="club-member-modal"
                      >
                        <form>
                          <Modal.Header
                            closeButton
                            className="club-member-modal-header"
                          >
                            {role === "Lead"
                              ? " Are you sure you want to make club member as lead ?"
                              : " Select Role of a Club Member !"}
                          </Modal.Header>

                          {role === "Lead" ? (
                            ""
                          ) : (
                            <Modal.Body>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  You want to make {name} as Lead/Admin ?{" "}
                                </div>
                                <div style={{ display: "flex", gap: "18px" }}>
                                  <div>
                                    <select
                                      // value={value}
                                      name="val"
                                      onChange={(e) => {
                                        setValue(e.target.value);
                                      }}
                                      className="p-2 border-2  text-[#3174AD] text-[1rem] font-[400] border-[#3174AD] rounded-3xl w-[110%]"
                                    >
                                      <option
                                        value="Select Role"
                                        hidden
                                        selected
                                        disabled
                                      >
                                        Select Role
                                      </option>
                                      <option value="Lead"> Lead</option>
                                      <option value="Admin">Admin</option>
                                    </select>
                                  </div>
                                  {value === "" ? (
                                    ""
                                  ) : (
                                    <div className="selected-val">
                                      {name} has been selected as a {value}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Modal.Body>
                          )}

                          <Modal.Footer className="modal-footer club-member-modal-footer">
                            <div className="modal-footer-club-member-yes-no-div">
                              <div onClick={() => setConfirm(!confirm)}>
                                Yes
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShow(false);
                                  setConfirm(false);
                                  setValue("");
                                  setPosition("");
                                }}
                              >
                                No
                              </button>
                            </div>
                            {confirm ? (
                              <form className="club-member-modal-confirm">
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Specify Position"
                                    required
                                    onChange={(e) =>
                                      setPosition(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  {loading ? (
                                    <div
                                      className="spinner-border text-blue"
                                      role="status"
                                      style={{
                                        height: "15px",
                                        width: "15px",
                                        marginTop: "3px",
                                        marginLeft: "80px",
                                      }}
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        submitHandler();
                                      }}
                                    >
                                      Confirm
                                    </button>
                                  )}
                                </div>
                              </form>
                            ) : (
                              ""
                            )}
                          </Modal.Footer>
                        </form>
                      </Modal>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="nopending">
                  <div className="text-[1rem] font-[400]">
                    No Club Members !!
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
};

export default ClubMember;
