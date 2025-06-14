import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    const ProdURL = "https://pdf-extractor-api-b7r9.onrender.com/extract";
    const LocalURL = "http://localhost:8000/extract";

    try {
      const res = await fetch(ProdURL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setOutput(data);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload or extract data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📄 PDF Data Extractor</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const selected = e.target.files[0];
          if (selected && selected.type !== "application/pdf") {
            alert("Only PDF files allowed");
            return;
          }
          setFile(selected);
        }}
      />

      <br />
      <br />
      <button onClick={handleUpload}>Upload & Extract</button>

      {loading && <p>Loading...</p>}

      {output && (
        <pre
          style={{ marginTop: "2rem", background: "#f4f4f4", padding: "1rem" }}
        >
          {JSON.stringify(output, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
