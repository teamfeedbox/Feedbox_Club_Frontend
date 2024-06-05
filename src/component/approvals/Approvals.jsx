import React, { useEffect, useState } from "react";
import PendingApprovals from "./PendingApprovals";
import ClubMember from "./ClubMember";
import Lead from "./Leads";
import Admin from "./Admin";
import SuperAdmin from "./SuperAdmin";
import { useStateValue } from "../../StateProvider";
// import bg from "../assets/mainBg.png";
const Approvals = () => {
  const [tabs, setTabs] = useState("club");
  const [cM, setCM] = useState(false);
  const [click, setClick] = useState(false);
  const [allClgs, setAllClgs] = useState([]);
  const [user, setUser] = useState();
  const [clg, setClg] = useState();
  const[loading,setLoading]=useState(false);

  const[{colleges}]=useStateValue();

  const role = JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).role

  const pull_data = (data) => {
    setCM(data);
  }

  const getColleges = async () => {
    let val = [];
    if(colleges){
      val=colleges;
    }
    else{
      const data = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/colleges/get`);
      const res = await data.json();
      res.map((data) => {
        val.push(data.name);
      });
    }
  
    setAllClgs(val);
  }

  useEffect(() => {
    getColleges();
  }, []);

 

  return (
    <>

      {/* search handler for super admin */}
      <div className="pb-9 pt-[70px] text-center"
        style={{
        backgroundColor: "white"
      }}>
        {role && role === 'Super_Admin' ?
          <div className="lg:my-3 my-0 mx-1 mt-3 text-center">
            <select onChange={(e) => setClg(e.target.value)} className="p-2 text-[1rem] font-[400] border-[#000] rounded-xl w-[90%] md:w-[90%] lg:w-[30%] cursor-pointer bg-[#9747FF] text-white">
              <option className=" " selected hidden disabled>
                College
              </option>
              <option value="All">All</option>
              {
                allClgs.length > 0 &&
                allClgs.map((data) => (
                  <option value={data}>{data}</option>
                ))
              }
            </select>
          </div> : ''}

        <PendingApprovals func={pull_data} clg={clg && clg} />

        <div className="mt-9">
          <div className="overall-profile-tabs">
            <div className="text-sm profile-tabs">
              <div
                className={
                  tabs === "club"
                    ? "profile-tab-content profile-tab-content-highlight"
                    : "profile-tab-content"
                }
                onClick={() => setTabs("club")}
              >
                Club Members
              </div>

              {role === 'Admin' || role === 'Super_Admin' || role === "Lead" ? <div className={tabs === "Lead"
                ? "profile-tab-content profile-tab-content-highlight"
                : "profile-tab-content"} onClick={() => { setClick(true); setTabs("Lead") }}>
                Leads
              </div> : ""}

              {role === 'Admin' || role === 'Super_Admin' ?
                <div
                  className={
                    tabs === "Admin"
                      ? "profile-tab-content profile-tab-content-highlight"
                      : "profile-tab-content"
                  }
                  onClick={() => setTabs("Admin")}
                >
                  Admins
                </div> : ''}

              {role === 'Super_Admin' ?
                <div
                  className={
                    tabs === "SuperAdmin"
                      ? "profile-tab-content profile-tab-content-highlight"
                      : "profile-tab-content"
                  }
                  onClick={() => setTabs("SuperAdmin")}
                >
                  SuperAdmin
                </div> : ''}
            </div>

            <div className="profile-tab-data">
              <div className={tabs === "club" ? "" : "profile-tab-data-hide"}>
                <ClubMember props={{ cm: cM ? true : false, clg: clg && clg }} />
              </div>

              <div className={tabs === "Lead" ? "" : "profile-tab-data-hide"}>
                <Lead props={click && true} clg={clg && clg} />
              </div>

              <div className={tabs === "Admin" ? "" : "profile-tab-data-hide"}>
                <Admin props={click && true} clg={clg && clg} />
              </div>

              <div
                className={tabs === "SuperAdmin" ? "" : "profile-tab-data-hide"}
              >
                <SuperAdmin />
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
};

export default Approvals;
