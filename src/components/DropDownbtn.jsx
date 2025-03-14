"use client";

import React, { createContext, useContext, useState } from "react";
import styles from "../styles/dropdownBtn.module.css";
import Link from "next/link";

// Create a context for managing dropdown state
const DropDownContext = createContext();

const DropDownbtn = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown open/close
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <DropDownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div className={styles.dropdown}>{children}</div>
    </DropDownContext.Provider>
  );
};

const Header = ({ children }) => {
  const { toggleDropdown } = useDropDownContext();

  return (
    <button className={styles.dropdownHeader} onClick={toggleDropdown}>
      {children}
    </button>
  );
};

const Items = ({ items }) => {
  const { isOpen } = useDropDownContext();

  return (
    <div className={`${styles.dropdownItems} ${isOpen ? styles.open : ""}`}>
      {items.map((item, index) => (
        <button key={index} className={styles.dropdownItem}>
         <Link style={{color:"black",textDecoration:"none"}} href={item.link}>{item.name}</Link>
        </button>
      ))}
    </div>
  );
};

const useDropDownContext = () => useContext(DropDownContext);

export { DropDownbtn, Header, Items, useDropDownContext };
