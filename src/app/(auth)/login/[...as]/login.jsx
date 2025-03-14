"use client";
import React, { useState } from "react";
import styles from "../../../../styles/login.module.css";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../../../lib/store/features/auth/authSlice";


const Login = ({ as }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/candidate/login",
        options
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      const { user, token } = result;
      dispatch(login({ user, token }));
      router.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.inner}>
        <h3>Welcome back</h3>
        <p>Sign in to your account to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eye_icon}
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link href={"/register"}>
            <span>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
