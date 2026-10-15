import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyNotes.css";
import Navbar from "../components/Navbar";

function MyNotes() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const res = await axios.get("http://localhost:5000/notes");
        setNotes(res.data);
    };

    const deleteNote = async (id) => {
    try {
        console.log("Deleting:", id);

        await axios.delete(`http://localhost:5000/notes/${id}`);

        setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
        console.log(err);
    }
    };

  const handleSummary = async (note) => {
  try {
    if (!note.summary) {
      await axios.post(
        `http://localhost:5000/notes/${note.id}/summary`
      );
    }

    navigate(`/summary/${note.id}`);
  } catch (err) {
    console.error(err);
  }
  };

  const handleFlashcards = async (note) => {
  try {
    if (!note.flashcards) {
      await axios.post(
        `http://localhost:5000/notes/${note.id}/flashcards`
      );
    }

    navigate(`/flashcard/${note.id}`);
  } catch (err) {
    console.error(err);
  }
  };

  const handleQuiz = async (note) => {
  try {
    if (!note.quiz) {
      await axios.post(
        `http://localhost:5000/notes/${note.id}/quiz`
      );
    }

    navigate(`/quiz/${note.id}`);
  } catch (err) {
    console.error(err);
  }
  };

    return (
        <>
            <br></br><br></br><br></br>
            <div className="notes-container">
  {notes.map((note) => (
    <div className="note-card" key={note.id}>

      <h2 className="note-title">
        {note.title}
      </h2>

      <p className="date">
        Uploaded:
        {" "}
        {new Date(note.uploadedAt).toLocaleDateString()}
      </p>

      <div className="button-group">

        <button className="view-btn" onClick={() =>window.open(`http://localhost:5000/${note.filePath}`, "_blank")}>
          📄 View PDF
        </button>

        <button className="study-btn" onClick={() => handleSummary(note)} >
          {note.summary ? "✔ Summary" : "➕ Summary"}
        </button>

        <button className="study-btn" onClick={() => handleQuiz(note)}>
          {note.quiz?.length ? "✔ Quiz" : "➕ Quiz"}
        </button>

        <button className="study-btn" onClick={() => handleFlashcards(note)}>
          {note.flashcards?.length ? "✔ Flashcards" : "➕ Flashcards"}
        </button>

        <button className="delete-btn" onClick={() => deleteNote(note.id)}>
          🗑 Delete
        </button>

      </div>

                </div>
            ))}
        </div>
    </>
    );
}

export default MyNotes;