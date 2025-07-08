
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import Home from './Home';


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timedOut, setTimedOut] = useState(false);

  const navigate = useNavigate();



// Fetch questions from Google Sheets API


useEffect(() => {
  const fetchSheet = async () => {
    try {
      const res = await fetch("https://sheetdb.io/api/v1/zjucaf96or4c4");
      const data = await res.json();

      // Shuffle questions for each user
      function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
      }
      const formatted = data.map(item => ({
        question: item.question,
        options: shuffle([item.option1, item.option2, item.option3, item.option4]),
        answer: item.answer
      }));
      setQuestions(shuffle(formatted));
    } catch (err) {
      console.error("Error fetching sheet data:", err);
    }
  };

  fetchSheet();
}, []);



  // Timer effect
  useEffect(() => {
    if (showScore || selected) return;
    setTimer(30);
    setTimedOut(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimedOut(true);
          setSelected("__timeout__");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currIndex, showScore]);

  const handleOptionClick = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === questions[currIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected("");
    setTimedOut(false);
    setTimer(30);
    if (currIndex + 1 < questions.length) {
      setCurrIndex(currIndex + 1);
    } else {
      setShowScore(true);
      // Save quiz result to localStorage
      const prevResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      const newResult = {
        date: new Date().toLocaleString(),
        score: score + (selected === questions[currIndex].answer ? 1 : 0),
        total: questions.length
      };
      localStorage.setItem('quizResults', JSON.stringify([...prevResults, newResult]));
    }
  };
  if (questions.length === 0) return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100" >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  // Progress calculation
  const progress = ((currIndex) / questions.length) * 100;

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-4">
      <div className="w-100" style={{maxWidth: 500}}>
        <h2 className="text-center mb-4">React Quiz</h2>
        {/* Progress Bar */}
        {!showScore && (
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span>Question {currIndex + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="progress" style={{height: 8}}>
              <div className="progress-bar bg-success" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        )}
        {showScore ? (
          <div className="card shadow p-4 text-center">
            <h3 className="mb-3">Quiz Finished!</h3>
            <p className="fs-4">Your Score: <span className="fw-bold">{score}</span> / {questions.length}</p>
            <button className="btn btn-primary px-4" onClick={()=>navigate("/")}>Home</button>
          </div>
        ) : (
          <div className="card shadow p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">{currIndex + 1}. {questions[currIndex].question}</h5>
              <span className={`badge rounded-pill ${timer <= 5 ? 'bg-danger' : 'bg-primary'}`} style={{fontSize: '1rem', minWidth: 48}}>
                {timer}s
              </span>
            </div>
            <div className="row g-3">
              {questions[currIndex].options.map((opt, idx) => (
                <div className="col-12 col-md-6" key={idx}>
                  <button
                    className={`btn w-100 py-2 ${selected === opt ? 'btn-primary' : 'btn-outline-primary'}`}
                    style={{fontWeight: 500, fontSize: '1rem', transition: '0.2s'}}
                    onClick={() => handleOptionClick(opt)}
                    disabled={!!selected}
                  >
                    {opt}
                  </button>
                </div>
              ))}
            </div>
            {timedOut && !selected && (
              <div className="alert alert-warning mt-3">Time's up! No answer selected.</div>
            )}
            {selected && (
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-success px-4" onClick={handleNext}>Next</button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default Quiz;
