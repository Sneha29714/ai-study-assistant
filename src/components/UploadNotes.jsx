import { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { IoSaveOutline } from "react-icons/io5";
import ActionCard from "./ActionCard";

function UploadNotes() {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
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
            />

            <ActionCard
              icon={<BsCardText />}
              title="Create Flashcards"
              description="Study using smart flashcards"
            />

            <ActionCard
              icon={<MdQuiz />}
              title="Generate Quiz"
              description="Test your understanding"
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
  );
}

export default UploadNotes;