import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

const NewLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isDivWhite, setIsDivWhite] = useState(false);

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(email, password);

<<<<<<< HEAD
    let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/login", {
=======
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/login`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("jwt", result.token);
      window.location.href = "/main"
    } else {
      toast.error("Invalid Email or Password");
    }
    setLoading(false);

    // set notification length
    let notifi = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/getNotifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    notifi = await notifi.json();
    localStorage.setItem("notification-length", notifi.length)
  };
  const handleButtonClick = () => {
    setIsSignUpMode(!isSignUpMode);

    setTimeout(() => {
      window.location.href = "/register";
    }, 1000);
    setIsDivWhite(true);
  };


  return (
    <div>
      <div className="  bg-[] h-full w-full  overflow-hidden">
        <div className=" fixed h-full">
          <svg viewBox="67 77 195 100" xmlns="http://www.w3.org/2000/svg"   fill-opacity="1" className="absolute h-full self-centre overflow-visible Z-10 " style={{
            transform: ` rotate(${isSignUpMode ? '169deg' : '9deg'})`,

            transition: 'transform 0.6s ease-in-out',
          }}>
            <path fill="#9647FF" d="M67.2,-37.4C81,-14.9,81.9,16.5,68.6,39.7C55.2,62.9,27.6,78,-0.6,78.3C-28.8,78.7,-57.6,64.3,-71.5,40.7C-85.4,17.2,-84.4,-15.5,-70,-38.4C-55.6,-61.3,-27.8,-74.5,-0.6,-74.1C26.7,-73.8,53.4,-60,67.2,-37.4Z"
              transform="translate(100 120)"></path>
            <Link to="/login"> {/* Wrap the SVG in a Link tag */}

            </Link>
          </svg>

        </div>
        <div className="relative   min-h-screen  sm:flex sm:flex-row   sm:justify-center bg-transparent rounded-3xl shadow-xl">
          <div className="flex-col flex sm:text-center  self-center text-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10 text-conatiner">
            <div className="self-centre lg:flex flex-col  sm:flex  md:ml-3 sm:justify-center  text-[#F6F6EF]">
            < div className={` sm:items-center justify-self-center ${isDivWhite ? "bg-[#ffffff] text-[#ffffff]" : "text-[#ffffff]" }`}
          style={{ transition: `transform (${isDivWhite ?  "1.5s" : "2s"}) ease-in-out delay-200`,}}>

              <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
              <p className="pr-3 text-sm opacity-75">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and visual
                mockups
              </p>
              <button
                   className={`w-50% text-white font-bold py-2 px-4 rounded-3xl  mt-2  ${isDivWhite ? "bg-[#ffffff] text-[#000000]" : "bg-[#9647ff]"}  bg-[#9647ff] shadow-[#000000] shadow-lg focus:outline-none `}

                  style={{ border: "2px solid white" }}
                  onClick={handleButtonClick}
                >
                  Sign Up
                </button>
            </div>
          </div>
          </div>
          <div className=" md:mt-10 z-10 lg:flex sm:flex justify-center lg:self-center sm:self-center rounded-3xl lg:translate-x-[150px] m-[12px] mt-[50px]  md:self-auto shadow-[#000000] shadow-lg md:block">

            {/* <div className="flex justify-center self-center mt-[80px] m-[12px] z-10 md:block"> */}
            <div className="p-12 bg-[#ffffff] mx-auto rounded-3xl w-[98%] md:w-[110%] lg:w-[350px] "
            style={{ border: "2px dashed #eb732f" }}
            >
              <div className="mb-7">
                <h3 className="font-bold text-3xl text-center text-[#000000]">Sign In </h3>
              </div>
              <div className="space-y-6">
                <div className="">
                  <input
                    className=" w-full text-sm  px-4 py-3 bg-[#F6F6EF] focus:bg-[#F6F6EF] border  border-[#F6F6EF] rounded-lg focus:outline-none focus:border-purple-400"
                    type=""
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative" x-data="{ show: true }">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    type="password"
                    // type="show ? 'password' : 'text'"
                    className="text-sm text-[#000000] px-4 py-3 rounded-lg w-full bg-[#F6F6EF] focus:bg-[#F6F6EF] border border-[#F6F6EF] focus:outline-none focus:border-purple-400"
                  />
                  <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5">
                    <svg
                      click="show = !show"
                      className="{'hidden': !show, 'block':show }"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>

                    <svg
                      click="show = !show"
                      className="'block': !show, 'hidden':show "
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm ml-auto">
                    {/* <a href="#" className="text-purple-700 hover:text-purple-600">
                    Forgot your password?
                  </a> */}
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleLogin}
                    className="w-full flex justify-center bg-[#9647ff]  hover:bg-[#9647ff] text-[#F6F6EF] p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  >
                    {loading ? (
                      <div
                        class="spinner-border text-[#ffffff]"
                        role="status"
                        style={{
                          height: "15px",
                          width: "15px",
                          marginTop: "3px",
                        }}
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <button type="submit" >
                        Sign in
                      </button>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-7 text-center text-[#000000] text-xs">
                <span>
                  Copyright © 2021-2023
                  <a
                    href="https://feedbox.co.in/"
                    rel=""
                    target="_blank"
                    title="Codepen aji"
                    className="text-[#9647ff] hover:text-[#9647ff] "
                  >
                    Feedbox
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

    </div>
  );
};

export default NewLogin;
