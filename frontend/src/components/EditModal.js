import React, { useState } from "react";
import EditButton from "./EditButton";
import EditExercise from "./EditExercise";

function EditModal({ fileInfo }) {
  const [formIsOpen, setFormIsOpen] = useState(false);

  function openForm() {
    setFormIsOpen(true);
  }

  function closeForm() {
    setFormIsOpen(false);
  }

  return (
    <div>
      {formIsOpen && <EditExercise onCancel={closeForm} fileInfo={fileInfo} />}
      <EditButton onClick={openForm} />
    </div>
  );
}

export default EditModal;
