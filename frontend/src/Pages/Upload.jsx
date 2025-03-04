import UploadForm from "../Components/UploadForm";

const Upload = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload 3D Model</h1>
      <UploadForm onUploadSuccess={() => {}} />
    </div>
  );
};

export default Upload;
