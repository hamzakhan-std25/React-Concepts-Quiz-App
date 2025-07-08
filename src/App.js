import React, { useEffect, useState } from "react";
// import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/layout";
import Quiz from "./pages/Quiz_page";
import AddQuiz from "./pages/AddQuiz";
import PreviousQuizzes from "./pages/Results";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      setIsAuth(loggedIn === "true");
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // If you want to protect routes, you can use a ProtectedRoute component

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Layout />
          </ProtectedRoute>
        }
      >

        <Route index element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/results" element={<PreviousQuizzes />} />
      </Route>
    </Routes>
  );
}

export default App;
