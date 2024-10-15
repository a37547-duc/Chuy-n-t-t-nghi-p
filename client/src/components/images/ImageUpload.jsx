import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ImageUpload = ({ onUpload }) => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setIsLoading(true);
    const uploadedImages = [];
    const uploadPromises = acceptedFiles.map((file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      return uploadBytes(storageRef, file).then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
          uploadedImages.push({ file, downloadURL });
          onUpload(downloadURL);
          return downloadURL;
        });
      });
    });

    Promise.all(uploadPromises).then((downloadedUrls) => {
      setImages((prevImages) => [...prevImages, ...acceptedFiles]);
      setUrls((prevUrls) => [...prevUrls, ...downloadedUrls]);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 ${isDragActive ? "bg-gray-200" : "bg-white"} text-center`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Thả file vào đây...</p>
        ) : (
          <p>Kéo và thả file hoặc click để chọn file (có thể chọn nhiều ảnh)</p>
        )}
      </div>

      {isLoading && <p className="mt-4 text-blue-500">Đang tải hình ảnh...</p>} {/* Hiển thị loading */}

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
