import { useState } from "react";
import conf from "../conf/conf";

const UploadForm = ({ onUploadSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !url.endsWith(".glb")) {
      setError("Please provide a valid model name and a .glb file URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(conf.bkurl+'/models', fromData);
      console.log(response);
      if (!response.ok) throw new Error("Failed to upload model");

      setName("");
      setDescription("");
      setUrl("");
      onUploadSuccess(); // Refresh model list
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload 3D Model</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Model Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Model Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          placeholder="Model .glb URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
