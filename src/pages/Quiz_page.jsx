// import React from 'react'
// import { useEffect } from 'react';

// export default function Quiz_page() {

//   // load questions from google sheet..
//   // when page is loaded first time
//   useEffect(() => {
//     fetch("https://sheetdb.io/api/v1/zjucaf96or4c4")
//       .then(res => res.json())
//       .then(data => {
//         console.log("Quiz Data:", data); // Use this to build your quiz
//       });
//   }, []);


// // add question to the google sheet that can use after

//   function post_data(){
//     fetch("https://sheetdb.io/api/v1/zjucaf96or4c4", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     data: {
//       question: "What is JSX?",
//       option1: "A template engine",
//       option2: "React syntax extension",
//       option3: "Browser API",
//       option4: "Java compiler",
//       answer: "React syntax extension"
//     }
//   })
// })
// .then(res => res.json())
// .then(data => console.log("Added:", data));

//   }




//   return (
//     <div>
//       Quiz page...

  
//       <button onClick={post_data}>post data</button>
//     </div>
//   )
// }


//-----------------------------------------
import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

useEffect(() => {
  const fetchSheet = async () => {
    try {
      const res = await fetch("https://sheetdb.io/api/v1/zjucaf96or4c4");
      const data = await res.json();
      console.log("Google Sheets API data:", data);

      // Use data as-is
      const formatted = data.map(item => ({
        question: item.question,
        options: [item.option1, item.option2, item.option3, item.option4],
        answer: item.answer
      }));

      setQuestions(formatted);
    } catch (err) {
      console.error("Error fetching sheet data:", err);
    }
  };

  fetchSheet();
}, []);


  const handleOptionClick = (option) => {
    setSelected(option);
    if (option === questions[currIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected("");
    if (currIndex + 1 < questions.length) {
      setCurrIndex(currIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>React Quiz</h2>
      {showScore ? (
        <h3>Your Score: {score} / {questions.length}</h3>
      ) : (
        <div>
          <h4>{currIndex + 1}. {questions[currIndex].question}</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {questions[currIndex].options.map((opt, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleOptionClick(opt)}
                  style={{
                    backgroundColor: selected === opt ? '#ddd' : '#f0f0f0',
                    padding: '10px',
                    width: '100%',
                    marginBottom: '10px'
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
          {selected && <button onClick={handleNext}>Next</button>}
        </div>
      )}
    </div>
  );
};

export default Quiz;
