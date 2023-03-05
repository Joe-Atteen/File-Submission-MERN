import React from "react";
import edit from "../images/icons8-edit-file-80.png";
import "../css/edit-btn.css";

function EditButton({ onClick }) {
  function openEditForm() {
    onClick();
  }

  return (
    <div className="edit">
      <button onClick={openEditForm}>
        <img src={edit} alt="" />
      </button>
    </div>
  );
}

export default EditButton;
