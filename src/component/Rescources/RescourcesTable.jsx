import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "./RescourcesTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import moment from"moment";



import {
  faChain,
  faFileLines,
  faPlus,
  faSearch,
  faImage,
  faFile,
  faFileInvoice,
  faDeleteLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NavbarRes from "../navbar/NavbarRes";
import { useStateValue } from "../../StateProvider";

const RescourcesTable = (props) => {
  if (typeof window !== "undefined") {
    injectStyle();
  }

  // TimeAgo.addLocale(en);
  // const timeAgo = new TimeAgo("en-US");
  const location = useLocation();
  const propsData = location.state;
  let skillName = propsData.name;

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [show, setShow] = useState(false);
  const [fileu, setFile] = useState();
  const [link, setLink] = useState(false);
  const [title, setTitle] = useState();
  const [pdfFile, setPdfFile] = useState();
  const [data, setData] = useState([]);
  const [duplicateData, setDuplicateData] = useState([]);
  const [searched, setSearched] = useState("");
  const [searchval, setSearchVal] = useState("");
  const [user, setUser] = useState();
  const [img, setImg] = useState();
  const [pdfLink, setPdfLink] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [mypdf, setMyPdf] = useState(false);
  const [filename, setFileName] = useState("");
  const [load, setLoad] = useState(false);

  const role =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).role;

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentdate = moment().format('DD/MM/YYYY'); 
  const [{ currentUser }, dispatch] = useStateValue();

  let tableData = data && data.slice(startIndex, endIndex);
  let searchData = searched && searched.slice(startIndex, endIndex);

  function goToPrev() {
    setCurrentPage((page) => page - 1);
  }

  function goToNext() {
    setCurrentPage((page) => page + 1);
  }

  const totalPages = Math.ceil(data && data.length / itemsPerPage);

  useEffect(() => {
    if (searchval == "") {
      getList(skillName);
    }
    getUser();
    setLoad(false);
  }, [skillName, load]);

  const getUser = async () => {
    if (currentUser) {
      setUser(currentUser);
      setImg(currentUser.img);
      return;
    }
    let result = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setImg(result.img);
    setUser(result);

    dispatch({
      type: "INIT_USER",
      item: result,
    });
  };

  function handleChange(e) {
    setLink(false);
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPdfFile(e.target.files[0]);
    setMyPdf(true);
    setPdfLink("");
    setFileName(e.target.files[0].name);
  }

  const handleClose = () => {
    setTitle("");
    setFile("");
    setPdfFile("");
    setPdfLink("");
    setFileName("");
    setLink(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const AddResource = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    if (pdfFile) {
      formData.append("file", pdfFile);
      formData.append("title", title);
      formData.append("skill", skillName);

      const response = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      const responseWithBody = await response.json();
      if (responseWithBody) toast.dark(responseWithBody);
      setLoading(false);
      setTitle("");
      setFile("");
      setPdfFile("");
      setPdfLink("");
      setFileName("");
      setLink(false);
      setShow(false);
      setTimeout(() => {
        setLoad(true);
      }, 5000);

      // window.location.href = '/rescourcesDisplay';
    } else if (pdfLink) {
      const val = {
        title: title,
        url: pdfLink,
        skill: skillName,
      };

      const response = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/linkUpload`, {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      });

      const responseWithBody = await response.json();
      if (responseWithBody) toast.dark(responseWithBody);

      setLoading(false);
      setTitle("");
      setFile("");
      setPdfFile("");
      setPdfLink("");
      setFileName("");
      setLink(false);
      setShow(false);
      setTimeout(() => {
        setLoad(true);
      }, 2000);

      // window.location.href = '/rescourcesDisplay';
    }
  };

  const getList = async (skillName) => {
    // console.log("l,mnuhgftr");
    setLoading2(true);
    let result = await fetch(
      `https://club-community-feedbox2-0-sdcn.vercel.app/getAllResource/${skillName}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    result = await result.json();
    console.log(result);
    setData(result);
    setDuplicateData(result);
    setLoading2(false);
  };

  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    if (e.target.value !== "") {
      let matched = [];
      duplicateData.length > 0 &&
        duplicateData.forEach((user) => {
          const value = user.title.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setData(matched);
      setCurrentPage(1);
    } else {
      setData(duplicateData);
    }
  };

  const changeTitle = (e) => {
    e.preventDefault();
    const filteredValue = e.target.value.replace(/[^0-9a-zA-Z-_\s]/g, "");
    setTitle(filteredValue);
  };

  const handleDeleteClick = (id, driveId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this resource?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const _id = { _id: id, driveId };
        const deleteCall = await fetch(
          `https://club-community-feedbox2-0-sdcn.vercel.app/delete/Resource/pdf`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(_id),
          }
        );

        const response = await deleteCall.json();

        const updatedData = data.filter((item) => {
          return item._id !== id;
        });


        setData(updatedData);

        Swal.fire("Deleted!", response, "success");
      }
    });
  };

  console.log(data);
  return (
    <>
      <div className="Res-table-display pt-[60px] md:pt-[100px]">
        <div className="RescourcesTable">
          <div className="res-table-heading">
            <div className="res-heading-left"> {skillName} Documents </div>
            <div className="res-heading-right">
              <div className="form-inline my-2 my-lg-0 res-table-search">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  value={searchval}
                  onChange={searchHandler}
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>

              {role !== "Club_Member" ? (
                <button
                  onClick={handleShow}
                  className="btn btn-primary res-add-btn"
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                </button>
              ) : (
                ""
              )}

              {/* modal popup to add rescources  */}

              <Modal
                show={show}
                onHide={handleClose}
                className="profile-section-overall"
              >
                <form onSubmit={AddResource} encType="multipart/form-data">
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      <div className="res_modal_header">Add Resource</div>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-body">
                    <div className="modal-profile-section">
                      <div className="modal-profile-section-image">
                        <img src={img} alt="" />
                      </div>
                      <div className="modal-add-res-section-profile relative bottom-2">
                        <h5>{user && user.name}</h5>
                        <p className="text-gray-500 bottom-3 relative pl-3 text-[0.8rem] font-[600]">
                          {" "}
                          {skillName}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="res-add-modal-title">
                      <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        name="title"
                        onChange={changeTitle}
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="modal-footer">
                    <div className="res-add-modal-footer">
                      <div className="res-add-modal-footer-upload">
                        Upload :{" "}
                      </div>
                      <div>
                        <label for="files" className="btn">
                          <FontAwesomeIcon
                            icon={faFile}
                            className="fa-xl"
                          ></FontAwesomeIcon>
                        </label>
                        <input
                          id="files"
                          style={{ display: "none" }}
                          type="file"
                          name="file"
                          onChange={handleChange}
                          accept=".pdf"
                        />
                      </div>

                      <div
                        className="modal-footer-link"
                        onClick={() => {
                          setLink(true);
                          setMyPdf(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faChain} className="fa-xl" />
                      </div>

                      {link && !mypdf ? (
                        <div className="add-res-add-link">
                          <input
                            type="text"
                            placeholder="Enter Link"
                            value={pdfLink}
                            onChange={(e) => setPdfLink(e.target.value)}
                            name="pdfLink"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {mypdf && !link ? (
                        <div className="w-fit text-[.8rem] mt-2">
                          {filename}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      <Button
                        className="btn btn-primary"
                        type="submit"
                        variant="primary"
                        disabled={title && (fileu || pdfLink) ? false : true}
                      >
                        {loading ? (
                          <div
                            className="spinner-border text-white"
                            role="status"
                            style={{
                              height: "15px",
                              width: "15px",
                              marginLeft: "2px",
                            }}
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <div>Add</div>
                        )}
                      </Button>
                    </div>
                  </Modal.Footer>
                </form>
              </Modal>
              <ToastContainer />
            </div>
          </div>

          {/* table to display rescources */}

          <div>
            <div className="overflow-x-auto p-3">
              <table className="table-auto w-full">
                <thead className="uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2">
                      <div className="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">
                        Download
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">
                        Resource Title
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">
                        Created{" "}
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-[500] text-[.7rem] md:text-[1rem]  lg:text-[1.05rem]  text-left">
                        Author
                      </div>
                    </th>
                  </tr>
                </thead>

                {!loading2 ? (
                  <tbody className="text-sm divide-y divide-gray-100">
                    {tableData && tableData.length > 0 ? (
                      tableData.map((item) => (
                        <tr key={item._id}>
                          <td className="p-2">
                            <a
                              href={item && item.url}
                              target="_blank"
                              className="text-black"
                            >
                              {item.type == "pdf" ? (
                                <FontAwesomeIcon
                                  icon={faFileInvoice}
                                  className="w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faChain}
                                  className="w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                />
                              )}
                            </a>
                          </td>
                          <td className="p-2">
                            <div className="font-[500] text-[1rem] text-black">
                              {item && item.title}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-left text-blue-600 font-[500] text-[1rem]">
                              {item &&
                                item.date &&
                                currentdate
                                
                                }
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-left text-black font-[500] text-[1rem]">
                              {item && item.author && item.author.name}
                            </div>
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="w-5 h-5 hover:text-red-600 rounded-full hover:bg-gray-100 p-1"
                              onClick={() =>
                                handleDeleteClick(item._id, item.driveId)
                              }
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colspan="4">
                          <div className="p-6 text-center">
                            No Resources Added yet !
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td className="w-full" colspan="4">
                        <div
                          role="status"
                          class=" w-full  p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                        >
                          <div class="flex items-center justify-between">
                            <div>
                              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                          </div>
                          <div class="flex items-center justify-between pt-4">
                            <div>
                              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                          </div>
                          <div class="flex items-center justify-between pt-4">
                            <div>
                              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                          </div>
                          <div class="flex items-center justify-between pt-4">
                            <div>
                              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                              <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                          </div>
                          {/* <div class="flex items-center justify-between pt-4">
                      <div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div> */}
                          <span class="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <div className="res-navigation">
              <div></div>
              {tableData && tableData.length > 0 ? (
                <nav className="d-flex">
                  <ul className="res-paginate">
                    <button
                      onClick={goToPrev}
                      className="prev"
                      disabled={currentPage === 1}
                    >
                      <GrFormPrevious size="25" />
                    </button>
                    <p className="nums">
                      {tableData && tableData.length > 0
                        ? `${currentPage}/${totalPages}`
                        : "0/0"}
                    </p>
                    <button
                      onClick={goToNext}
                      className="prev"
                      disabled={currentPage >= totalPages}
                    >
                      <GrFormNext size="25" />
                    </button>
                  </ul>
                </nav>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RescourcesTable;
