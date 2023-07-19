import React, { useState } from 'react';
import '../../css/style.css';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [targetfiles, setTargetFiles] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTargetFiles(e.target.files[0])
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = targetfiles;
    const formData = new FormData();
    formData.append('image', file);
  
    axios
      .post('/upload', formData)
      .then((response) => {
        console.log(response.data); // File is successfully uploaded and moved
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
    console.log('Upload the selected image:', selectedImage);
  };

  return (
    <div className="image-uploader">
      <div className="file-input-wrapper">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <button onClick={handleImageUpload}>Upload</button>
        )}
      </div>
      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Selected" className="circle-image" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
