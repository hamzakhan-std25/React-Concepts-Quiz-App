// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    // Simulate login and save to localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", form.username);
    localStorage.setItem("email", form.email);
    localStorage.setItem("joinDate", new Date().toLocaleDateString());
    setError("");
    window.location.href = "/";
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow bg-white"
        style={{ minWidth: 320, maxWidth: 400, width: "100%" }}
      >
        <h2 className="mb-4 text-center">Sign In</h2>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
      </form>
    </div>
  );
}

// export default Login;
// Usage in App.js