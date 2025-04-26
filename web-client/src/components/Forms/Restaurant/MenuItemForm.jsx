import React, { useState, useEffect } from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';
import { formatCurrency } from '../../../utils/format-utils/CurrencyUtil';

function MenuItemForm({ isOpen, onClose, mode = 'add', initialData = {}, onSubmit, restaurantID }) {
  const [formData, setFormData] = useState({
    id: mode === 'edit' ? initialData.id : null,
    name: '',
    category: '',
    description: '',
    estPreparationTime: '',
    sizes: [],
    image: null,
    restaurantID: restaurantID || '',
  });
  const [newSize, setNewSize] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Track index of size-price pair being edited

  // Predefined categories and sizes
  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages'];
  const sizeOptions = ['Small', 'Regular', 'Large'];

  // Populate form with initial data in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        category: initialData.category || '', // Assumes category is a string; backend maps to ObjectId
        description: initialData.description || '',
        estPreparationTime: initialData.estPreparationTime || '',
        sizes: initialData.sizes || [],
        image: null, // Image is not pre-filled (user can upload a new one)
        restaurantID: restaurantID || initialData.restaurantID || '',
      });
    }
  }, [mode, initialData, restaurantID]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'estPreparationTime' ? parseFloat(value) || '' : value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Add or update size-price pair
  const handleSizePriceAction = () => {
    if (newSize && newPrice) {
      if (editingIndex !== null) {
        // Update existing size-price pair
        setFormData((prev) => ({
          ...prev,
          sizes: prev.sizes.map((size, idx) =>
            idx === editingIndex ? { size: newSize, price: parseFloat(newPrice) } : size
          ),
        }));
        setEditingIndex(null);
      } else {
        // Add new size-price pair
        setFormData((prev) => ({
          ...prev,
          sizes: [...prev.sizes, { size: newSize, price: parseFloat(newPrice) }],
        }));
      }
      setNewSize('');
      setNewPrice('');
    }
  };

  // Edit size-price pair
  const handleEditSizePrice = (index) => {
    const { size, price } = formData.sizes[index];
    setNewSize(size);
    setNewPrice(price.toString());
    setEditingIndex(index);
  };

  // Delete size-price pair
  const handleDeleteSizePrice = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, idx) => idx !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      image: formData.image || initialData.image, // Retain original image if no new one is uploaded
    };
    onSubmit(submitData);
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      id: null,
      name: '',
      category: '',
      description: '',
      estPreparationTime: '',
      sizes: [],
      image: null,
      restaurantID: restaurantID || '',
    });
    setNewSize('');
    setNewPrice('');
    setEditingIndex(null);
    onClose();
  };

  // Return null if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-4xl">
        {/* Title and Close Button */}
        <h3 className="text-xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h3>
        <button
          onClick={onClose}
          className="btn btn-ghost btn-circle absolute right-2 top-2"
        >
          <IoClose size={24} />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Image Upload */}
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <label className="btn btn-ghost btn-sm w-full max-w-xs">
              <span>Choose File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {formData.image ? (
              <p className="mt-2 text-sm text-gray-500">{formData.image.name}</p>
            ) : mode === 'edit' && initialData.image ? (
              <p className="mt-2 text-sm text-gray-500">Current: {initialData.image}</p>
            ) : null}
          </div>

          {/* Column 2: Input Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {/* Note: Backend must map category string to Category ObjectId */}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
            </div>

            {/* Estimated Preparation Time */}
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Preparation Time (minutes)</label>
              <input
                type="number"
                name="estPreparationTime"
                value={formData.estPreparationTime}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="e.g., 10"
                step="1"
              />
            </div>

            {/* Size and Price Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">Size and Price</label>
              <div className="flex flex-col gap-2">
                {/* Row 1: Size, Price, Add/Update Button */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="select select-bordered w-full sm:w-1/3"
                  >
                    <option value="" disabled>
                      Select Size
                    </option>
                    {sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="input input-bordered w-full sm:w-1/3"
                    placeholder="Price (LKR)"
                    step="0.01"
                  />
                  <button
                    type="button"
                    onClick={handleSizePriceAction}
                    className="btn btn-accent btn-sm flex items-center gap-2"
                  >
                    <IoAdd size={20} />
                    {editingIndex !== null ? 'Update' : 'Add'}
                  </button>
                </div>

                {/* Row 2: Size-Price Table */}
                {formData.sizes.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="table table-xs">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Price (LKR)</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.sizes.map((size, idx) => (
                          <tr key={idx}>
                            <td>{size.size}</td>
                            <td>{formatCurrency(size.price, 'LKR')}</td>
                            <td className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => handleEditSizePrice(idx)}
                                className="btn btn-ghost btn-xs text-xs"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSizePrice(idx)}
                                className="btn btn-ghost btn-xs text-xs"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Submit and Cancel Buttons */}
        <div className="modal-action mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-ghost btn-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-sm"
          >
            {mode === 'edit' ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItemForm;