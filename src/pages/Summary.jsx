import "./Summary.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Summary() {
    const { id } = useParams();

    const [note, setNote] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/note/${id}`
            );

            setNote(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    if (!note) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <IoArrowBack
            size={30}
            onClick={() => navigate("/my-notes")}
            style={{ cursor: "pointer" }}
            />
            <div className="summary-container">
                
                <h1>{note.title}</h1>

                <hr />

                <h2>Summary</h2>

                <p>
                    {note.summary || "Summary has not been generated yet."}
                </p>

            </div>
        </>
    );
}

export default Summary;