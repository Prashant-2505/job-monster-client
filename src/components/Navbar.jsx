"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import { DropDownbtn, Header, Items } from "./DropDownbtn";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../lib/store/features/auth/authSlice"; 

const Navbar = () => {
  const [isClient, setIsClient] = useState(false); // state to track client-side rendering

  const item = [
    { name: "Login as job seeker", link: "/login/job-seeker" },
    { name: "Login as recruiter", link: "/login/recruiter" },
    { name: "Login as interviewer", link: "/login/interviewer" },
  ];

  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true); // Mark component as mounted after client-side rendering.
  }, []);

  if (!isClient) {
    return null; // Prevent rendering during SSR to avoid hydration mismatch
  }

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Clear localStorage
    dispatch(logout()); // Dispatch Redux action to clear user state
  };

  return (
    <div className={styles.navbar}>
      <Link href={"/"}>
        <h1>Job-Monster</h1>
      </Link>
      <div className={styles.list_item}>
        <ul>
          <li>Activity</li>
          <li>Opportunity</li>
          {user && (
            <Link href={`/profile/${user?.role}/${user?.id}`}>
              <li>Profile</li>
            </Link>
          )}
          <li>
            {user ? (
              <button onClick={handleLogout}>Log out</button>
            ) : (
              <DropDownbtn btn="Click Me" dropItem="Item 1">
                <Header>Login as</Header>
                <Items items={item} />
              </DropDownbtn>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
