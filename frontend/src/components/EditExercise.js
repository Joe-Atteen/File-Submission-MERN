import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditExercise(props) {
  const [topic, setTopic] = useState(props.fileInfo.topic);
  const [screenshot, setScreenshot] = useState("");
  const [link, setLink] = useState(props.fileInfo.link);
  const [id, setId] = useState(props.fileInfo._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.put(
        "https://submit-ettu.onrender.com/files",
        { topic, screenshot, link, id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data.message);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Exercise updated successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }

    setTopic("");
    setScreenshot("");
    setLink("");
    setId("");

    props.onCancel();
  };

  function Close() {
    props.onCancel();
  }

  return (
    <div className="editex">
      <form action="/files" method="POST" encType="multipart/form-data">
        <div className="close-btn" onClick={Close}>
          <p>X</p>
        </div>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />
        <input
          type="file"
          name="image"
          placeholder="Enter your screenshot"
          value={screenshot}
          onChange={(e) => setScreenshot(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={handleSubmit}>Update</button>
      </form>
    </div>
  );
}

export default EditExercise;
