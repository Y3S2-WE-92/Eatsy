import React, { useState } from "react";
import AvailabilityToggleButton from "../../Buttons/Restaurant/AvailabilityToggleButton";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import MenuItemForm from "../../Forms/Restaurant/MenuItemForm";

function MenuTable({
  searchQuery = "",
  menuItems = [],
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
  onToggleAvailability,
  restaurantID,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle edit button click
  const handleEditClick = (item) => {
    setSelectedItem({
      id: item._id,
      name: item.name,
      category: item.category?._id || "", // Pass category _id
      categoryName: item.category?.name || "", // Pass category name for edit
      description: item.description || "",
      estPreparationTime: item.estPreperationTime || "",
      sizes: item.sizes || [],
      image: item.image || "",
      restaurantID: item.restaurantID,
      isAvailable: item.availability,
    });
    setIsEditModalOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async (updatedData) => {
    try {
      await onEdit(updatedData);
      setIsEditModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  // Handle delete button click
  const handleDeleteClick = async (itemId, itemName) => {
    if (window.confirm(`Are you sure you want to delete ${itemName}?`)) {
      try {
        await onDelete(itemId);
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <p>Loading menu items...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredMenuItems.length === 0 ? (
        <p>No menu items found.</p>
      ) : (
        <table className="table table-xs table-pin-rows table-pin-cols text-sm">
          <thead>
            <tr>
              <th>Menu Item</th>
              <th>Image</th>
              <th>Size</th>
              <th>Price</th>
              <th>Estimated Prep Time</th>
              <th>Description</th>
              <th className="w-50">Availability</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredMenuItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">
                        {item.category?.name || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="avatar">
                    <div className="rounded-xl h-25 w-27">
                      {item.image ? (
                        <img src={item.image} alt={`${item.name} image`} />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  {item.sizes.map((size, idx) => (
                    <div key={size._id || idx}>{size.size}</div>
                  ))}
                </td>
                <td>
                  {item.sizes.map((size, idx) => (
                    <div key={size._id || idx}>{formatCurrency(size.price, "LKR")}</div>
                  ))}
                </td>
                <td>{item.estPreperationTime ? `${item.estPreperationTime} mins` : "N/A"}</td>
                <td className="whitespace-normal break-words max-w-xs">
                  {item.description || "N/A"}
                </td>
                <td className="relative w-50 flex items-center mx-2">
                  <AvailabilityToggleButton
                    isAvailable={item.availability}
                    onToggle={(newAvailability) =>
                      onToggleAvailability(item._id, newAvailability)
                    }
                  />
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs text-sm"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                </th>
                <th>
                  <button
                    className="btn btn-ghost btn-xs text-sm"
                    onClick={() => handleDeleteClick(item._id, item.name)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Menu Item</th>
              <th>Image</th>
              <th>Size</th>
              <th>Price</th>
              <th>Estimated Prep Time</th>
              <th>Description</th>
              <th>Availability</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      )}
      {isEditModalOpen && (
        <MenuItemForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
          mode="edit"
          initialData={selectedItem}
          onSubmit={handleEditSubmit}
          restaurantID={selectedItem?.restaurantID || restaurantID}
        />
      )}
    </div>
  );
}

export default MenuTable;