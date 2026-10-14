
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Progress.css";

function Progress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/progress/dashboard"
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching progress:", err);
        setError(
          "Could not load your progress. Please check that the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return <section className="progress-page"><h2>Loading progress...</h2></section>;
  }

  if (error) {
    return (
      <section className="progress-page">
        <h2>Student Progress</h2>
        <p className="progress-error">{error}</p>
        <button
          className="progress-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </section>
    );
  }

  const trend = data.scoreTrend || [];
  const recentAttempts = data.recentAttempts || [];

  return (
    <section className="progress-page">
      <header className="progress-header">
        <div>
          <p className="progress-tag">YOUR LEARNING OVERVIEW</p>
          <h1>Student Progress</h1>
          <p>Track your quiz performance and keep improving.</p>
        </div>

        <Link to="/my-notes" className="progress-button">
          Go to My Notes
        </Link>
      </header>

      <div className="progress-stats">
        <article className="progress-stat">
          <span>Total Attempts</span>
          <h2>{data.totalAttempts}</h2>
          <p>Quiz submissions</p>
        </article>

        <article className="progress-stat">
          <span>Average Accuracy</span>
          <h2>{data.averageAccuracy}%</h2>
          <p>Across all questions answered</p>
        </article>

        <article className="progress-stat">
          <span>Best Score</span>
          <h2>
            {data.bestAttempt
              ? `${data.bestAttempt.score}/${data.bestAttempt.totalQuestions}`
              : "—"}
          </h2>
          <p>
            {data.bestAttempt
              ? `${data.bestAttempt.accuracy}% accuracy`
              : "Complete a quiz to get started"}
          </p>
        </article>

        <article className="progress-stat">
          <span>Notes Practised</span>
          <h2>{data.quizzesCompleted}</h2>
          <p>Different notes attempted</p>
        </article>
      </div>

      <div className="progress-panel">
        <h2>Accuracy Trend</h2>
        <p className="progress-muted">
          Your most recent quiz attempts, from oldest to newest.
        </p>

        {trend.length === 0 ? (
          <p>No quiz attempts yet. Take a quiz to see your progress here.</p>
        ) : (
          <div className="trend-chart">
            {trend.map((attempt, index) => (
              <div className="trend-item" key={attempt.id}>
                <div className="trend-bar-area">
                  <span className="trend-value">
                    {attempt.accuracy}%
                  </span>
                  <div
                    className="trend-bar"
                    style={{
                      height: `${Math.max(attempt.accuracy, 3)}%`,
                    }}
                    title={`Attempt ${index + 1}: ${attempt.accuracy}%`}
                  />
                </div>
                <div className="trend-label">
                    {attempt.noteTitle} — Quiz {attempt.topicAttempt}             
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="progress-panel">
        <h2>Recent Quiz Attempts</h2>

        {recentAttempts.length === 0 ? (
          <p>No attempts recorded yet. Complete a quiz to see it here.</p>
        ) : (
          <div className="attempt-list">
            {recentAttempts.map((attempt) => (
              <article className="dashboard-attempt" key={attempt.id}>
                <div className="attempt-info">
                  <h3>{attempt.noteTitle}</h3>
                  <p>
                    {new Date(attempt.attemptedAt).toLocaleString()}
                  </p>
                </div>

                <div className="attempt-result">
                  <strong>
                    {attempt.score}/{attempt.totalQuestions}
                  </strong>
                  <span>{attempt.accuracy}% accuracy</span>
                </div>

                <Link
                  to={`/quiz/${attempt.noteId}`}
                  className="attempt-link"
                >
                  Practise again
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Progress;
