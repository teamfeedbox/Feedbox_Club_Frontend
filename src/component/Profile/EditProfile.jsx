import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditProfile.css";
import { useToasts } from "react-toast-notifications";
import { useStateValue } from "../../StateProvider";

const EditProfile = ({ Userbio, Username, Useryear, open, setOpen,sendData }) => {
  const role = JSON.parse(localStorage.getItem("user")).role;
  const [data, setData] = useState('');
  // const [validated, setValidated] = useState(false);
  let validated=false;
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("Images/girl.jpg");
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [imgg, setImgg] = useState();
  const [name, setName] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [render,setRender]=useState(false);

  const [bio, setBio] = useState('');
  const [user, setUser] = useState();
 

  const [{ currentUser }, dispatch] = useStateValue();

  const id = JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id
  console.log(localStorage.getItem("jwt")); // 65d5bb099dd7c852779b1fd4
  

  const { addToast } = useToasts();


  const handleClose = () => {
    setOpen(false);
    setImage(false)
    setBio(Userbio);
    setName(Username);
    setCollegeYear(Useryear);
  };

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImgg(e.target.files[0]);
    setImage(!image);
  }

  useEffect(() => {
    if (Userbio || Username || Useryear) {
      console.log(Userbio, Username, Useryear);
      setBio(Userbio);
      setName(Username);
      setCollegeYear(Useryear);
    }
    setLoading(false)
  }, [data, loading,Userbio, Username, Useryear]);

  const updateDetail = async (data) => {
    console.log(collegeYear, name, bio);
    // console.log(data)
    setLoading(true);
    let result = await fetch(`http://localhost:8000/updateDetail/${data}`, {
      method: "put",
      body: JSON.stringify({ bio,name, collegeYear }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    const res = await result.json();

    setLoading(false);
    setOpen(false);
    validated=true;
    setImage(false);
    // setUrl("");
    setImgg("");
    // setValidated(true);
  };

  const crossImage=()=>{
    setImage(false);
    setImgg("");
  }

  const getUser = async () => {
    if (currentUser) {
      setUser(currentUser)
    } else {
      let result = await fetch(`http://localhost:8000/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const res = await result.json();
      setUser(res)
      setData(res._id);
      setBio(bio === '' ? res.bio : bio);
      setName(name === '' ? res.name : name);
      setCollegeYear(collegeYear === '' ? res.collegeYear : collegeYear);
    }
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    console.log(imgg);
    const fdata = new FormData();

    if (imgg) fdata.append("image", imgg)
    if (name) fdata.append("name", name)
    if (collegeYear) fdata.append("collegeYear", collegeYear)
    if (bio) fdata.append("bio", bio)

    const data = await fetch(`http://localhost:8000/update/details/pic/${id}`, {
      method: "PUT",
      body: fdata,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    const updatedUser = await data.json();


    dispatch({
      type: 'INIT_USER',
      item: updatedUser,
    });

    if (currentUser && currentUser.imgId) {
      const data = await fetch(`http://localhost:8000/delete/image/user/${currentUser.imgId}`, {
        method: "DELETE",
        body: fdata,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
      const res = await data.json();
      setLoad(false);
      addToast(res, { appearance: "success" });
      console.log(res);
      // addToast(res, { appearance: "success" })
    }
    setRender(!render)
    sendData(!render);
    setOpen(false);
    setImage(false)
    setLoading(true);


  }

  // to count the number of words left in edit bio section
  const maxWords = 400;
  const wordsLeft = bio.length;

  const handleChange1 = (e) => {
    const value = e.target.value;
    if (bio.length < maxWords) {
      setBio(value);
    }
  };

  return (
    <div>
      {open ? (
        <div style={{ zIndex: "99999999", }} >
          <Modal show={open}>
            <Form noValidate>
              <Modal.Header>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <Form> */}
                {role === 'Super_Admin' ? '' : <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </Form.Group>
                }

                {role === 'Super_Admin' ? '' : <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Year </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setCollegeYear(e.target.value)}
                    value={collegeYear}
                  />
                </Form.Group>
                }

                {role === 'Super_Admin' ? '' : <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>About </Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    // rows={3}
                    maxlength="400"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value)
                      handleChange1(e)
                    }}

                  />
                  <p className="Register-Page-Word-Limit"
                  >* {wordsLeft}/400</p>
                </Form.Group>}

                <Form.Group>
                  <div>
                    <label className="block">Profile Photo</label>
                    <div
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      style={{
                        maxHeight: "200px",
                        minHeight: "200px",
                        width: "250px",
                        margin: "0 auto",
                      }}
                    >
                      {image ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={crossImage}
                            className="Edit-Profile-cancel"
                          />
                          <img
                            src={file}
                            alt=""
                            style={{
                              maxHeight: "175px",
                              minHeight: "175px",
                              width: "200px",
                              marginTop: "-35px",
                            }}
                            className="object-cover	"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="True"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600  justify-center">
                            <label
                              for="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span className="flex justify-center">
                                Upload a file
                              </span>
                              <Form.Control
                                onChange={handleChange}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                required
                                className="sr-only "
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Form.Group>
                {/* </Form> */}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary">
                  {load ? (
                    <div
                      className="spinner-border text-white"
                      role="status"
                      style={{ height: "15px", width: "15px" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <Button
                      type="submit" onClick={handleSubmit}>
                      Save Changes
                    </Button>
                  )}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditProfile;