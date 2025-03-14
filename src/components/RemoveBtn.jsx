import React from "react";
import styles  from '../styles/RemoveBtn.module.css'; 

const RemoveBtn = ({  handleClick }) => {
  return <button className={styles.btn} onClick={handleClick}>X</button>; // Fix: Corrected `onCLick` to `onClick`
};

export default RemoveBtn;