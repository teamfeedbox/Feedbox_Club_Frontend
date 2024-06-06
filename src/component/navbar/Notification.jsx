import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import "./Notification.css";



const Notification = (props) => {

  const [notification, setNotification] = useState()
  const [currentUserId, setcurrentUserId] = useState()

  const wrapperRef = useRef(null);

  // notification close on backdrop click
  function useOutsideAlerter(ref) {
    useEffect(() => {
     function handleClickOutside(event) {
       if (ref.current && !ref.current.contains(event.target)) {
         props.props.handleCross(true);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);
  
  const handleClose = (e) => {
    e.preventDefault();
    props.props.handleCross(true);
  };



  const getData = async () => {
    let notifi = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/getNotifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    notifi = await notifi.json();
    setNotification(notifi.reverse())
    // console.log(notifi.length);

    localStorage.setItem("notification-length", notifi.length)
  }
  useEffect(() => {
    getData()

    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    // console.log(user.id)
    setcurrentUserId(user.id)
  }, [])
  return (
    <div ref={wrapperRef} className="absolute top-[110%] right-5 bg-white rounded py-2 px-2.5 w-[23%] shadow max-h-[500px]  ">
      <div className="flex justify-between">
        <div className="text-[1.1rem] font-[700] ">Notification</div>
        <div className="" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>

      {/* ****************Show notification******************* */}

      <div className="notifiaction-div pb-1 max-h-[450px] overflow-y-scroll text-[1rem] font-[500]">

        {/* <div className="flex bg-green-300 mt-2 rounded-sm">
          <div className="bg-green-800 p-1 w-[5px] text-green-800"></div>
          <div className="p-1">Congrats! Now you are a Lead.</div>
        </div> */}



        {notification && notification.map((data) => {
          return (
            // public message
            (data.messageScope === "public" ?
              (<div key={data.message} className="flex bg-blue-200 mt-2 rounded-sm">
                <div className="bg-blue-800 p-1 w-[5px]  text-blue-800"></div>
                <div className="p-1">
                  {data.message}

                </div>
              </div>)
              :
              // for community
              (data.messageScope === "community" ?
              (<div key={data.message} className="flex bg-[#ebccc3] mt-2 rounded-sm ">
              <div className="bg-[#4a251a] p-1 w-[5px]  text-[#4a251a]"></div>
              <div className="p-1">
                {data.message}
              </div>
            </div>)
                :
                // for position change
                ((data.messageScope === "private" && currentUserId === data.userId) ?
                  <div key={data.message} className="flex bg-green-200 mt-2 rounded-sm">
                    <div className="bg-green-800 p-1 w-[5px]  text-green-800"></div>
                    <div className="p-1">
                      {data.message}
                    </div>
                  </div>
                  :
                  // for coins
                  ((data.messageScope === "coins"  && currentUserId === data.userId) &&
                    <div key={data.message} className="flex bg-yellow-200 mt-2 rounded-sm">
                      <div className="bg-yellow-600 p-1 w-[5px]  text-yellow-800"></div>
                      <div className="p-1">
                        {data.message}
                      </div>
                    </div>)
                )
              )
            )
          )
        }
        )}
      </div>
    </div>
  );
};

export default Notification;
