import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Optionally fetch user info (from localStorage or Firebase)

      setUserName(localStorage.getItem('username') || "Guset"  ); // Or use stored name if available
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">🚀 React Quiz App</h1>
      {userName && <h2 className="home-greeting">Welcome, {userName}! 🎉</h2>}

      <p className="home-subtitle">
        Test your React knowledge, track progress, and learn while having fun!
      </p>

      <div className="home-button-group">
        <button
          className="home-btn"
          onClick={() => navigate("/quiz")}
        >
          🎯 Start Quiz
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/results")}
        >
          📊 View Results
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/add-quiz")}
        >
          ➕ Add New Question
        </button>
      </div>

      <div className="home-extra-content">
        <h3>📚 What You'll Learn:</h3>
        <ul>
          <li>💡 Core React Concepts</li>
          <li>🔁 Hooks like useState, useEffect</li>
          <li>🧩 Component Design & Props</li>
          <li>🔐 Routing & Protected Pages</li>
        </ul>

        <h3 style={{ marginTop: "2rem" }}>🔥 Why Try This Quiz?</h3>
        <ul>
          <li>✅ Immediate feedback</li>
          <li>📈 Track progress (soon!)</li>
          <li>🧠 Fun & engaging format</li>
          <li>🚀 Improve your interview prep</li>
        </ul>
      </div>
    </div>
  );
};



export default Home;
