import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";
import { Link } from "react-router-dom";

const Admin = (props) => {
  const [searchval, setSearchVal] = useState("");
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [id, setId] = useState();
  const [delshow, setDelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const role = JSON.parse(localStorage.getItem("user")).role;
  const currentCollege = JSON.parse(localStorage.getItem("user")).college;

  const handleDelClose = () => {
    setDelShow(false);
  };

  const getUser = async () => {
    setLoading3(true);
    try {
      const result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/get`);
      const res = await result.json();
      const admin = res.filter((data) => data.role === "Admin").reverse();

      if (role === "Super_Admin") {
        let clgSel = [];
        if (props.clg) {
          if (props.clg === "All") {
            setAdmin(admin);
            setData(admin);
          } else {
            const clgSel = admin.filter(
              (data) => data.collegeName === props.clg
            );
            setAdmin(clgSel);
            setData(clgSel);
          }
        } else {
          setAdmin(admin);
          setData(admin);
        }
      } else {
        const clg = admin.filter((data) => data.collegeName === currentCollege);
        setAdmin(clg);
        setData(clg);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [props, loading]);

  // search user
  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    if (e.target.value != "") {
      let matched = [];
      data.length > 0 &&
        data.forEach((user) => {
          const value = user.name.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setAdmin(matched);
    } else {
      setAdmin(data);
    }
  };

  const handleDeleteAdmin = async () => {
    setLoading(true);
    const data = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/updateDetail/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "Club_Member" }),
    });
    const res = await data.json();
    console.log(res);
    setDelShow(false);

    //  notification
    await fetch("https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/addNotifications", {
      method: "post",
      body: JSON.stringify({
        message: `Now You are degraded Admin to Club Member, please login again`,
        messageScope: "private",
        userId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      setLoading(false);
      // alert(res.json)
    });
  };

  return (
    <div>
      {/* search */}
      <div className="pending-approval-search">
        <div class="relative text-lg bg-transparent text-gray-800">
          <div class="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3">
            <input
              class="bg-transparent w-full  border-none mr-10 px-2 leading-tight focus:outline-none"
              type="text"
              value={searchval}
              onChange={searchHandler}
              placeholder="Search Member..."
            />
            <button type="submit" class="absolute right-0 top-2 mr-4 ">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>

      {/* table  */}
      <div className="lg:border">
        <Scrollbars style={{ height: "250px" }}>
          <table class="table-auto w-full max-w-[1300px]">
            <tbody class="text-sm divide-y  divide-gray-100 max-w-[1150px]">
              {loading3 ? (
                <div
                  class="spinner-border text-blue"
                  role="status"
                  style={{
                    height: "35px",
                    width: "35px",
                    marginTop: "15px",
                    marginLeft: "75px",
                  }}
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : admin.length > 0 ? (
                admin.map((member) => (
                  <tr className="">
                    <td class=" p-2 w-[170px] md:w-[250px]  lg:w-[600px] ">
                      <div className="flex items-center">
                        <img
                          class="rounded-full w-[40px] h-[40px] object-center"
                          src={member.img}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />
                        {role === "Super_Admin" || role === "Admin" ? (
                          <Link
                            to="/profile"
                            state={member}
                            className="link-to-profile"
                          >
                            <div className="ml-2 text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[400]">
                              {" "}
                              {member.name}{" "}
                            </div>
                          </Link>
                        ) : (
                          <div className="ml-2 text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[400]">
                            {" "}
                            {member.name}{" "}
                          </div>
                        )}
                      </div>
                    </td>
                    <td class="p-2 w-[170px] lg:w-[400px] block lg:flex flex-start items-center  mr-8 ">
                      <div class=" text-gray-800  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[400]">
                        {member.position}
                      </div>
                    </td>
                    <td className=" w-[100px] my-auto">
                      <div
                        className="text-red-500"
                        onClick={() => {
                          setDelShow(true);
                          setId(member._id);
                        }}
                      >
                        <button className="h-[25px] py-3 flex items-center px-3 rounded-xl text-white bg-[#ff0000]  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[500] hover:bg-[#bf1004]">
                          Delete
                        </button>
                      </div>
                      <Modal
                        show={delshow}
                        onHide={handleDelClose}
                        className="club-member-modal"
                      >
                        <form>
                          <Modal.Header
                            closeButton
                            className="club-member-modal-header"
                          >
                            Are you sure to make this Admin as Club Member ?
                          </Modal.Header>
                          <Modal.Footer className="modal-footer club-member-modal-footer">
                            <div className="modal-footer-club-member-yes-no-div">
                              {loading ? (
                                <div
                                  class="spinner-border text-blue"
                                  role="status"
                                  style={{
                                    height: "35px",
                                    width: "35px",
                                    marginTop: "15px",
                                    marginLeft: "75px",
                                  }}
                                >
                                  <span class="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                <div onClick={handleDeleteAdmin}>Yes</div>
                              )}

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setDelShow(false);
                                }}
                              >
                                No
                              </button>
                            </div>
                          </Modal.Footer>
                        </form>
                      </Modal>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="nopending">
                  <div className="text-[1rem] font-[400]">No Admin !</div>
                </div>
              )}
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Admin;
