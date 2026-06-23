import { useState } from "react";

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
    <div className="file-preview">
      ✓ {file.name}
    </div>
  )}
</div>
  );
}

export default UploadNotes;