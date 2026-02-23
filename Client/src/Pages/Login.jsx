import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/Api";
import "../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await login({ email, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      if (res.user.role_id === 1) {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
<div className="login-container">
  <div className="login-card">
    <h2 className="login-title">Login</h2>

    <form onSubmit={handleSubmit}>
      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="password-wrapper">
        <input
          className="login-input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <div className="login-options">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
      </div>

      {error && <p className="login-error">{error}</p>}

      <button className="login-btn" type="submit">
        Log in
      </button>
    </form>
  </div>
</div>

  );
};

export default Login;
