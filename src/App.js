import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/signup/Register";
// import Home from "./component/landing_page/Home";
import Main from "./component/Main/Main";
import Rescources from "./component/Rescources/Rescources";
import RescourcesTable from "./component/Rescources/RescourcesTable";
import Faq from "./component/Faq";
import Approvals from "./component/approvals/Approvals";
import ProfileTabs from "./component/Profile/ProfileTabs";
import NewLogin from "./component/login/NewLogin";
import AttendanceSheet from "./component/Calendar/AttendanceSheet";
import ReactBigCalendar from "./component/Calendar/ReactBigCalendar";
import PostBigModel from "./component/Main/PostBigModel";
import Error from "./component/Error";
import Loader from "./component/Loader";
import MobileNotification from "./component/navbar/MobileNotification";
import NavbarRes from "./component/navbar/NavbarRes";
import Login from "./component/login/Login";
import Modal from "react-bootstrap/Modal";
import { useStateValue } from "./StateProvider";
import Store from "./component/Store/Store.jsx";
import AddProducts from "./component/Store/AddProducts.jsx";
import ProductList from "./component/Store/ProductList.jsx";
import { CheckoutPage } from "./component/Store/CheckoutPage.jsx";
const App = () => {
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user && user.role;

  const [{ currentUser, colleges, allPosts, allEventsData }, dispatch] =
    useStateValue();

  const handleClose = () => {
    setShow(false);
  };

  const handleLogout = () => {
    localStorage.setItem("user", null);
    localStorage.setItem("jwt", null);
    window.location.href = "/";
  };

  const handleClick = async () => {
    let result = await fetch(`${process.env.BASE_URL_MAIN}/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    if (result.role != null) {
      if (result.role !== role) {
        setShow(true);
      }
    }
  };

  // Get all Colleges***
  const getColleges = async () => {
    if (!colleges) {
      const data = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/colleges/get`);
      const res = await data.json();
      let val = [];
      res.map((data) => {
        val.push(data.name);
      });
      dispatch({
        type: "INIT_CLG_ARR",
        item: val,
      });
    }
  };

  // Get a user***
  const getUser = async () => {
    if (!currentUser) {
      let result = await fetch(`https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      result = await result.json();
      console.log(result, "user hereeeeeee");

      dispatch({
        type: "INIT_USER",
        item: result,
      });
    } else {
      console.log("current user already initialized");
    }
  };

  // Get All Events***
  const getAllEvents = async () => {
    if (!allEventsData) {
      let res = await fetch("https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/getAllEvent");
      res = await res.json();
      dispatch({
        type: "INIT_ALL_EVENT",
        item: res,
      });
    } else {
      console.log("All events already initialized");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    getUser();
    getAllEvents();
    getColleges();
  }, []);

  return (
    <div className="App"
    >
      <Modal show={show} onHide={handleClose} className="club-member-modal">
        <form>
          <Modal.Header closeButton className="club-member-modal-header">
            Your position is changed, Please Login In Again !
          </Modal.Header>
          <Modal.Footer className="modal-footer club-member-modal-footer">
            <div className="modal-footer-club-member-yes-no-div">
              <div onClick={handleLogout}>OK</div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<NewLogin />} />
          <Route index path="/login" element={<NewLogin />} />
          <Route index path="/super_admin_login" element={<Login />} />
          <Route index path="/register" element={<Register />} />
          <Route
            index
            path="/main"
            element={role == null ? <Error /> : [<NavbarRes />, <Main />]}
          />

          <Route
            index
            path="/comment/:id"
            element={role == null ? <Error /> : <PostBigModel />}
          />

          <Route
            index
            path="/calendar"
            element={
              role === null ? <Error /> : [<NavbarRes />, <ReactBigCalendar />]
            }
          />

          <Route
            index
            path="/rescources"
            element={role == null ? <Error /> : [<NavbarRes />, <Rescources />]}
          />

          <Route
            index
            path="/profile"
            element={
              role == null ? <Error /> : [<NavbarRes />, <ProfileTabs />]
            }
          />

          <Route index path="/profileComment" element={<PostBigModel />} />

          <Route
            index
            path="/rescourcesDisplay"
            element={
              role == null ? <Error /> : [<NavbarRes />, <RescourcesTable />]
            }
          />

          <Route
            index
            path="/faq"
            element={role == null ? <Error /> : [<NavbarRes />, <Faq />]}
          />

          <Route
            index
            path="/approvals"
            element={
              role === null || role === "Club_Member" ? (
                <Error />
              ) : (
                [<NavbarRes />, <Approvals />]
              )
            }
          />

          <Route index path="/load" element={<Loader />} />
          <Route index path="*" element={<Error />} />

          <Route
            index
            path="/attendance/:name"
            element={
              role == null || role == "Club_Member" ? (
                <Error />
              ) : (
                [<NavbarRes />, <AttendanceSheet />]
              )
            }
          />

          <Route
            index
            path="/store"
            element={role == null ? <Error /> : [<NavbarRes />, <Store />]}
          />
          
          <Route
            index
            path="/addproduct"
            element={role == 'Super_Admin' ? [<NavbarRes />, <AddProducts />] : <Error />}
          />
          
          <Route
            index
            path="/showproducts"
            element={role == 'Super_Admin' ? [<NavbarRes />, <ProductList />] : <Error />}
          />

          <Route
            index
            path="/notification"
            element={role == null ? <Error /> : <MobileNotification />}
          />

          <Route exact path="/store/product/:productId"  element={role === 'Club_Member' ? [<NavbarRes />, <CheckoutPage />] : <Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
