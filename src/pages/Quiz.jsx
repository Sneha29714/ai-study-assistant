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
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // New states for progress tracking
  const [answers, setAnswers] = useState([]);
  const [history, setHistory] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/notes/${id}`
        );

        const rawQuiz = res.data.quiz;
        const quiz =
          typeof rawQuiz === "string"
            ? JSON.parse(rawQuiz || "[]")
            : rawQuiz || [];

        setQuestions(quiz);
        setAnswers(Array(quiz.length).fill(""));
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/notes/${id}/quiz-attempts`
        );
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching quiz history:", err);
      }
    };

    fetchQuiz();
    fetchHistory();
  }, [id]);

  const question = questions[currentQuestion];

  const isCorrect =
    question &&
    selected.trim() === question.correctAnswer?.trim();

  const handleSubmit = () => {
    if (!selected || submitted) return;

    // Remember the answer for this question
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = selected;
      return updated;
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSubmitted(true);
  };

  const handleNext = async () => {
    if (currentQuestion === questions.length - 1) {
      setSaving(true);
      setSaveError("");

      try {
        // Backend calculates and saves the score
        const res = await axios.post(
          `http://localhost:5000/notes/${id}/quiz-attempts`,
          { answers }
        );

        // Update history immediately
        setHistory((prev) => [res.data.attempt, ...prev]);
      } catch (err) {
        console.error("Error saving quiz attempt:", err);
        setSaveError(
          "Your result could not be saved. Please check that the backend is running and try again."
        );
      } finally {
        setSaving(false);
        setFinished(true);
      }

      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelected("");
    setSubmitted(false);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelected("");
    setSubmitted(false);
    setScore(0);
    setAnswers(Array(questions.length).fill(""));
    setFinished(false);
    setSaveError("");
  };

  if (loading) return <h2>Loading Quiz...</h2>;

  if (questions.length === 0) {
    return <h2>No Quiz Available.</h2>;
  }

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <section className="quiz-page">
        <div className="quiz-card">
          <h2>Quiz Completed!</h2>
          <h3>
            Your Score: {score}/{questions.length}
          </h3>
          <p>Accuracy: {percentage}%</p>

          {saving && <p>Saving your result...</p>}

          {saveError && (
            <p className="incorrect-text">{saveError}</p>
          )}

          {!saving && !saveError && (
            <p className="correct-text">
              Your result has been saved!
            </p>
          )}

          <button className="next-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>

        <div className="quiz-card">
          <h2>Quiz Progress History</h2>

          {history.length === 0 ? (
            <p>No previous attempts yet.</p>
          ) : (
            <div className="attempt-history">
              {history.map((attempt) => {
                const percentage = Math.round(
                  (attempt.score / attempt.totalQuestions) * 100
                );

                return (
                  <div className="attempt-item" key={attempt.id}>
                    <h3>
                      Score: {attempt.score}/
                      {attempt.totalQuestions}
                    </h3>
                    <p>Accuracy: {percentage}%</p>
                    <p>
                      Date:{" "}
                      {new Date(
                        attempt.attemptedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-page">
      <div className="section-header">
        <div className="section-tag">Quiz</div>
        <h2>AI Generated Quiz</h2>
        <p>Test your understanding of the uploaded notes.</p>
      </div>

      <div className="quiz-card">
        <h3>
          Question {currentQuestion + 1} of {questions.length}
        </h3>

        <p className="question">{question.question}</p>

        <div className="options">
          {question.options.map((option, index) => {
            let optionClass = "option-btn";

            if (selected === option) {
              optionClass += " selected";
            }

            if (submitted && option === question.correctAnswer) {
              optionClass += " correct";
            } else if (
              submitted &&
              selected === option &&
              !isCorrect
            ) {
              optionClass += " incorrect";
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => setSelected(option)}
                disabled={submitted}
              >
                {option}
              </button>
            );
          })}
        </div>

        {submitted && (
          <p
            className={
              isCorrect ? "correct-text" : "incorrect-text"
            }
          >
            {isCorrect
              ? "Correct answer!"
              : `Incorrect. Correct answer: ${question.correctAnswer}`}
          </p>
        )}

        {!submitted ? (
          <button
            className="next-btn"
            onClick={handleSubmit}
            disabled={!selected}
          >
            Submit Answer
          </button>
        ) : (
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={saving}
          >
            {currentQuestion === questions.length - 1
              ? saving
                ? "Saving Result..."
                : "View Results"
              : "Next Question"}
          </button>
        )}
      </div>
    </section>
  );
}

export default Quiz;