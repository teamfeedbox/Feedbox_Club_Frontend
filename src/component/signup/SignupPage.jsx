import {
  faEnvelope,
  faLockOpen,
  faPhone,
  faSchool,
  faSuitcase,
  faUser,
  faCalendar,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { Link } from "react-router-dom";
import "./SignUp.css";

// import Select from "react-select";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeYear, setCollegeYear] = useState();
  const [collegeName, setCollegeName] = useState("");
  const [skills, setSkills] = useState([]);
  const [branch, setBranch] = useState();

  const options = [
    { value: "First", label: "First" },
    { value: "Second", label: "Second" },
    { value: "Third", label: "Third" },  
    { value: "Fourth", label: "Fourth" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/login");
    }
  });

  const collectData = async (e) => {
    e.preventDefault();
    let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/register", {
      method: "post", // post method because we want to save the data
      body: JSON.stringify({
        name,
        email,
        password,
        collegeYear,
        branch,
        collegeName,
        skills,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
     console.log(result)
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/login");
    }
  };

  let onSelectNames = (skills) => {
    setSkills(skills);
  };

  return (
    <div className="signup-page">
      <div className="signup-page-img">
        <img src="Images/l1.jpg" alt="" />
        {/* <img src="Images/l3.png" alt="" /> */}
      </div>
      <div className="signup-page-main">
        <h2>Register</h2>
        <form class="">
          <div class="d-flex flex-row align-items-center mb-4">
            <div style={{width:"40px"}}><FontAwesomeIcon style={{'margin' : '10px'}} icon={faUser} /></div>
            <div class="form-outline flex-fill mb-0">
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <div style={{width:"40px"}}><FontAwesomeIcon style={{'margin' : '10px'}} icon={faEnvelope} /></div>
            <div class="form-outline flex-fill mb-0">
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <div style={{width:"40px"}}><FontAwesomeIcon style={{'margin' : '10px'}} icon={faLockOpen} /></div>
            <div class="form-outline flex-fill mb-0">
              <input
                type="password"
                id="password"
                class="form-control"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <div style={{width:"40px"}}><FontAwesomeIcon style={{'margin' : '10px'}}  icon={faSchool} /></div>
            <div class="form-outline flex-fill mb-0">
              <input
                type="text"
                id="university"
                class="form-control"
                placeholder="Your University"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
              />
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
          <div style={{width:"40px"}}><FontAwesomeIcon style={{'margin' : '10px'}} icon={faCalendar} /></div>
            <div class="form-outline flex-fill mb-0">
              {/* <input type="year" id="year" class="form-control" placeholder="Year"
              /> */}
            <select options={options} placeholder="Select Year.."/>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4">
            <div style={{width:"40px"}}><FontAwesomeIcon style={{'margin' : '10px'}} icon={faCodeBranch} /></div>
            <div class="form-outline flex-fill mb-0">
              <input
                type="text"
                id="branch"
                class="form-control"
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
              />
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mb-4 multi-placeholder">
            <div style={{width:"40px"}}><FontAwesomeIcon style={{'margin' : '12px'}}  icon={faSuitcase} /></div>
            <div class="form-outline flex-fill mb-0">
              <Multiselect
                value={skills}
                onChange={(e) => console.log()}
                placeholder="Add Skill"
                displayValue=""
                isObject={false}
                onKeyPressFn={function noRefCheck() {}}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={onSelectNames}
                options={[
                  "Web Development",
                  "App Development",
                  "SEO",
                  "Linkedin Optimization",
                  "Graphic Design",
                  "Video Editing",
                  "Time Management",
                  "Digital Marketing",
                  "Content Writing",
                  "Ads",
                ]}
                selectedValues={{}}
              />
            </div>
          </div>

          {/* <div class="form-check d-flex justify-content-center mb-5">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              id="form2Example3c"
            />
            <label class="form-check-label" for="form2Example3">
              I agree all statements in <a href="#!">Terms of service</a>
            </label>
          </div> */}

          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <Link
              to="/login"
              type="submit"
              class="btn btn-primary btn-lg"
              onClick={collectData}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
