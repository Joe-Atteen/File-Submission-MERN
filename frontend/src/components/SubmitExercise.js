import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function SubmitExercise(props) {
  const [topic, setTopic] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `https://submit-ettu.onrender.com/files`,
        { topic, screenshot, link },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.localStorage.setItem("data", JSON.stringify(data.data));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Exercise uploaded successfully!",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.log(error);
    }

    window.location.reload(false);

    setTopic("");
    setScreenshot("");
    setLink("");

    props.onCancel();
  };

  function Close() {
    props.onCancel();
  }

  return (
    <div className="submitex">
      <h2>Submit Exercise</h2>
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
        <button onClick={handleSubmit}>Upload</button>
      </form>
    </div>
  );
}

export default SubmitExercise;
