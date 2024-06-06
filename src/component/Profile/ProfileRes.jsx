import { faChain, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { useToasts } from "react-toast-notifications";

const ProfileRes = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();


  useEffect(() => {
    getResource();
    setLoad(false)
  }, [load]);

  const getResource = async () => {
    setLoading(true);
    let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/myResource", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result);
    setLoading(false);
  };

  const deleteRes = async (item) => {
    console.log(item);
    if (item.type === "pdf") {
      let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/delete/Resource/pdf`, {
        method: "delete",
        body: JSON.stringify(item),
        headers: {
          'content-type': 'application/json'
        }
      });
      result = await result.json();
      // toast.dark(result)
      addToast(result, { appearance: "success" })
      setLoad(true)
    } else if (item.type === "link") {
      let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/delete/Resource/link/${item._id}`, {
        method: "delete",
      });
      result = await result.json();
      addToast(result, { appearance: "success" })
      setLoad(true)
    }

    
  }




  return (
    <div>
      {/* <!-- component --> */}
      {
        loading ?
        <div
          role="status"
          style={{ height: "15px", width: "15px",margin:'auto'}}
        >
          <span className="text-black m-auto">Loading...</span>
        </div>:
        data.length > 0 ?
        <div className="overflow-x-auto p-3">
          <table className="table-auto w-full">
            <thead className=" uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2">
                  <div className="font-[500] text-[0.8rem] text-left">Resource type</div>
                </th>
                <th className="p-2">
                  <div className="font-[500] text-[0.8rem] text-left">Resource Title</div>
                </th>
                <th className="p-2">
                  <div className="font-[500] text-[0.8rem] text-left">Date Posted</div>
                </th>
                <th className="p-2">
                  <div className="font-[500] text-[0.8rem] text-center">Action</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="p-2">
                    <a
                      href={item && item.url}
                      target="_blank"
                      className="text-black"
                    >
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        className="w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                      />
                    </a>
                  </td>
                  <td className="p-2">
                    <div className=" text-gray-800 font-[500] text-[1rem]">{item.title}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-left text-blue-600 font-[500] text-[1rem]">
                      {item.date && timeAgo.format(new Date(item.date).getTime() - 60 * 1000)}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      <button onClick={() => deleteRes(item)}>
                        <svg
                          className="w-8 h-8 text-red-600 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>

                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
        : 
        <div className="font-[700] text-[1.1rem] pt-2 text-center m-auto">You haven't posted any resource yet!</div>
        
      }
      
    </div>
  );
};

export default ProfileRes;
