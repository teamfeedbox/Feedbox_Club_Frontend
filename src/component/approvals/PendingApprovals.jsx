import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useStateValue } from "../../StateProvider";

const PendingApprovals = (props) => {
  const [data, setData] = useState([]);
  const [searchval, setSearchVal] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [val, setVal] = useState(false);
  const [id, setId] = useState();
  const [did, setDid] = useState();
  const [load, setload] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);

  const currentCollege = JSON.parse(localStorage.getItem("user")).college;
  const role = JSON.parse(localStorage.getItem("user")).role;

  const [{ currentUser }] = useStateValue();
  // const data = currentUser;


  // get all users
  const getUser = async () => {
    console.log("dlkcnus");
    setLoading3(true);
    const result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/get`);
    const res = await result.json();
    console.log(res, 'pApprovalsssssss');
    let user = [];
    res &&
      res.map((data) => {
        if (data.role == "user") {
          user.push(data);
        }
      });
    user = user.reverse();

    if (role === "Super_Admin") {
      let clgSel = [];
      if (props.clg) {
        if (props.clg === "All") {
          setPendingUsers(user);
          setData(user);
        } else {

          const getData = (async () => {

            await user.map(data => {

              if (data.collegeName === props.clg) {
                clgSel.push(data)
              }
            })
          })
          getData().then(() => {
            setPendingUsers(clgSel);
            setData(clgSel);
          })
        }
      } else {
        setPendingUsers(user);
        setData(user);
      }
    } else {
      console.log("2");
      let clg = [];
      user.map(data => {
        if (data.collegeName === currentCollege) {
          clg.push(data)
        }
      })
      setPendingUsers(clg);
      setData(clg);
    }
    setDeclineLoading(false);
    setId('')
    setDid('')
    setLoading3(false);
  };

  useEffect(() => {
    getUser();
    // setLoading(false)
    setload(false)
  }, [props, load]);

  // search for a pending user
  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    let matched = [];
    if (e.target.value != "") {
      data.length > 0 &&
        data.forEach((user) => {
          const value = user.name.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setPendingUsers(matched);
    } else {
      setPendingUsers(data.length > 0 && data);
    }
  };

  // Decline request for club member
  const handleDecline = async (id, i) => {
    setDeclineLoading(true);
    setLoading(true);
    setDid(i)
    const data = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
    // setLoading(false);
    setload(true);
  };

  const handleEmail = async (id) => {
    setLoading(true);
    const data = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/sendmail/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const res = await data.json();
  };

  // Accept request for club member
  const handleAccept = async (id, i) => {
    setLoading(true)
    setId(i)
    const data = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/updateDetail/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "Club_Member" }),
    });
    const res = await data.json();
    handleEmail(id);
    setVal(!val);
    props.func(!val);
    // setLoading(false);
    setload(true);
    setLoading(false);
  };

  return (
    <div className="PendingApprovals ">
      <div className="flex flex-col lg:flex-row md:flex-row justify-content-center">
        <div>
          <h4 className=" text-[1.5rem] font-[700] mt-3 lg:mt-1  my-0 lg:my-3" style={{color : "#F24887"}}>PENDING APPROVALS</h4>

        </div>
      </div>
      {/* search */}
      <div className="pending-approval-search bg-[#E5E5E5]">
        <div className="relative text-lg bg-transparent text-gray-800">
          <div className="flex items-center border-[#6F6F6F] py-2 mt-3 mb-3">
            <input
              className="bg-transparent w-full text-[1rem] font-[400] border-none mr-10 px-2 leading-tight focus:outline-none"
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
      <div className="lg:border">


        <Scrollbars style={{ height: "250px" }}>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto w-full p-4 customizeT" style={{ borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="border px-6 py-4 bg-orange-500 border-orange-200 color text-white	">Name</th>
                  <th className="border px-6 py-4 bg-orange-500 border-orange-200 hidden sm:table-cell color text-white	">Course</th>
                  <th className="border px-6 py-4 bg-orange-500 border-orange-200 hidden sm:table-cell color text-white	">Year</th>
                  <th className="border px-6 py-4 bg-orange-500 border-orange-200 hidden sm:table-cell color text-white	">College</th>
                  <th className="border px-6 py-4 bg-orange-500 border-orange-200 color text-white	">Decline</th>
                  <th className="border px-6 py-4 bg-orange-500 border-orange-200 color text-white	">Accept</th>
                </tr>
              </thead>
              <tbody >
                {loading3 ? (
                  <tr className="rowSize" style={{borderBottom : "none", borderTop : "none"}}>
                    <td colSpan="6" className="text-center py-4">
                      <div className="spinner-border text-blue" role="status" style={{ height: "35px", width: "35px" }}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : pendingUsers.length > 0 ? (
                  pendingUsers.map((approval, index) => (
                    <tr key={approval._id} className="border-b" style={{borderBottom : "none", borderTop : "none"}}>
                      <td className="border px-6 py-4"><div className="flex items-center">
                        <img
                          className="rounded-full w-[40px] h-[40px] object-center"
                          src={approval.img}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />
                        <div className="ml-2  text-[.8rem] md:text-[1rem]  lg:text-[1.05rem] font-[400]"> {approval.name} </div>
                      </div></td>
                      <td className="border px-6 py-4 hidden sm:table-cell">{approval.branch}</td>
                      <td className="border px-6 py-4 hidden sm:table-cell">{approval.collegeYear}</td>
                      <td className="border px-6 py-4 hidden sm:table-cell">{approval.collegeName}</td>
                      <td className="border px-6 py-4">
                        {id !== index ? (
                          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDecline(approval._id, index)}>
                            Decline
                          </button>
                        ) : (
                          <div className="spinner-border text-black" role="status" style={{ height: "15px", width: "15px" }}>
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </td>
                      <td className="border px-6 py-4">
                        {did !== index ? (
                          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAccept(approval._id, index)}>
                            Accept
                          </button>
                        ) : (
                          <div className="spinner-border text-white" role="status" style={{ height: "15px", width: "15px" }}>
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No Pending Requests!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default PendingApprovals;
