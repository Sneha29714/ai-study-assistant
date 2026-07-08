import { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { IoSaveOutline } from "react-icons/io5";
import ActionCard from "./ActionCard";
import { useNavigate } from "react-router-dom";

function UploadNotes() {
  const [file, setFile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
  if (selectedOptions.includes(option)) {
    setSelectedOptions(
      selectedOptions.filter((item) => item !== option)
    );
  } else {
    setSelectedOptions([...selectedOptions, option]);
  }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const navigate = useNavigate();

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      navigate("/my-notes");   
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="upload-notes" className="section-header">
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

          <h3>What would you like to generate?</h3>

          <div className="action-grid">
            <ActionCard
              icon={<FaRegFileAlt />}
              title="Generate Summary"
              description="Get concise AI-generated notes"
              onClick={() => toggleOption("summary")}
              selected={selectedOptions.includes("summary")}
            />

            <ActionCard
              icon={<BsCardText />}
              title="Create Flashcards"
              description="Study using smart flashcards"
              onClick={() => toggleOption("flashcard")}
              selected={selectedOptions.includes("flashcard")}
            />

            <ActionCard
              icon={<MdQuiz />}
              title="Generate Quiz"
              description="Test your understanding"
              onClick={() => toggleOption("quiz")}
              selected={selectedOptions.includes("quiz")}
            />
          </div>
          <button className="generate-btn" onClick={uploadFile}>
            Generate
          </button>
    </div>
  )}

</div>
</section>
  );
}

export default UploadNotes;