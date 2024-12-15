/* eslint-disable react/prop-types */
// ImageUpload.jsx
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "firebase/compat/storage";

const ImageUploadOne = ({ onUploadComplete, existingUrl = "" }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingUrl) {
      setUrl(existingUrl);
    }
  }, [existingUrl]);

  const handleChange = async (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) return;

    setImage(selectedImage)
    setError("");

    try {
      // Upload image
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(storageRef);

      setUrl(downloadURL); // Save URL in state
      onUploadComplete(downloadURL); // Notify parent
      console.log("File available at", downloadURL);
    } catch (uploadError) {
      console.error("Error uploading file: ", uploadError);
      setError("Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-md mx-auto p-5 border border-gray-300 rounded-lg shadow-md">
      {/* Upload Button */}
      <div className="relative">
        <label
          htmlFor="imageUpload"
          className="inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          Chọn ảnh
        </label>
        <input
          id="imageUpload"
          type="file"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 font-medium text-center">{error}</p>
      )}

      {/* Uploaded Image Preview */}
      {url && (
        <div className="text-center flex flex-col items-center">
          <p className="text-green-500 font-semibold mb-2">Ảnh đã tải lên thành công!</p>
          <img
            src={url}
            alt="Uploaded"
            className="w-48 h-auto mt-2 rounded-lg border border-gray-200 mx-auto"
          />
          <p className="mt-3 text-sm text-gray-600">
            URL của ảnh:{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700 transition"
            >
              {url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadOne;
