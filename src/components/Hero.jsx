function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="tag">
          ✨ Your AI Powered Study Companion
        </p>

        <h1>
          Study Smarter.
          <br />
          Remember <span>Longer.</span>
        </h1>

        <p className="description">
            PrepMate helps you upload notes,take quizzes, and revise with flashcards - all in one place. 
            Designed to boost your focus and supercharge your productivity.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary">Get Started →</button>
          <button className="btn btn-secondary">
            See How It Works
          </button>
        </div>

      </div>


      <div className="hero-card">
        <div className="dashboard">
          <h3>PrepMate Dashboard</h3>

          <div className="stats">
            <div>📚 Notes<br/><b>128</b></div>
            <div>🧠 Quiz<br/><b>35</b></div>
            <div>📝 Cards<br/><b>248</b></div>
          </div>

        </div>
      </div>


    </section>
  )
}

export default Hero;