import { useState } from "react";

function UploadNotes() {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="upload-box">
      <h2>Upload Notes</h2>
      <p>Click to select a file</p>
      <input 
      type="file"
      onChange={handleFileChange} 
      />

      {file && (
        <p>Selected File: {file.name}</p>
      )}

    </div>
  );
}

export default UploadNotes;