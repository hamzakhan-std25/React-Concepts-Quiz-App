import React from "react";

export default function PreviousQuizzes() {
  const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Previous Quizzes Results</h2>
      {results.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Score</th>
                <th>Total Questions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{r.date}</td>
                  <td>{r.score}</td>
                  <td>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
