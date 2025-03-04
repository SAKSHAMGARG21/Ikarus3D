import { useRef, useState } from "react";
import UploadForm from "../Components/UploadForm";
import axios from "axios";
import conf from "../conf/conf";

const Upload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !file || !file.name.endsWith(".glb")) {
      setError("Please provide a valid model name and a .glb file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("image3d", file);

    try {
      const response = await axios.post(conf.bkurl+"/models", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.status !== 200) throw new Error("Failed to upload model");

      setName("");
      setDescription("");
      setFile(null);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload 3D Model</h1>
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
          <div
            className="flex w-full flex-col items-center p-6"
            onClick={() => inputRef.current.click()}
          >
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <p>{file ? file.name : "Click to select a .glb file"}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
