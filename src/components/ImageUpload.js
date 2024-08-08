import React, { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebaseConfig";
import { storage } from "../firebaseConfig";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function (optional)
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          // Complete function
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {url && <img src={url} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;
