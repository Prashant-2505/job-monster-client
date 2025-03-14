"use client";
import React, { useState } from "react";
import styles from "../../../../styles/register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../../../lib/store/features/auth/authSlice";

const Register = ({ as }) => {
  console.log(as)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = as;
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role}),
    };

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/candidate/signUp",
        options
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Sign up failed");
      }

      console.log(result);

      alert("Sign up successful");
      router.push(`/profile/${as}`);

      const { user, token } = result;
      dispatch(login({ user, token }));

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.inner}>
        <h3>Welcome back</h3>
        <p>Sign up to create your account</p>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <button type="submit">{loading ? "Loading..." : "Sign up"}</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <span>Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
