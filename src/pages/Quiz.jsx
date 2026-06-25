import { useState } from "react";
import "./Quiz.css";

function Quiz() {
  const questions = [
    {
      question: "What is CPU Scheduling?",
      options: [
        "Memory Allocation",
        "Selecting the next process",
        "Disk Management",
        "Process Termination",
      ],
      answer: "Selecting the next process",
    },
    {
      question: "What does FCFS stand for?",
      options: [
        "First Come First Serve",
        "Fast CPU First Service",
        "First CPU First System",
        "File Control First System",
      ],
      answer: "First Come First Serve",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");

  const question = questions[currentQuestion];

  return (
    <section className="quiz-page">
      <div className="section-header">
        <div className="section-tag">Quiz</div>

        <h2>AI Generated Quiz</h2>

        <p>Test your understanding of the uploaded notes.</p>
      </div>

      <div className="quiz-card">
        <h3>
          Question {currentQuestion + 1}
        </h3>

        <p className="question">
          {question.question}
        </p>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {selected && (
          <p className="answer">
            Selected: {selected}
          </p>
        )}

        <button
          className="next-btn"
          onClick={() =>
            setCurrentQuestion(
              currentQuestion + 1
            )
          }
          disabled={
            currentQuestion ===
            questions.length - 1
          }
        >
          Next Question
        </button>
      </div>
    </section>
  );
}

export default Quiz;