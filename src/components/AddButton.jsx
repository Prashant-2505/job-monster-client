import React from "react";

const AddButton = ({ text, handleClick }) => {
  return <button className= "add_btn" onClick={handleClick}>{text}</button>;
};

export default AddButton;
