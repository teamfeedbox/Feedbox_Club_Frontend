import React, { useState, useEffect } from 'react';
import "./ProfileBanner.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from './EditProfile';
import { useLocation } from "react-router-dom";
import { useStateValue } from '../../StateProvider';


function ProfileBanner(props) {
  const location = useLocation();
  const propsData = location.state;
  console.log(location)
  const role = JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).role

  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [render,setRender] = useState();

  const [{ currentUser }] = useStateValue();

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result);
    console.log(result);
  };

  useEffect(()=>{
    if (currentUser) {
      setData(currentUser);
    } else {
      getUser();
    }
  },[render])

  const prop_func=(val)=>{
    console.log(val);
    setRender(val)
    props.sendData(val)
  }

  return (
    <>
      {
        propsData === null ?

          <div className='Profile-Banner'>
            <img src="Images/bg5.png" alt=""></img>
            <div className='Profile-Title'>
              <img src={data && data.img} alt="" />
              <div>
                <p>{data && data.name}</p>
                {role === "Club_Member" ? (
                  <span> Club Member </span>
                ) : role === "Super_Admin" ? (
                  <span> Super Admin </span>
                ) : (
                  <span> {role} </span>
                )}
              </div>
              <EditProfile Userbio={data && data.bio} Username={data && data.name}  Useryear={data && data.collegeYear} open={open} setOpen={setOpen} sendData={prop_func}/>

              <button onClick={() => { setOpen(!open) }} >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ margin: "0px 10px 0 0" }}
                />
                Edit Profile
              </button>
            </div>
          </div>
          :

          <div className='Profile-Banner'>
            <img src="Images/bg5.png" alt=''/>
            <div className='Profile-Title'>
              <img src={propsData && propsData.img} alt=''/>
              <div>
                <p>{propsData && propsData.name}</p>
                {propsData.role === "Club_Member" ? (
                  <span> Club Member </span>
                ) : propsData.role === "Super_Admin" ? (
                  <span> Super Admin </span>
                ) : (
                  <span> {propsData && propsData.role} </span>
                )}

              </div>
            </div>
          </div>
      }

    </>
  )
}

export default ProfileBanner