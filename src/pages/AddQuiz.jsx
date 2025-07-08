import React, { useState } from "react";

export default function AddQuiz() {
  const [form, setForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: ""
  });

  const [message, setMessage] = useState(" please input all data...");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(form).some(value => value.trim() === "")) {
        setMessage("Please fill all fields.");
        return;
        }
    // Reset message before submission
    
    setMessage(" loading...");
    fetch("https://sheetdb.io/api/v1/zjucaf96or4c4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: form })
    })
      .then(res => res.json())
      .then(() => setMessage("Question added!"))
      .catch(() => setMessage("Error adding question."));
  }

  return (
    <div className="container mt-5">
      <h2>Add Quiz Question</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control m-2" name="question" placeholder="Question" value={form.question} onChange={handleChange} required />
        <input className="form-control m-2" name="option1" placeholder="Option 1" value={form.option1} onChange={handleChange} required />
        <input className="form-control m-2" name="option2" placeholder="Option 2" value={form.option2} onChange={handleChange} required />
        <input className="form-control m-2" name="option3" placeholder="Option 3" value={form.option3} onChange={handleChange} required />
        <input className="form-control m-2" name="option4" placeholder="Option 4" value={form.option4} onChange={handleChange} required />
        <input className="form-control m-2" name="answer" placeholder="Correct Answer" value={form.answer} onChange={handleChange} required />
        <button className="btn btn-success m-2" type="submit">Add Question</button>
      </form>
        <p>{message && <div className="alert alert-info mt-2">{message}</div>}</p>
    </div>
  );
}
