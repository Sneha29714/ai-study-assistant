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
    const selectedFile = e.target.files[0];
    if (selectedFile) {
    setFile(selectedFile);
    uploadFile(selectedFile);
  }
  };

  const navigate = useNavigate();

  
const uploadFile = async (selectedFile) => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("File upload failed");
    }

    const data = await res.json();
    console.log(data);

    navigate("/my-notes");
  } catch (err) {
    console.error(err);
    alert("Upload failed. Please try again.");
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

  <label htmlFor="file-upload" className="upload-btn">
    Browse Files
  </label>

  <input
    id="file-upload"
    type="file"
    accept=".pdf,.png,.jpg,.jpeg,.docx,.ppt,.pptx,.txt"
    onChange={handleFileChange}
    hidden
  />

</div>
</section>
  );
}

export default UploadNotes;