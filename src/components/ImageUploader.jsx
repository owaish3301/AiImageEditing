/* eslint-disable react/prop-types */

import { useState } from "react";

export default function ImageUploader({ onImageChange }) {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file)); // Set image preview URL
    onImageChange(file); // Pass file to parent component
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">Upload Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border border-gray-300 p-2 rounded"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 rounded shadow-md w-full max-w-sm mx-auto"
        />
      )}
    </div>
  );
}
