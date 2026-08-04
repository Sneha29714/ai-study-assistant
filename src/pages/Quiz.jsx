import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

function Quiz() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/notes/${id}`
      );

      const quiz = res.data.quiz
        ? JSON.parse(res.data.quiz)
        : [];

      setQuestions(quiz);
    } catch (err) {
      console.error("Error fetching quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Quiz...</h2>;
  }

  if (questions.length === 0) {
    return <h2>No Quiz Available.</h2>;
  }

  const question = questions[currentQuestion];

  return (
    <section className="quiz-page">
      <div className="section-header">
        <div className="section-tag">Quiz</div>

        <h2>AI Generated Quiz</h2>

        <p>Test your understanding of the uploaded notes.</p>
      </div>

      <div className="quiz-card">
        <h3>Question {currentQuestion + 1}</h3>

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
          onClick={() => {
            setSelected("");
            setCurrentQuestion(currentQuestion + 1);
          }}
          disabled={currentQuestion === questions.length - 1}
        >
          Next Question
        </button>
      </div>
    </section>
  );
}

export default Quiz;