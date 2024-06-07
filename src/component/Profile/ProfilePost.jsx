import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { Autoplay, Navigation } from "swiper";
import { faHeart, faMessage} from "@fortawesome/free-regular-svg-icons";
import { FcLike} from "react-icons/fc";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ProfilePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import PostBigModel from "../Main/PostBigModel"

const ProfilePost = (prop) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newS, setNewS] = useState(false);
  const [loading2, setLoading2] = useState(false); // to load all post on page
  const [id, setId] = useState("");
  // const [user,setUser]=useState([]);

  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false)
  const [user,setUser]=useState([]);


  // <------------ To show and hide comment model--------------->
  const [openComment,setOpenComment]=useState(false);


  useEffect(() => {
    myPost();
    getUser();
  }, []);

  const myPost = async () => {
    setLoading2(true);
<<<<<<< HEAD
    let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/myPost", {
=======
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/myPost`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);  
    setPost(result);
    setLoading2(false);
  };


  const deletePost = async(id)=>{
    // console.log(id)
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/deletePost/${id}`, {
      method: "delete",
    });

    result = await result.json();
    console.log(result)


    if (result) {
      myPost();
    }
  }
 

  const getUser = async () => {
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result)
    setUser(result);
  };


  // Like a post
  const like = (id) => {
<<<<<<< HEAD
    fetch("https://club-community-feedbox2-0-sdcn.vercel.app/like", {
=======
    fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/like`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Unlike a Post
  const unlike = (id) => {
<<<<<<< HEAD
    fetch("https://club-community-feedbox2-0-sdcn.vercel.app/unlike", {
=======
    fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/unlike`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDeletePost=(id)=>{
    setId(id);
    setOpen(!open);    
  }


  return (
    <div id="profilePost" >
      {
        loading2?
        <div
          role="status"
          style={{ height: "15px", width: "15px",margin:'auto'}}
        >
          <span className="text-black m-auto">Loading...</span>
        </div>
        :
        post.length>0 ? post.map((item) => (
          <div className="post-display my-3">
            <div className="flex justify-between">
              <p className="post-display-heading-time"> Posted : {item && item.postedDate && timeAgo.format(new Date(item.postedDate).getTime() - 60 * 1000)}</p>
              <div>
                <div 
                onClick={() => openDeletePost(item._id)}
                className=" w-7 h-7 rounded-full hover:bg-blue-200 transition-all duration-100">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="mx-[11.5px]"
                  />
                </div>
                 { open && item._id === id && <div
                  class=" absolute   bg-white/40 rounded-lg shadow ">
                  <ul class="py-3 px-3  flex flex-col gap-3">
                    <li class="cursor-pointer bg-red-500 p-2 rounded-md hover:opacity-90 text-white"
                    onClick={() => deletePost(item._id)}
                    >
                       <FontAwesomeIcon icon={faTrash} /> Delete
                    </li>
                  </ul>
                </div>}
              </div>
            </div>
  
            <div className="post-display-center">
                  <div className="post-display-content">{item.desc}</div>
                  <div className="post-display-image ">
                    {/* *****************carousel for mobile view********************* */}
                    <div className="post-display-carousel-mobileview">
                      <Swiper
                        navigation={item.img.length ===1 ? false:true}
                        data-aos="fade-up"
                          data-aos-duration="100s"
                          spaceBetween={0}
                          slidesPerView={1}
                          loop={true}
                          autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                          }}
                          modules={[Navigation,Autoplay]}
                      
                        className="mySwiper">
                          
  
                        {
                          
                          item.img.length > 0 &&
                          item.img.map((data) => (
                              <SwiperSlide >
                            <div className="" key={data._id}>
                              <img className="" src={data} alt="" />
                            </div>
                        </SwiperSlide>
                          ))
                        }
                      </Swiper>
                    </div>
                  </div>
                  {/* *********************carousel for web view*************************** */}
                  <div className="post-display-image flex justify-center">
                    <div className="post-display-carousel-webview flex justify-center">
                      <Carousel
                        thumbWidth={60}
                        width={450}
                        dynamicHeight
                        autoPlay
                        interval="5000"
                        infiniteLoop={true}
                      >
                        {
                          item.img.length > 0 &&
                          item.img.map((data) => (
                            <div key={data._id}>
                              <img className="display-img" src={data} alt=""/>
                            </div>
                          ))
                        }
                      </Carousel>
                    </div>
                  </div>
                </div>
  
                <div className="post-display-bottom">
                  {item.likes.includes(user && user._id) ? (
                    <div className="post-display-bottom-content">
                      <FcLike
                        size={26}
                        onClick={function () {
                          unlike(item && item._id);
                        }}
                        style={{marginLeft:"-1.4px",marginTop:"-3px",cursor:"pointer"}}
                      />
                      <span> {item.likes.length}</span>
                    </div>
                  ) : (
                    <div className="post-display-bottom-content">
                      <FontAwesomeIcon className="fa-lg" icon={faHeart} style={{ fontSize: "24.5px",cursor:"pointer"}}
                        onClick={function () {
                          like(item._id);
                        }}
                      />
                      <span style={{fontSize:'0.8rem', fontWeight:'600'}}>
                        {item.likes.length}
                      </span>
  
                    </div>
                  )}
                  <button onClick={() => {
                    setOpenComment(!openComment)
                    setId(item._id)
                  }} className="post-display-bottom-content">
                    <FontAwesomeIcon
                        style={{ fontSize: "22.5px",cursor:"pointer",marginTop:"1px"}}
                        icon={faMessage}
                      />
                    <span style={{fontSize:'0.8rem', fontWeight:'600'}}>
                    {item.comment.length}
                    </span>
                  </button>
                </div>
              </div>
  
            )) : 
        <div className="font-[700] text-[1.1rem] pt-2 text-center">You haven't posted anything yet!</div>} 
      
      
      <PostBigModel
      openComment={openComment}
      setOpenComment={setOpenComment}
      id={id}
      route="/profile"
      />
    </div>
  );
};

export default ProfilePost;
