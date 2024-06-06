import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Modal from "react-bootstrap/Modal";
import "./Register.css";
import Button from "react-bootstrap/Button";

import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [next, setNext] = useState(false);
  const [skills, setSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isDivWhite, setIsDivWhite] = useState(false);
  const [userinfo, setUserInfo] = useState({
    skill: [],
    response: [],
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [collegeYear, setCollegeYear] = useState();
  const [collegeName, setCollegeName] = useState();
  const [branch, setBranch] = useState();
  const [bio, setBio] = useState("");
  const [allClgs, setAllClgs] = useState([]);

  const navigate = useNavigate();

  // To handle in register page
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [universityError, setUniversityError] = useState(false);



  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const getColleges = async () => {
    const data = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/colleges/get`);
    const res = await data.json();
    let val = [];
    res.map((data) => {
      val.push(data.name)
    })

    val.sort((a,b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
    );
    
    console.log(val);
    setAllClgs(val);
  }

  useEffect(() => {
    getColleges();
  }, [])

  // generate unique id
  const generateUniqueid = () => {
    const today = new Date();
    let c1 = today.getFullYear();
    let c2 = collegeName.slice(0, 3).toUpperCase();
    let c3 = '15' + Math.floor(Math.random() * 90 + 10);

    let result = '';
    for (let i = 0; i < 1; i++) {
      result += c1;
    }
    for (let i = 0; i < 1; i++) {
      result += c2;
    }
    for (let i = 0; i < 1; i++) {
      result += c3;
    }
    setUniqueId(result);
  }

  // Register a user
  const collectData = async (e) => {
    setLoading(true);
    // generateUniqueid();
    e.preventDefault();
    let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/register", {
      method: "post", // post method because we want to save the data
      body: JSON.stringify({
        name,
        email,
        password,
        collegeYear,
        branch,
        bio,
        collegeName,
        uniqueId: uniqueId,
        skills: userinfo.response,
        bio
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result) {
      console.log(result);
      if (result.data === "user already exists with that email") {
        toast.error(result.data);
      }
      else {
        toast.success(result.data);
        setTimeout(() => {
        navigate("/login");
        }, 5000)
      }
    }
    setLoading(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changenext = (e) => {
    e.preventDefault();
    if (nameError == false && emailError == false && passError == false && collegeName != "" && name != "" && email != "" && password != "") {
      setNext(!next);
    }
    else {
      toast.warning("All fields are required")
    }

  };

  const handleChange = (e) => {
    const eventValue = e.target.value;
    switch (e.target.name) {
      case "name":
        if (eventValue.length < 3) {
          setNameError(true);
        } else {
          setNameError(false);
        }
        setName(eventValue);

        break;

      case "email":
        if (!eventValue.match(emailRegex)) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        setEmail(eventValue);
        break;

      case "password":
        if (!eventValue.match(passwordRegex)) {
          setPassError(true);
        } else {
          setPassError(false);
        }
        setPassword(eventValue);
        break;
    }

    // Destructuring
    const { value, checked } = e.target;
    const { skill } = userinfo;
    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        skill: [...skill, value],
        response: [...skill, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        skill: skill.filter((e) => e !== value),
        response: skill.filter((e) => e !== value),
      });
    }
    setSkills((arr) => [...userinfo.response, skills]);
  };

  const maxWords = 400;
  // const words = bio.trim().split(/\s+/);
  const wordsLeft = bio.length;

  const handleChange1 = (event) => {
    const value = event.target.value;
    if (bio.length < maxWords) {
      setBio(value);
    }
  };
  const handleButtonClick = () => {
    setIsSignUpMode(!isSignUpMode);

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    setIsDivWhite(true);
  };

  return (
    <div className=" bg-[#F6F6EF] overflow-hidden">
      <div className= "fixed  h-full w-full ">
      <svg viewBox="-67 77 195 90" xmlns="http://www.w3.org/2000/svg" fill-opacity="1" className="absolute h-full self-centre overflow-visible Z-10 " style={{
            transform: ` rotate(${isSignUpMode ? '-169deg' : '9deg'})`,

            transition: 'transform 0.6s ease-in-out',
          }}>
            <path fill="#9647FF" d="M67.2,-37.4C81,-14.9,81.9,16.5,68.6,39.7C55.2,62.9,27.6,78,-0.6,78.3C-28.8,78.7,-57.6,64.3,-71.5,40.7C-85.4,17.2,-84.4,-15.5,-70,-38.4C-55.6,-61.3,-27.8,-74.5,-0.6,-74.1C26.7,-73.8,53.4,-60,67.2,-37.4Z"
              transform="translate(100 120)"></path>
            <Link to="/login"> {/* Wrap the SVG in a Link tag */}

            </Link>
          </svg>

      </div>
      <div className="relative   min-h-screen sm:flex sm:flex-row  sm:pt-5 justify-center bg-transparent rounded-3xl shadow-xl">
      <div className="flex justify-center self-center md:self-auto lg:self-center m-[12px] mt-[50px] lg:translate-x-[-150px] z-10 h-fit">
        <div className="p-12 bg-white mx-auto rounded-3xl w-96  shadow-[#000000] shadow-lg "
            style={{ border: "2px dashed #eb732f" }}
            >
            <div className="mb-7">
              <h3 className="font-bold text-3xl text-center text-[#000000]">Sign Up </h3>
              
              </div>
               <div>
              <form onSubmit={collectData}>
                <div className={next ? "block" : "hidden"}>
                  <div className="space-y-6">
                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                      />
                    </div>

                    <div className="">
                      <select
                        required
                        className="  w-full text-sm  px-4 py-3  bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none "
                        value={collegeYear}
                        onChange={(e) => setCollegeYear(e.target.value)}
                      >
                        <option
                          value=""
                          disabled
                          selected
                          // hidden
                          className="text-gray-400"
                        >
                          Year
                        </option>
                        <option
                          value="1st"
                          className="text-[#000000] w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                        >
                          I Year
                        </option>
                        <option
                          className=" text-[#000000] w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value="2nd"
                        >
                          II Year
                        </option>
                        <option
                          className=" text-[#000000] w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value="3rd"
                        >
                          III Year
                        </option>
                        <option
                          className="text-[#000000]
                          
                          
                          w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value="4th"
                        >
                          IV Year
                        </option>
                      </select>

                    </div>

                    <div className="">
                      <textarea
                        name="response"
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        value={userinfo.response}
                        placeholder="Add skills "
                        id="floatingTextarea2"
                        required
                        onChange={handleChange}
                        onClick={handleShow}
                      ></textarea>

                      {/* Skills Modal  */}
                      <Modal show={show} onHide={handleClose} className="">
                        <form>
                          <Modal.Header
                            closeButton
                            className="flex flex-wrap text-[1.2rem] font-[700] "
                          >
                            <div className="w-[85%] ">
                              Please select skills in which you are interested!
                            </div>
                          </Modal.Header>
                          <Modal.Footer className="flex flex-col justify-start items-start text-[1.2rem] font-[500]">
                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="web"
                                value="Web Development"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Web Development")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="web">
                                {" "}
                                Web Development{" "}
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                checked={
                                  userinfo.response.includes("App Development")
                                    ? true
                                    : false
                                }
                                name="skill"
                                id="app"
                                value="App Development"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                              />
                              <label className="ml-[10px]" htmlFor="app">
                                {" "}
                                App Development
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                checked={
                                  userinfo.response.includes("SEO")
                                    ? true
                                    : false
                                }
                                name="skill"
                                id="seo"
                                value="SEO"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                              />
                              <label className="ml-[10px]" htmlFor="seo">
                                {" "}
                                SEO
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="linkedin"
                                value="LinkedIn Optimization"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes(
                                    "LinkedIn Optimization"
                                  )
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="linkedin">
                                {" "}
                                LinkedIn Optimization
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="graphic"
                                value="Graphic Design"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Graphic Design")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="graphic">
                                {" "}
                                Graphic Design
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="video"
                                value="Video Editing"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Video Editing")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="video">
                                {" "}
                                Video Editing
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="time"
                                value="Time Management"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Time Management")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="time">
                                {" "}
                                Time Management
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="digital"
                                value="Digital Marketing"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes(
                                    "Digital Marketing"
                                  )
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="digital">
                                {" "}
                                Digital Marketing
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="content"
                                value="Content Writing"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Content Writing")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="content">
                                {" "}
                                Content Writing
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="ads"
                                value="Ads"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Ads")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="ads">
                                {" "}
                                Ads
                              </label>
                            </div>
                          </Modal.Footer>
                        </form>
                      </Modal>

                    </div>

                    <div className="">
                      <textarea
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type="text"
                        placeholder="Bio"
                        maxlength="400"
                        value={bio}
                        onChange={(e) =>{
                          setBio(e.target.value)
                          handleChange1()
                        } }
                        required
                      />
                      <p className="Register-Page-Word-Limit"
                      >* {wordsLeft}/400</p>
                    </div>

                    <div className="flex">
                      <div
                        onClick={() => setNext(!next)}
                        className="w-full mr-2 flex justify-center bg-[#9647ff]  hover:bg-[#9647ff] text-gray-100
                         p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                      >
                        Back
                      </div>
                      <Button 
                      onClick={generateUniqueid}
                      disabled={!branch || !collegeYear || !userinfo.response || !bio ? true : false}
                      style={{background : '#9647ff', border : '#9647ff'}}
                      className="w-full flex justify-center bg-[#9647ff]  hover:bg-[#9647ff] text-[#ffffff] p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                      >
                      {
                        loading ? 
                        <div
                              class="spinner-border text-white"
                              role="status"
                              style={{ height: "15px", width: "15px",marginTop:"3px" }}
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                            :
                            <button  type="submit"
                             >Sign Up</button>
                      }
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={next ? "hidden" : "block"}>
                  <div className="space-y-6">
                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg-[#F6F6EF] focus:bg-[#F6F6EF] border  border-[#F6F6EF] rounded-lg focus:outline-none focus:border-purple-400"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={handleChange}
                        required
                      />
                      {
                        nameError ? (
                          <span className="registerError">
                            *name should be more than 3 letters
                          </span>
                        ) : ("")
                      }
                    </div>

                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg- focus:bg-[#F6F6EF] border  border-[#F6F6EF] rounded-lg focus:outline-none focus:border-purple-400"
                        type="email"
                        name="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                      />
                      {emailError ? (
                        <span className="registerError">
                          *enter a valid email address
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg-[#F6F6EF] focus:bg-[#F6F6EF] border  border-[#F6F6EF] rounded-lg focus:outline-none focus:border-purple-400"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        onChange={handleChange}
                        required
                      />
                      {passError ? (
                        <span className="registerError">
                          {" "}
                          *6 to 20 characters which contain at least one numeric
                          digit, one uppercase and one lowercase letter{" "}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="">
                      <select
                        required
                        className="  w-full text-sm  px-4 py-3 bg-[#F6F6EF] focus:bg-[#F6F6EF] border  border-[#F6F6EF] rounded-lg focus:outline-none "
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                      >
                         
                        <option 
                        // disabled
                          // selected
                          className="text-[#F6F6EF]">
                          University
                        </option>
                        <option hidden
                        // disabled
                          // selected
                          className="text-[#F6F6EF]">
                          IET-DAVV
                        </option>
                        <option hidden
                        // disabled
                          // selected
                          className="text-[#F6F6EF]">
                          SVVV
                        </option>
                        {
                          allClgs.length > 0 &&
                          allClgs.map(data => (
                            <option value={data}>{data}</option>
                          ))
                        }
                      </select>
                      {universityError ? (
                        <span className="registerError">
                          select university
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      <Button
                        type="submit"
                        onClick={changenext}
                        style={{background : '#9647ff', border : '#9647ff'}}
                        disabled = {!name || !email || !password || !collegeName ? true : false}
                        className="w-full flex justify-center  text-[#ffffff] p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-7 text-center text-[#000000] text-xs">
              <span>
                Copyright © 2021-2023
                <a
                  href="https://feedbox.co.in/"
                  rel=""
                  target="_blank"
                  title="Codepen aji"
                  className="text-[#9647ff]  hover:text-[#9647ff] "
                >
                  Feedbox
                </a>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-col flex  justify-center text-center self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10 ">
           {/* <div className=" md:mt-10 z-10 lg:flex sm:flex justify-center lg:self-center sm:self-center m-[12px] mt-[50px] md:self-auto md:block"> */}
           <div className="self-center lg:flex flex-col sm:text-center lg:text-[#ffffff]  md:text-[#000000] sm:text-[#000000] ">
           < div className={` sm:items-center justify-self-center text-container  ${isDivWhite ? "bg-[#ffffff] text-[#ffffff] " : "text-[#ffffff]" }`}
          style={{ transition: `transform (${isDivWhite ?  "1.5s" : "2s"}) ease-in-out delay-200`,}}>
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
            <button
                   className={`w-[50%] text-white font-bold py-2 px-4 rounded-3xl self-center mt-2  ${isDivWhite ? "bg-[#ffffff]  text-[#000000]" : "bg-[#9647ff]"}  bg-[#9647ff] shadow-black shadow-lg focus:outline-none `}

                  style={{ border: "2px solid white" }}
                  onClick={handleButtonClick}
                >
                  Sign Up
                </button>
                </div>
          </div>
        
      </div>
      <ToastContainer />

    </div>
 </div>
  );
};

export default Register;
