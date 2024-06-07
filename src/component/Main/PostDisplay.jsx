import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { FcLike } from "react-icons/fc";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "react-bootstrap/Modal";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation } from "swiper";
import "./PostDisplay.css";
import PostBigModel from "./PostBigModel";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import debounce from 'lodash.debounce';
const PostDisplay = (props) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [id, setId] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [load, setLoad] = useState(false);
  // To open the Comment Model
  const [openComment, setOpenComment] = useState(false);
  const [delshow, setDelShow] = useState(false);
  // To show and hide the more button if content is more then 200 character
  const [showMore, setShowMore] = useState(false);
  const [contentId, setContentId] = useState("");
  const [postId, setPostId] = useState("");

  const role =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).role;
  const college =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).college;

  // console.log(college);

  const [{ currentUser, allPosts }, dispatch] = useStateValue();

  useEffect(() => {
    getUser();
    getList();
    setLoad(false);
  }, [load, props.clgData, props.receivePost]);

  const getUser = () => {
    setUser(currentUser);
  };

  const handleDelClose = () => {
    setDelShow(false);
  };

  // get All Post
  const getList = async () => {
    setLoading2(true);
    let result;
    if (allPosts) {
      // console.log(allPosts, "alllPiskjdihd");
      result = allPosts;
    } else {
// <<<<<<< HEAD
//       let res = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/getAllPost", {
// =======
      let res = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/getAllPost`, {
// >>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      res = await res.json();
      let count = 0;
      res.map((data) => {
        count = data.comment.length;
        data.comment.map((res) => {
          count += res.reply.length;
        });
        data.count = count;
      });
      dispatch({
        type: "INIT_ALL_POST",
        item: res.reverse(),
      });
      result = res;
    }

    console.log(result);
    if (role === "Super_Admin" || role === "Admin") {
      if (props.clgData) {
        if (props.clgData === "All") {
          setData(result);
          setLoad(true);
        } else {
          let array = [];
          result.map((eve) => {
            if (eve.collegeName === props.clgData) {
              array.push(eve);
              console.log(array);
            }
          });
          console.log(array);
          if (array.length > 0) {
            setData(array);
            setLoad(true);
          } else {
            setData([]);
            setLoad(true);
          }
        }
      } else {
        if (role == "Admin") {
          let array = [];
          result.map((data) => {
            if (data.scope === "public" || data.collegeName === college) {
              array.push(data);
            }
          });
          setData(array);
          setLoad(true);
        } else {
          setData(result);
          setLoad(true);
        }
      }
    } else {
      let array = [];
      result.map((data) => {
        if (data.scope === "public" || data.collegeName === college) {
          array.push(data);
        }
      });
      setData(array);
      setLoad(true);
    }
    setLoading2(false);
  };

  // Like a post
  const like = debounce( (id, index) => {
// <<<<<<< HEAD
//     fetch("https://club-community-feedbox2-0-sdcn.vercel.app/like", {
// =======
    fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/like`, {
// >>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
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
        console.log(result);
        allPosts.length > 0 &&
          allPosts.map((post) => {
            if (post._id === id) {
              post.likes = result.likes;
            }
          });
        dispatch({
          type: "INIT_ALL_POST",
          item: allPosts,
        });
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  },500);

  // Unlike a Post
  const unlike = debounce((id) => {
// <<<<<<< HEAD
//     fetch("https://club-community-feedbox2-0-sdcn.vercel.app/unlike", {
// =======
    fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/unlike`, {
// >>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
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
        console.log(result);
        allPosts.length > 0 &&
          allPosts.map((post) => {
            if (post._id === id) {
              post.likes = result.likes;
            }
          });
        dispatch({
          type: "INIT_ALL_POST",
          item: allPosts,
        });
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  },500);

  if (typeof window !== "undefined") {
    injectStyle();
  }

  const postDelete = async (Id) => {
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/deletePost/${Id._id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(Id),
    });

    result = await result.json();
    console.log(result);

    if (result) {
      toast.dark("Deleted Successfully...");
      console.log(allPosts);
      let array = [];
      for (let i = 0; i < allPosts.length; i++) {
        if (allPosts[i]._id !== Id._id) {
          array.push(allPosts[i]);
        }
      }
      dispatch({
        type: "INIT_ALL_POST",
        item: array,
      });
      setDelShow(false);
      setLoad(true);
    }
  };

  return (
    <div id="post_display_container">
      {!loading2 ? (
        <div className="mb-[120px]">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={item._id} className="post-display1">
                <div className="post-display-head">
                  <div style={{ display: "flex" }}>
                    <div className="post-display-profile">
                      <img
                        src={item && item.postedBy && item.postedBy.img}
                        alt=""
                      />
                    </div>
                    <div className="post-display-heading">
                      {role === "Super_Admin" || role === "Admin" ? (
                        <Link
                          className="link-to-profile"
                          to="/profile"
                          state={item.postedBy}
                        >
                          <p className="post-head">
                            {item && item.postedBy && item.postedBy.name}
                          </p>
                        </Link>
                      ) : (
                        <p className="post-head">
                          {item && item.postedBy && item.postedBy.name}
                        </p>
                      )}

                      <div className="post-head-content">
                        <p className="post-display-heading-college">
                          {item &&
                          item.postedBy &&
                          item.postedBy.role == "Super_Admin"
                            ? "Super Admin"
                            : item.scope === "public"
                            ? item.collegeName + " (Public)"
                            : item.collegeName}
                        </p>
                        <p className="post-display-heading-time">
                          {item.postedDate &&
                            timeAgo.format(
                              new Date(item.postedDate).getTime() - 60 * 1000
                            )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {role === "Super_Admin" ? (
                    <div
                      className="post-display-delete"
                      onClick={() => {
                        setDelShow(true);
                        setPostId(item);
                      }}
                    >
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
                    </div>
                  ) : (
                    ""
                  )}
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
                        Are you sure to delete this post ?
                      </Modal.Header>
                      <Modal.Footer className="modal-footer club-member-modal-footer">
                        <div className="modal-footer-club-member-yes-no-div">
                          <div
                            onClick={() => {
                              postDelete(postId);
                            }}
                          >
                            Yes
                          </div>
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
                </div>

                <div className="post-display-center">
                  <div className="post-display-content">
                    {item.img.length <= 0 ? (
                      item.desc
                    ) : item.desc && contentId === item._id && showMore ? (
                      item.desc
                    ) : item.desc.length > 180 ? (
                      <button
                        style={{ textAlign: "left" }}
                        onClick={() => {
                          setShowMore(true);
                          setContentId(item._id);
                        }}
                      >
                        {item.desc.slice(0, 180)}{" "}
                        <span style={{ color: "gray", fontWeight: "600" }}>
                          {" "}
                          .....read more
                        </span>
                      </button>
                    ) : (
                      item.desc
                    )}
                  </div>
                  {/*

                */}
                  {/* *****************carousel for mobile view********************* */}
                  {item.img.length > 0 ? (
                    <div className="post-display-image ">
                      <div className="post-display-carousel-mobileview">
                        <Swiper
                          navigation={item.img.length === 1 ? false : true}
                          data-aos="fade-up"
                          data-aos-duration="100s"
                          spaceBetween={0}
                          slidesPerView={1}
                          loop={true}
                          autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                          }}
                          modules={[Navigation, Autoplay]}
                          className="mySwiper"
                        >
                          {item.img.length > 0 &&
                            item.img.map((data) => (
                              <SwiperSlide>
                                <div className="" key={data._id}>
                                  <img className="" src={`${data}`} alt="" />
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>
                    </div>
                  ) : (
                    " "
                  )}

                  {/* ********carousel for web view********** */}

                  {item.img.length > 0 ? (
                    <div
                      id="web-carousel"
                      className="post-display-image flex justify-center carousel-web-view"
                    >
                      <div className="post-display-carousel-webview flex justify-center h-[100%] m-0 p-0">
                        <Carousel
                          thumbWidth={60}
                          width={450}
                          dynamicHeight
                          autoPlay
                          interval="5000"
                          infiniteLoop={true}
                        >
                          {item.img.length > 0 &&
                            item.img.map((data) => (
                              <div key={data._id}>
                                <img
                                  className="display-img"
                                  alt=""
                                  src={`${data}`}
                                />
                              </div>
                            ))}
                        </Carousel>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="post-display-bottom">
                  {item.likes.includes(user && user._id) ? (
                    <div className="post-display-bottom-content">
                      <FcLike
                        size={26}
                        onClick={function () {
                          unlike(item && item._id);
                        }}
                        style={{
                          marginLeft: "-1.4px",
                          marginTop: "-3px",
                          cursor: "pointer",
                        }}
                      />
                      <span> {item.likes.length}</span>
                    </div>
                  ) : (
                    <div className="post-display-bottom-content">
                      <FontAwesomeIcon
                        className="fa-lg"
                        icon={faHeart}
                        style={{ fontSize: "24.5px", cursor: "pointer" }}
                        onClick={function () {
                          like(item._id, index);
                        }}
                      />
                      <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                        {item.likes.length}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setOpenComment(!openComment);
                      setId(item._id);
                    }}
                    className="post-display-bottom-content"
                  >
                    <FontAwesomeIcon
                      style={{
                        fontSize: "22.5px",
                        cursor: "pointer",
                        marginTop: "1px",
                      }}
                      icon={faMessage}
                    />
                    <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                      {item.count ? item.count : 0}
                    </span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="post-display1">
              <div style={{ textAlign: "center" }}>No Post Yet !</div>
            </div>
          )}
        </div>
      ) : (
        <div className="post-display1">
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <PostBigModel
        openComment={openComment}
        setOpenComment={setOpenComment}
        id={id}
        route="/main"
      />
    </div>
  );
};
export default PostDisplay;
