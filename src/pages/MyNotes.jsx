import axios from "axios";
import { useEffect, useState } from "react";
import "./MyNotes.css";

function MyNotes() {
    const [notes, setNotes] = useState([]);

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

        await axios.delete(`http://localhost:5000/delete-note/${id}`);

        setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
        console.log(err);
    }
    };

    return (
        <div>
            <h1>My Notes</h1>

            <div className="notes-container">
  {notes.map((note) => (
    <div className="note-card" key={note._id}>

      <h2 className="note-title">
        {note.title}
      </h2>

      <p className="date">
        Uploaded:
        {" "}
        {new Date(note.uploadedAt).toLocaleDateString()}
      </p>

      <div className="button-group">

        <button className="view-btn">
          📄 View PDF
        </button>

        <button className="study-btn">
          {note.summary ? "✔ Summary" : "➕ Summary"}
        </button>

        <button className="study-btn">
          {note.quiz?.length ? "✔ Quiz" : "➕ Quiz"}
        </button>

        <button className="study-btn">
          {note.flashcards?.length ? "✔ Flashcards" : "➕ Flashcards"}
        </button>

        <button className="delete-btn" onClick={() => deleteNote(note._id)}>
          🗑 Delete
        </button>

      </div>

                </div>
            ))}
        </div>
    </div>
    );
}

export default MyNotes;