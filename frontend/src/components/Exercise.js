import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import axios from "axios";
import deletex from "../images/icons8-delete-100.png";
import "../css/edit-btn.css";
import Swal from "sweetalert2";

function Exercise({ fileInfo }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // retrieve items from localStorage and update state
    const storedItems = JSON.parse(localStorage.getItem("data"));
    setItems(storedItems);
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.delete(
        `http://localhost:3001/files/${fileInfo._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Exercise deleted successfully!",
      showConfirmButton: false,
      timer: 3000,
    });
    window.location.reload(false);
  };

  return (
    <div className="card">
      <p id="topic">{fileInfo.topic}</p>
      <p id="screenshot">{fileInfo.screenshot}</p>
      <a href="">
        <p id="link">{fileInfo.link}</p>
      </a>
      <div className="edit-delete">
        <EditModal fileInfo={fileInfo} />
        <div className="delete">
          <button onClick={handleDelete}>
            <img src={deletex} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exercise;
