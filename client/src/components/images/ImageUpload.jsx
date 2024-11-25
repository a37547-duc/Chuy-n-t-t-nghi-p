import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";

const ImageUpload = ({ onUpload, onRemove, existingImages = [] }) => {
  const [urls, setUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setUrls(existingImages);
  }, [existingImages]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setUploading(true);
      const uploadPromises = acceptedFiles.map((file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(storageRef, file).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        );
      });
      Promise.all(uploadPromises)
        .then((downloadedUrls) => {
          const newUrls = [...urls, ...downloadedUrls];
          setUrls(newUrls);
          downloadedUrls.forEach((url) => onUpload(url));
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        })
        .finally(() => {
          setUploading(false);
        });
    },
    [onUpload, urls]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleRemoveImage = (index) => {
    const removedUrl = urls[index];
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
    onRemove(removedUrl);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 ${
          isDragActive ? "bg-gray-200" : "bg-white"
        } text-center`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Thả file vào đây...</p>
        ) : (
          <p>Kéo và thả file hoặc click để chọn file (có thể chọn nhiều ảnh)</p>
        )}
      </div>

      {uploading && (
        <div className="mt-4 text-center text-blue-500">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
          Đang tải ảnh lên, vui lòng chờ...
        </div>
      )}

      {urls.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-4 mt-5">
            {urls.map((url, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover"
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1"
                  size="xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
