/* eslint-disable react/prop-types */
// ImageUpload.jsx
import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "firebase/compat/storage";

const ImageUploadOne = ({ onUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    const selectedImage = e.target.files[0];
    if(selectedImage) {
      setImage(selectedImage)
      // Upload ngay khi chọn ảnh
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
      .then(() => {
        // Khi upload hoàn tất, lấy URL của hình ảnh
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            setUrl(downloadURL); // Lưu URL vào state
            console.log("File available at", downloadURL);
            onUploadComplete(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
    }
  };

  // const handleUpload = () => {
  //   if (image) {
  //     const storageRef = ref(storage, `images/${image.name}`);
  //     uploadBytes(storageRef, image)
  //       .then(() => {
  //         // Khi upload hoàn tất, lấy URL của hình ảnh
  //         getDownloadURL(storageRef)
  //           .then((downloadURL) => {
  //             setUrl(downloadURL); // Lưu URL vào state
  //             // onUploadComplete(downloadURL);
  //             console.log("File available at", downloadURL);
  //           })
  //           .catch((error) => {
  //             console.error("Error getting download URL: ", error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading file: ", error);
  //       });
  //   } else {
  //     console.error("No file selected");
  //   }
  // };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {/* <button className="bg-green-500" onClick={handleUpload}>Upload</button> */}
      {url && (
        <div>
          <p>Image uploaded successfully!</p>
          <img
            src={url}
            alt="Uploaded"
            style={{ width: "200px", height: "auto" }}
          />
          <p>
            Image URL:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadOne;