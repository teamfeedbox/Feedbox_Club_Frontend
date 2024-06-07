import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Autoplay } from "swiper";
import "./PostBigModel.css";
import Modal from "react-bootstrap/Modal";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { ProgressBar } from "react-loader-spinner";
import { useStateValue } from "../../StateProvider";

function PostBigModel({ openComment, setOpenComment, id, route }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [commentId, setCommentId] = useState("");
  const [showReplyInputField, setShowReplyInputField] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [{ currentUser }, dispatch] = useStateValue();
  const [img, setImg] = useState(currentUser?.img);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [id, loading]);

  const updateComment = async () => {
    if (!message) return;
    try {
      const result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ id, message }),
      }).then(res => res.json());
      
      setMessage("");
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => setOpenComment(false);

  return (
    <>
      {openComment && (
        <div className="Post-Big-Model-container">
          <div className="Post-Big-Model-Close" onClick={handleClose}></div>
          <div id="commentBox" className={user && user.img.length > 0 ? "Post-Big-Model1" : "Post-Big-Model2"}>
            <section className="Post-Big-Model-Right">
              <div className="Post-Big-Comment-Container ml-4">
                <div className="Comment-Add-Section">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateComment();
                  }}>
                    <div className="flex items-center pr-4 pl-1 py-2.5 rounded-lg dark:bg-white-700">
                      <input
                        className="block mx-2 p-2.5 w-full text-sm rounded-lg border text-black"
                        style={{ border: "2px solid black" }}
                        placeholder="Add a comment..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default PostBigModel;
