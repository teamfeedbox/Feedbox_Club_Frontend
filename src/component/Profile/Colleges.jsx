import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { useToasts } from "react-toast-notifications";
import { ToastContainer, toast } from "react-toastify";

const Colleges = () => {
  const [loading1, setLoading1] = useState(false);
  const [load, setLoad] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [addclg, setaddclg] = useState();
  const [allClgs, setAllClgs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newCllg, setNewCllg] = useState();
  const [ids, setIds] = useState();
  const { addToast } = useToasts();
  useEffect(() => {
    getColleges();
    setLoad(false);
  }, [load]);

  // Get all Colleges
  const getColleges = async () => {
    setLoading2(true);
    const data = await fetch(`http://localhost:8000/colleges/get`);
    const res = await data.json();
    setAllClgs(res);
    setLoading2(false);
  };

  const onAddCollege = (e) => {
    setaddclg(e.target.value);
  };

  // Add clg functionality for super admin
  const handleAddSubmit = async (e) => {
    setLoading1(true);
    e.preventDefault();
    if (addclg) {
      let val = {
        name: addclg,
      };
      let data = await fetch(`http://localhost:8000/college/add`, {
        method: "POST",
        body: JSON.stringify(val),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const res = await data.json();
      setaddclg("");
      addToast(res, { appearance: "success" });

      setTimeout(() => {
        setLoad(true);
      }, 2000);
    }
    setLoading1(false);
  };

  const setClicked = (id) => {
    setEdit(true);
    setIds(id);
  };

  const handleUpdateClg = async (index, id) => {
    setClicked(index);
    const data = await fetch(`http://localhost:8000/college/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCllg }),
    });
    const res = await data.json();
    console.log(res);
    setLoad(true);
    setEdit(!edit);
  };

  const updateCllg = (e, index) => {
    setNewCllg(e.target.value);
  };

  return (
    <div className="w-[100%] lg:w-[75%] pb-3">
      {/* add college */}
      <div className="p-2 pt-3 m-auto">
        <form onSubmit={handleAddSubmit}>
          <input
            required
            className="border rounded p-1.5 w-[82%]"
            type="text"
            placeholder="Add College"
            value={addclg}
            onChange={onAddCollege}
          />
          <button
            className=" p-1.5 rounded w-[15%] ml-2 bg-green-600 text-white font-[500] text-[1.05rem] hover:bg-green-800 transition-all ease-linear duration-2000 "
            type="submit"
          >
            {loading1 ? (
              <div
                class="spinner-border text-white"
                role="status"
                style={{ height: "15px", width: "15px", marginLeft: "2px" }}
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div>Add</div>
            )}
          </button>
        </form>
      </div>

      {/* table to display college */}
      {loading2 ? (
        <div
          // className="spinner-border text-black"
          role="status"
          style={{ height: "15px", width: "15px",margin:'auto'}}
        >
          <span className="text-black m-auto">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto p-2">
            <table className="table-auto w-full">
              <thead className=" uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2">
                    <div className="font-[500] text-[0.8rem] text-center">
                      S. No.
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-[500] text-[0.8rem] text-center">
                      College
                    </div>
                  </th>
                  {/* <th className="p-2">
                              <div className="font-[500] text-[0.8rem] text-center">
                                Action
                              </div>
                            </th> */}
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-gray-100">
                {allClgs &&
                  allClgs.length > 0 &&
                  allClgs.map((clg, index) => (
                    <tr>
                      <td className="p-2  w-[15%]">
                        <div className=" text-gray-800 font-[500] text-[1rem] text-center">
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-2 text-center w-[60%]">
                        {edit && index == ids ? (
                          <input
                            type="text"
                            // value={newCllg}
                            onChange={(e) => updateCllg(e, index)}
                            className="text-gray-800 rounded font-[500] text-[1rem] text-center border-2 w-[80%]	p-1"
                          />
                        ) : (
                          <div className=" text-gray-800 font-[500] text-[1rem] text-center">
                            {clg.name}
                          </div>
                        )}
                      </td>
                      {/* <td className="p-2  w-[25%]">
                                  <div className="flex justify-center">
                                    <button onClick={() => handleUpdateClg(index, clg._id)}>
                                      {edit ? (
                                        <button className=" p-1.5 rounded ml-2 bg-green-600 text-white font-[500] text-[1.05rem] hover:bg-green-800 transition-all ease-linear duration-2000 ">
                                          Save
                                        </button>
                                      ) : (
                                        <FontAwesomeIcon
                                          className="w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                          icon={faEdit}
                                        />
                                      )}
                                    </button>
                                  </div>
                                </td> */}
                    </tr>
                  ))}
              </tbody>
              <ToastContainer />
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Colleges;
