import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../../utils/fetch-utils/customer/fetch-restaurant";
import { useToast } from "../../../utils/alert-utils/ToastUtil";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import { updateMyMenuItem } from "../../../utils/update-utils/restaurant/update-menuItem";
import { createMenuItems } from "../../../utils/create-utils/restaurant/create-menuItems";
import ImageUploader from "../../ImageUploaders/ImageUploader";

function MenuItemForm({
  isOpen,
  onClose,
  mode = "add",
  initialData = {},
  refreshTable = () => {},
}) {
  const toast = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    id: mode === "edit" ? initialData._id : null,
    name: "",
    category: "",
    description: "",
    estPreperationTime: "",
    sizes: [],
    image: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(
          Array.isArray(fetchedCategories) ? fetchedCategories : []
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        id: initialData._id || null,
        name: initialData.name || "",
        category: initialData.category?._id || "",
        description: initialData.description || "",
        estPreperationTime: initialData.estPreperationTime || "",
        sizes: initialData.sizes || [],
        image: initialData.image || "",
      });
    }
  }, [initialData, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "estPreperationTime"
          ? value
            ? parseFloat(value)
            : ""
          : value,
    }));
  };

  const handleSizePriceAction = () => {
    if (newSize && newPrice) {
      const price = parseFloat(newPrice);
      if (isNaN(price)) return;
      if (editingIndex !== null) {
        setFormData((prev) => ({
          ...prev,
          sizes: prev.sizes.map((size, idx) =>
            idx === editingIndex ? { size: newSize, price } : size
          ),
        }));
        setEditingIndex(null);
      } else {
        setFormData((prev) => ({
          ...prev,
          sizes: [...prev.sizes, { size: newSize, price }],
        }));
      }
      setNewSize("");
      setNewPrice("");
    }
  };

  const handleEditSizePrice = (index) => {
    const { size, price } = formData.sizes[index];
    setNewSize(size);
    setNewPrice(price.toString());
    setEditingIndex(index);
  };

  const handleDeleteSizePrice = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, idx) => idx !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Set the uploaded image URL into the formData
    const updatedFormData = { ...formData, image: imageUrl || formData.image };
  
    try {
      if (mode === "edit") {
        const response = await updateMyMenuItem(initialData._id, updatedFormData);
        if (response?.status === 200) {
          refreshTable();
          toast.success("Menu item updated successfully");
          setFormData({
            id: "",
            name: "",
            category: "",
            description: "",
            estPreperationTime: "",
            sizes: [],
            image: "",
          });
        }
      } else {
        const response = await createMenuItems(updatedFormData);
        if (response?.status === 201) {
          toast.success("Menu item created successfully");
          setFormData({
            id: "",
            name: "",
            category: "",
            description: "",
            estPreperationTime: "",
            sizes: [],
            image: "",
          });
          refreshTable();
        }
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit menu item"
      );
    }
  };
  

  return (
    <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box min-w-8/10 max-w-5xl">
        <h2 className="text-2xl mb-4">
          {mode === "edit" ? "Edit Menu Item" : "Add Menu Item"}
        </h2>
        <form>
          <div className="flex flex-row gap-4">
            {/* Form fields */}
            <ImageUploader setImageUrl={setImageUrl} />
            <div className="flex-1">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full mb-2"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="select select-bordered w-full mb-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full mb-2"
              />

              <input
                type="number"
                name="estPreperationTime"
                placeholder="Estimated Preparation Time (minutes)"
                value={formData.estPreperationTime}
                onChange={handleInputChange}
                className="input input-bordered w-full mb-2"
              />

              {/* Size and price management */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Size (e.g., Small)"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  className="input input-bordered w-1/2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="input input-bordered w-1/2"
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSizePriceAction}
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>

              {/* Display Sizes */}
              {formData.sizes.map((size, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between mb-1"
                >
                  <span>{`${size.size}: ${formatCurrency(
                    size.price,
                    "LKR"
                  )}`}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn btn-xs btn-info"
                      onClick={() => handleEditSizePrice(idx)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteSizePrice(idx)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  {mode === "edit" ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default MenuItemForm;
