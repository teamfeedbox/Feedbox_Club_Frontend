import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation } from "swiper";

// Css PostBigModel.css (in profile folder)
import "./PostBigModel.css";
// Bootstrap
import Modal from "react-bootstrap/Modal";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {  ProgressBar } from "react-loader-spinner";
import { useStateValue } from "../../StateProvider";
function PostBigModel({ openComment, setOpenComment, id, route }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [deleteComId, setDeleteComId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [commentId, setCommentId] = useState("");
  const [postedById, setPostedById] = useState("");
  const [replyById, setReplyById] = useState("");
  const [message, setMessage] = useState("");
  // popup to delete the reply
  const [show, setShow] = useState(false);
  // popup to delete the comment
  const [showDel, setShowDel] = useState(false);
  // To show reply input field
  const [showReplyInputField, setShowReplyInputField] = useState(false);
  // To show the reply written by user
  const [showReply, setShowReply] = useState(true);
  // To show and hide "view reply"
  const [checkReply, setCheckreply] = useState(true);
  // To show and hide "hide reply"
  const [hideReply, setHidereply] = useState(false);

  const [{ currentUser }, dispatch] = useStateValue();

  // funciton for doing comment
  function comment() {
    return (
      <>
        <div className="Comment-Add-Section">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (message === "") {
              } else {
                updateComment();
              }
            }}
          >
            <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700  ">
              <div className=" rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <img
                  src={img}
                  aria-hidden="true"
                  className="w-10 h-8
                            p-0
                            rounded-full
                            object-cover
                            "
                            alt=""
                />
              </div>
              <input
                className="block mx-2 p-2.5 w-full text-sm rounded-lg border text-black"
                style={{ border: "2px solid black" }}
                placeholder="Add a comment..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></input>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                aria-labelledby="submitBtnLabel"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  // function for left part (img)
  function left() {
    return (
      <>
        <div className="post-display2">
          <Swiper
            navigation={user.img.length === 1 ? false : true}
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
            {user.img.length > 0 &&
              user.img.map((data) => (
                <SwiperSlide>
                  <div className="" key={data._id}>
                    <img className="w-[100%]" src={`https://drive.google.com/uc?id=${data}`} alt="" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </>
    );
  }

  // function for right part (comment)
  function right() {
    return (
      <>
        <div className="Post-Big-Model-Profile">
          <div className="Post-Big-Pro">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "fit-content",
                width: "95%",
              }}
            >
              <div className="Post-Big-Pro-img">
                <img
                  src={user && user.postedBy && user.postedBy.img}
                  alt=""
                />
              </div>
              <div className="Post-Big-Title">
                <div className="Post-Big-Title1">
                  {user && user.postedBy && user.postedBy.name}
                </div>
                <div className="Post-Big-Title2">
                  {user && user.postedBy && user.postedBy.role}
                </div>
              </div>
            </div>
            <Link
              to={route}
              className="Cancel-Icon-Container"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon
                className="fa-lg"
                icon={faXmark}
                onClick={handleClose}
              />
            </Link>
          </div>
          {/* Description */}
          <div className="Post-Big-Description ml-2">{user && user.desc}</div>
          {/* <div style={{border:"2px solid #ddd8d87f",width:"90%",margin:"0 auto"}}></div> */}
        </div>

        {/* Line to seprate pofile and comment */}
        {/* <div className="Post-Big-Line"></div> */}

        {/* Comment part */}

        <div className="Post-Big-Comment">
          {user && user.comment.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              No comment
            </div>
          ) : (
            <Scrollbars
              className="Scrollbar-height"
              style={{ height: "102%", position: "relative" }}
            >
              {/* Comment 1 */}
              {user &&
                user.comment.map((item) => (
                  <section className="Post-Comment-About" key={item._id}>
                    {/* Left part */}
                    <div className="Comment-Left">
                      <img
                        className="object-contain"
                        src={item && item.postedBy && item.postedBy.img} alt=""
                      />
                    </div>

                    {/* Right part */}
                    <div className="Comment-Right">
                      <div className="Comment-Right-Top">
                        <div className="Comment-Right-User-Name">
                          {item && item.postedBy && item.postedBy.name}
                        </div>
                        <div className="Right-Comment">{item.message}</div>
                      </div>

                      <div className="Comment-Right-Down">
                        <span
                          className="Comment-Down-Other"
                          // onClick={()=>{console.log(item.reply.length)}}
                        >
                          {item &&
                            item.date &&
                            timeAgo.format(
                              new Date(item.date).getTime() - 60 * 1000
                            )}
                        </span>
                        <span
                          className="Comment-Down-Other Comment-Down-Other1"
                          onClick={() => {
                            handleShowDelete();
                            setDeleteComId(item._id);
                            console.log(item._id);

                            setPostedById(
                              item && item.postedBy && item.postedBy._id
                            );
                          }}
                          style={{ marginLeft: "20px" }}
                        >
                          delete
                        </span>
                        {
                          <span
                            className="Comment-Down-Other Comment-Down-Other1 "
                            onClick={() => {
                              setShowReplyInputField(!showReplyInputField);
                              // alert(showReplyInput)
                              setCommentId(item._id);
                              console.log(item._id);
                            }}
                          >
                            reply
                          </span>
                        }
                      </div>
                      {/* * Section which will contain the reply on a comment*** */}
                      {showReply === true && commentId === item._id ? (
                        <section
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "10px",
                          }}
                        >
                          {item &&
                            item.reply.map((data) => (
                              <div key={data._id}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div className="Comment-Left">
                                  <img
                                    src={
                                      data && data.postedBy && data.postedBy.img
                                    } alt=""
                                  />
                                </div>
                                <div key={data._id} className="Comment-Right">
                                  <div className="Comment-Right-Top">
                                    <div className="Comment-Right-User-Name">
                                      {data &&
                                        data.postedBy &&
                                        data.postedBy.name}
                                    </div>
                                    <div className="Right-Comment">
                                      {" "}
                                      {data && data.replyMsg}
                                    </div>
                                  </div>
                                  <div className="Comment-Right-Down">
                                    <span className="Comment-Down-Other">
                                      {data &&
                                        data.date &&
                                        timeAgo.format(
                                          new Date(data.date).getTime() -
                                            60 * 1000
                                        )}
                                    </span>
                                    <span
                                      className="Comment-Down-Other Comment-Down-Other1"
                                      onClick={() => {
                                        handleShowDeleteReply();
                                        setReplyId(data._id);
                                        setReplyById(
                                          data &&
                                            data.postedBy &&
                                            data.postedBy._id
                                        );
                                      }}
                                      style={{ marginLeft: "20px" }}
                                    >
                                      delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </section>
                      ) : (
                        ""
                      )}
                      {/* Hide and show reply */}

                      {item.reply.length > 0 &&
                      checkReply === true &&
                      showReply !== true ? (
                        <span
                          onClick={() => {
                            setShowReply(true);
                            setCheckreply(false);
                            setHidereply(true);
                            setCommentId(item._id);
                            setShowReply(true);
                            setCheckreply(false);
                          }}
                          style={{
                            cursor: "pointer",
                            marginLeft: "20px",
                          }}
                        >
                          ---- View Reply
                        </span>
                      ) : hideReply === true &&
                        commentId === item._id &&
                        item.reply.length > 0 ? (
                        <>
                          <span
                            onClick={() => {
                              setHidereply(false);
                              setCheckreply(true);
                              setShowReply(false);
                              setCommentId("");
                              // setShowReply(true)
                            }}
                            style={{
                              cursor: "pointer",
                              marginLeft: "20px",
                            }}
                          >
                            ---- Hide Reply
                          </span>
                        </>
                      ) : item.reply.length > 0 ? (
                        <span
                          onClick={() => {
                            setShowReply(true);
                            setCheckreply(false);
                            setHidereply(true);
                            setCommentId(item._id);
                            setShowReply(true);
                            setCheckreply(false);
                          }}
                          style={{
                            cursor: "pointer",
                            marginLeft: "20px",
                          }}
                        >
                          ---- View Reply
                        </span>
                      ) : (
                        ""
                      )}

                      {showReplyInputField === true &&
                      item._id === commentId ? (
                        <div className="Show-comment-Add-Btn">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                              <div className="rounded-lg cursor-pointer hover:text-black-900 hover:bg-gray-100 dark:text-black-400 dark:hover:text-black dark:hover:bg-gray-600"></div>
                              <input
                                className="block border-solid  mx-2 p-2.5 w-full text-sm text-black-600 bg-white  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 border-black-600"
                                placeholder="Reply..."
                                value={replyMsg}
                                onChange={(event) =>
                                  setReplyMsg(event.target.value)
                                }
                              ></input>
                              <button
                                onClick={() => {
                                  updateReply();

                                  setShowReplyInputField(false);
                                  if (replyMsg !== "") {
                                    setCheckreply(false);
                                    setHidereply(true);
                                  }
                                }}
                                type="button"
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                                aria-labelledby="submitBtnLabel"
                              >
                                <svg
                                
                                  aria-hidden="true"
                                  className="w-6 h-6 rotate-90"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </section>
                ))}
                {
                  user && console.log(user.comment,"lkfvnjfbvghhuv")
                }
            </Scrollbars>
          )}
        </div>
      </>
    );
  }

  const handleClose = () => {
    setOpenComment(false);
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
    getUser();
    setLoading(false);
  }, [id, loading]);

  const getPost = async () => {
<<<<<<< HEAD
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/userPost/${id}`, {
=======
    let result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/userPost/${id}`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setUser(result);
  };

  const [img, setImg] = useState();

  const getUser = async () => {
    if (currentUser) {
      setImg(currentUser.img);
      return;
    }
<<<<<<< HEAD
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/user`, {
=======
    let result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/user`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setImg(result.img);
  };

  const updateComment = () => {
    console.log(id, "", message);
<<<<<<< HEAD
    fetch("https://club-community-feedbox2-0-sdcn.vercel.app/comment", {
=======
    fetch("https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/comment", {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id, message }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(true);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateReply = () => {
    console.log(commentId, "", replyMsg);
<<<<<<< HEAD
    fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/reply/${commentId}`, {
=======
    fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/reply/${commentId}`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id, replyMsg }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(true);
        setReplyMsg("");

        console.log(result.error);

        if (result.error) {
          alert("You have already replied to this comment");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete comment
  const deleteComment = async (deleteComId) => {
    console.log(deleteComId, " ", id);
    let result = await fetch(
<<<<<<< HEAD
      `https://club-community-feedbox2-0-sdcn.vercel.app/commentDel/${deleteComId}`,
=======
      `https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/commentDel/${deleteComId}`,
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ id, postedById }),
      }
    );

    result = await result.json();
    console.log(result);
    setLoading(true);
    console.log(result.error);

    if (result.error) {
      alert("You are not authorized to delete this comment");
    }
  };

  const deleteReply = async (replyId) => {
    console.log(replyId, " ", id);
<<<<<<< HEAD
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/replyDel/${replyId}`, {
=======
    let result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/replyDel/${replyId}`, {
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      method: "put",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id, commentId, replyById }),
    });

    result = await result.json();
    console.log(result);
    setLoading(true);

    // console.log(result.error)

    if (result.error) {
      alert("You are not authorized to delete this reply");
    }
  };

  // To show and hide delete comment model
  const handleCloseDelete = () => {
    setShow(false);
    setShowDel(false);
  };
  const handleShowDelete = () => setShowDel(true);
  const handleShowDeleteReply = () => setShow(true);

  return (
    <>
      {/* Model to delete the comment */}
      <Modal
        show={showDel}
        // onHide={handleCloseDelete}
        className="edit-modal-container"
      >
        <Modal.Body className="modal-dialog1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="delete-btn"
              onClick={() => {
                deleteComment(deleteComId);
                handleCloseDelete();
              }}
            >
              OK
            </button>
            <button className="delete-btn" onClick={handleCloseDelete}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={handleShowDeleteReply}
        className="edit-modal-container"
      >
        <Modal.Body className="modal-dialog1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="delete-btn"
              onClick={() => {
                deleteReply(replyId);
                handleCloseDelete();
              }}
            >
              Delete Reply
            </button>
            <button className="delete-btn" onClick={handleCloseDelete}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {openComment ? (
        <div className="Post-Big-Model-container">
          {/* to close the model on click out side the post section */}
          <div className="Post-Big-Model-Close" onClick={handleClose}></div>
          {user && user.img.length > 0 ? (
            <div id="commentBox" className="Post-Big-Model1">
              {user ? (
                <>
                  {/* Left side */}
                  {left()}
                  {/* </section> */}

                  {/* Right side */}
                  <section className="Post-Big-Model-Right">
                    {right()}
                    <div className="Post-Big-Comment-Container ml-4">
                      {comment()}
                    </div>
                  </section>
                  {/* import { RotatingLines } from  'react-loader-spinner' */}
                </>
              ) : (
                <div className="flex justify-center w-[100vw]">
                  <ProgressBar
                    height="none"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor="#F4442E"
                    barColor="#51E5FF"
                  />
                </div>
              )}
            </div>
          ) : (
            //  ********************************************************
            // if no img is there
            <div id="commentBox" className="Post-Big-Model2">
              {user ? (
                <>
                  {/* Left side */}
                  {/* Left part is not here, because it is handling the community post, which does not contain any image */}

                  {/* Right side */}
                  <section className="Post-Big-Model-Right1">
                    {right()}

                    <div className="Post-Big-Comment-Container1 ">
                      {comment()}
                    </div>
                  </section>
                  {/* import { RotatingLines } from  'react-loader-spinner' */}
                </>
              ) : (
                <div className="flex justify-center w-[100vw]">
                  <ProgressBar
                    height="none"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor="#F4442E"
                    barColor="#51E5FF"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default PostBigModel;
