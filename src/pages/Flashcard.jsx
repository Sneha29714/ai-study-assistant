import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Flashcard.css";

function Flashcard() {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/notes/${id}`
      );
      console.log(res.data);
      // Convert JSON string to array
      const cards = res.data.flashcards
      ? JSON.parse(res.data.flashcards)
      : [];

setFlashcards(cards);

      setFlashcards(cards);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading flashcards...</h2>;
  }

  return (
    <section className="flashcard-page">
      <div className="section-header">
        <div className="section-tag">Flashcards</div>

        <h2>AI Generated Flashcards</h2>

        <p>Click a flashcard to reveal the answer.</p>
      </div>

      <div className="flashcard-grid">
        {flashcards.length > 0 ? (
          flashcards.map((card, index) => (
            <FlashCardItem key={index} card={card} />
          ))
        ) : (
          <p>No flashcards available.</p>
        )}
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