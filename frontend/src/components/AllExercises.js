import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from "./Exercise";
import find from "../images/icons8-find-67.png";

function AllExercises(props) {
  const [files, setFiles] = useState([]);

  function openForm() {
    props.onClick();
  }

  useEffect(() => {
    const getfiles = async () => {
      const token = localStorage.getItem("token");

      try {
        const { data } = await axios.get(
          `https://submit-ettu.onrender.com/files`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFiles(data.data);
        window.localStorage.setItem("data", JSON.stringify(data.data));

        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getfiles();
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("data", JSON.stringify(files));
  // }, [files]);

  // useEffect(() => {
  //   const data = window.localStorage.getItem("data");

  //   setFiles(JSON.parse(data));
  // }, []);

  return (
    <div className="allex">
      <div className="butsearch">
        <div className="but">
          <button className="addex" onClick={openForm}>
            Add Exercise
          </button>
        </div>
        <div className="find">
          <input type="text" placeholder="Search" />
          <div>
            <img src={find} alt="" />
          </div>
        </div>
      </div>
      <div className="cards-container">
        {files.map((file, _id) => {
          return <Exercise key={_id} fileInfo={file} />;
        })}
      </div>
    </div>
  );
}

export default AllExercises;
