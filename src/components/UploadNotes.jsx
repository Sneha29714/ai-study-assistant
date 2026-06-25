import { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { IoSaveOutline } from "react-icons/io5";
import ActionCard from "./ActionCard";
import { useNavigate } from "react-router-dom";

function UploadNotes() {
  const navigate=useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <section className="section-header">
      <div className="section-tag">Upload Notes</div>
      <h2>Transform Your Notes Into Study Material</h2>
      <p className="subtitle">
        Upload your notes and instantly generate summaries,
        flashcards,quizzes, and more.
      </p>
    <div className="upload-box">
  <div className="upload-icon">📄</div>

  <h2>Upload Your Notes</h2>

  <p>Drag & drop your files here</p>

  <label htmlFor="file-upload" className="upload-btn">
    Browse Files
  </label>

  <input
    id="file-upload"
    type="file"
    onChange={handleFileChange}
    hidden
  />

  {file && (
    <div className="notes-actions">
          <p className="success-msg">
            ✓ {file.name} uploaded successfully
          </p>

          <h3>What would you like to do with these notes?</h3>

          <div className="action-grid">
            <ActionCard
              icon={<FaRegFileAlt />}
              title="Generate Summary"
              description="Get concise AI-generated notes"
              onClick={() => navigate("/summary")}
            />

            <ActionCard
              icon={<BsCardText />}
              title="Create Flashcards"
              description="Study using smart flashcards"
              onClick={() => navigate("/flashcard")}
            />

            <ActionCard
              icon={<MdQuiz />}
              title="Generate Quiz"
              description="Test your understanding"
              onClick={() => navigate("/quiz")}
            />
            <ActionCard
              icon={<IoSaveOutline />}
              title="Save Notes"
              description="Store notes for later"
            />
          </div>
    </div>
  )}

</div>
</section>
  );
}

export default UploadNotes;