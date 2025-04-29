import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function AddCategory({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category submitted:', formData);
    // Replace with API call to submit category data
    // await fetch('/api/categories', { method: 'POST', body: formData });
    setFormData({ name: '', image: null });
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({ name: '', image: null });
    onClose();
  };

  // Return null if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-lg">
        {/* Title and Close Button */}
        <h3 className="text-xl font-bold mb-4">Add New Category</h3>
        <button
          onClick={onClose}
          className="btn btn-ghost btn-circle absolute right-2 top-2"
        >
          <IoClose size={24} />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <label className="btn btn-ghost btn-sm w-full max-w-xs">
              <span>Choose File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {formData.image && (
              <p className="mt-2 text-sm text-gray-500">{formData.image.name}</p>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;