import React, { useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
let supabase = null;
if (SUPABASE_PROJECT_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
}

const ImageUploader = ({ setImageUrl }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.stopPropagation(); // Prevent event from bubbling up to the container
    if (!file) return;
    setLoading(true);

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('eatsy')
      .upload(`uploads/${fileName}`, file);

    if (error) {
      console.error('Upload Error:', error.message);
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('eatsy')
      .getPublicUrl(`uploads/${fileName}`);

    if (publicUrlData?.publicUrl) {
      setImageUrl(publicUrlData.publicUrl);
    }

    setLoading(false);
  };

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition"
      onClick={handleContainerClick}
    >
      {imagePreview ? (
        <div className="flex justify-center mb-4">
          <img src={imagePreview} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <p className="text-gray-500">Drag & drop an image here or click to select</p>
          <button type="button" className="btn btn-primary btn-sm">
            {loading ? 'Uploading...' : 'Choose Image'}
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {file && (
        <button
          type="button"
          className="btn btn-success btn-sm mt-4"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;