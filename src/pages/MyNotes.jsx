import { useEffect, useState } from "react";

function MyNotes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/notes")
            .then(res => res.json())
            .then(data => setNotes(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>My Notes</h1>

            {notes.map(note => (
                <div key={note._id}>
                    <h3>{note.title}</h3>
                    <p>{note.fileName}</p>
                </div>
            ))}
        </div>
    );
}

export default MyNotes;