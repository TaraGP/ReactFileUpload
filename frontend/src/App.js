import React, { useState } from 'react';

function App() {
  const [fileCount, setFileCount] = useState(1);
  const [files, setFiles] = useState([]);

  const handleFileCountChange = (event) => {
    setFileCount(Number(event.target.value));
  };

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileCount">Number of files to upload:</label>
          <input
            type="number"
            id="fileCount"
            name="fileCount"
            min="1"
            value={fileCount}
            onChange={handleFileCountChange}
            required
          />
        </div>
        <div id="fileInputs">
          {[...Array(fileCount)].map((_, index) => (
            <div key={index}>
              <label htmlFor={`file${index}`}>Upload File {index + 1}:</label>
              <input
                type="file"
                id={`file${index}`}
                name={`file${index}`}
                onChange={(e) => handleFileChange(index, e)}
                title={`Choose file ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <input type="submit" value="Upload!" />
        </div>
      </form>
    </div>
  );
}

export default App;
