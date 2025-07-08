
# React Concepts Quiz App

A modern, responsive quiz application built with React, featuring authentication, Google Sheets integration, progress tracking, and a beautiful UI. Perfect for learning, practicing, and testing your React knowledge!

## Features

- **User Authentication**: Only logged-in users can access the app. Login info is stored in localStorage.
- **Responsive Design**: Fully mobile-friendly with a sidebar navigation and modern layout.
- **Quiz Engine**:
  - Questions and options are fetched from a Google Sheet via API.
  - Each user gets questions in a different (random) order.
  - Each question has a 30-second timer.
  - Progress bar and live score during the quiz.
  - Results are saved to localStorage for review.
- **Add Quiz**: Authenticated users can add new questions to the quiz (updates Google Sheet via API).
- **Previous Results**: View all past quiz attempts, including date, score, and total questions.
- **Profile Sidebar**: See your username, email, join date, and quick actions in the sidebar.
- **Protected Routes**: All pages except login are protected; unauthenticated users are redirected to login.


---

## 🌱 What I Learned from This Project

Working on this project helped me solidify and explore several **key areas of modern web development**:

- 📦 **React Fundamentals** — State, props, component architecture, conditional rendering
- 🧠 **React Hooks** — Mastery of `useState`, `useEffect`, and `useNavigate` for dynamic UI and routing
- 🌐 **Client-side Routing** — Protected routes using `react-router-dom`
- 🧾 **Google Sheets as a Database** — Fetching and posting quiz data using a custom API endpoint
- 🔐 **Authentication Flow** — Simple login system using `localStorage` and dynamic UI updates
- 🧰 **Component Reusability** — Created modular, reusable components like `QuizCard`, `Layout`, `ProtectedRoute`
- 🎨 **UI/UX Design** — Built a clean, mobile-friendly interface with dynamic navigation and personalized experience

> 💡 This project greatly improved my **problem-solving, UI design, and real-world React app-building skills**.

---

## 🌍 Live Demo

> ✅ Deployed on **Vercel**  
> 🔗 [Visit App on Vercel](https://react-concepts-quiz-app.vercel.app/)

- Fast ⚡️
- Free Hosting with Custom Domain 🌐
- CI/CD enabled — every push updates the live app!

---

## 💫 Stunning Experience Working on This Project

Building this project was a **joyful and rewarding journey**. Here's why:

- 🚀 It challenged my thinking beyond just syntax — I learned to plan, structure, and optimize.
- 🎯 I designed a quiz experience that’s both educational and engaging.
- 🔄 Replaced static mock data with dynamic Google Sheets integration — **making it real**.
- 💻 I now feel **confident to build full-stack apps** with authentication and cloud data support.
- ❤️ I had fun polishing the layout, animations, and personal touches like greeting the user.

> _This is more than just a quiz — it's a showcase of my growing skills as a front-end developer._

---

## 📌 Tech Stack

- React JS (Vite)
- React Router DOM
- Google Sheets API (via custom API)
- CSS / Inline Styles
- LocalStorage for auth
- Vercel for hosting

---

## Project Structure

```
react-concept-quiz-app/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Quiz_page.jsx
│   │   ├── AddQuiz.jsx
│   │   ├── PreviousQuizzes.jsx
│   │   ├── Login.jsx
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   └── ...
├── package.json
└── README.md
```

## How It Works

- **Login**: Enter username, email, and password. Info is stored in localStorage and used throughout the app.
- **Quiz**: Start a quiz, answer questions (random order), and beat the timer! Progress and score are shown live.
- **Results**: After each quiz, your score and date are saved. View all past results on the Results page.
- **Add Quiz**: Add new questions and options, which are sent to the Google Sheet via API.
- **Sidebar/Profile**: Access navigation, see your info, and log out or log in from anywhere.

## Tech Stack
- React 18+
- React Router v6+
- Bootstrap 5 (CDN)
- Google Sheets API (via SheetDB)
- LocalStorage for auth and results

## Setup & Run

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd react-concept-quiz-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the app:**
   ```bash
   npm start
   ```
4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Customization
- **Google Sheet**: Update the API URL in `Quiz_page.jsx` and `AddQuiz.jsx` to use your own SheetDB endpoint.
- **Styling**: Edit `Home.css`, `index.css`, or component styles for your own look.
- **Authentication**: For production, replace localStorage with a real backend/auth provider.

## Screenshots

> Add screenshots here for Home, Quiz, Results, and Add Quiz pages for best documentation.

## License

MIT License. Free to use and modify.

---

**Made with ❤️ by Hamza Khan**

## 📩 Contact

Want to collaborate, improve, or use this project?

- GitHub: [your-username](https://github.com/hamzakhan-std25)
- Email: hamzakhan.cs25@email.com

---
