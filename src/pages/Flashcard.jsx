import { useState } from "react";
import "./Flashcard.css";

function Flashcard(){
    const flashcard=[
        {
            question:"What is CPU Scheduling?",
            answer:"The process of selecting of selecting the next process to execute.",
        },
        {
            question: "What is FCFS?",
            answer: "First Come First Serve scheduling algorithm.",
        },
        {
            question: "What is Round Robin?",
            answer: "A scheduling algorithm using time slices.",
        },
    ];   
      return (
    <section className="flashcard-page">
      <div className="section-header">
        <div className="section-tag">Flashcards</div>

        <h2>AI Generated Flashcards</h2>

        <p>Click a flashcard to reveal the answer.</p>
      </div>

      <div className="flashcard-grid">
        {flashcard.map((card, index) => (
          <FlashCardItem key={index} card={card} />
        ))}
      </div>
    </section>
  );
}

function FlashCardItem({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flashcard"
      onClick={() => setFlipped(!flipped)}
    >
      {flipped ? (
        <p>{card.answer}</p>
      ) : (
        <h3>{card.question}</h3>
      )}
    </div>
  );
}

export default Flashcard;
    

