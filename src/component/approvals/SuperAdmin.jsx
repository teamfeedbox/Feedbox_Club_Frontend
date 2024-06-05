import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";

const SuperAdmin = () => {
  const [searchval, setSearchVal] = useState("");
  const [data,setData]=useState([]);
  const [superAdmin,setSuperAdmin]=useState([]);

  const getUser = async () => {
    const result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/get`);
    const res = await result.json();
    let sadmin = [];
    res && res.map((data) => {
      if (data.role == 'Super_Admin') {
        sadmin.push(data)
      }
    })
    setSuperAdmin(sadmin);
    setData(sadmin);
  };

  useEffect(() => {
    getUser();
  }, [])

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
      setSuperAdmin(matched);
    } else {
      setSuperAdmin(data);
    }
  };

  return (
    <div>
      {/* search */}
      <div className="pending-approval-search">
        <div class="relative text-lg bg-transparent text-gray-800">
          <div class="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3 ">
            <input
              class="bg-transparent w-full border-none mr-10 px-2 leading-tight focus:outline-none"
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
      <div className="">
        <Scrollbars style={{ height: "250px" }}>
            <table class="table-auto w-full max-w-[1300px]">
              <tbody class="text-sm divide-y  divide-gray-100 max-w-[1150px]">
                {superAdmin.length>0 ?
                  superAdmin.map((member) => (
                    <tr className="flex justify-between ">
                      <td class="p-2 w-[200px] lg:w-[400px]">
                        <div className="flex items-center">
                          <img
                            class="rounded-full w-[40px] h-[40px] object-center"
                            src={member.img}
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />

                          <div className="ml-2 text-[.8rem] md:text-[1rem]  lg:text-[1.05rem]"> {member.name} </div>
                        </div>
                      </td>
                      <td class="p-2 lg:flex items-center mr-8">
                        <div class="font-medium text-gray-800 text-[.8rem] md:text-[1rem]  lg:text-[1.05rem]">
                          {member.position}
                        </div>
                      </td>
                    </tr>
                  )) : 'No Super Admin...'}
              </tbody>
            </table>
        </Scrollbars>
      </div>
    </div>
  );
};

export default SuperAdmin;
