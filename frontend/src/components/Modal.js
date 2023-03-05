import React, { useState } from "react";
import Background from "./Background";
import SubmitExercise from "./SubmitExercise";
import AllExercises from "./AllExercises";

function Modal() {
  const [formIsOpen, setFormIsOpen] = useState(false);

  function openForm() {
    setFormIsOpen(true);
  }

  function closeForm() {
    setFormIsOpen(false);
  }

  return (
    <div>
      <AllExercises onClick={openForm} />
      {formIsOpen && <Background />}
      {formIsOpen && <SubmitExercise onCancel={closeForm} />}
    </div>
  );
}

export default Modal;
