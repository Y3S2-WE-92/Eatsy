import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import MenuTable from "../../components/tables/Restaurant/MenuTable";
import MenuItemForm from "../../components/Forms/Restaurant/MenuItemForm";
import { restaurantAPI } from "../../services";
import { useToast } from "../../utils/alert-utils/ToastUtil";

function MyMenus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const restaurantID = "6809f4e58029922b21942dca"; // Replace with actual restaurant ID
  const { success, error: toastError } = useToast();

  // Fetch menu items
  const fetchMenuItems = async () => {
    if (!restaurantID || restaurantID === "your-restaurant-id") {
      setError("Invalid restaurant ID");
      setMenuItems([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        restaurantAPI.getMenuItemsByRestaurantID(restaurantID)
      );
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data.menuItems || []);
    } catch (err) {
      console.error("Error fetching menu items:", err.message);
      setError("Failed to load menu items");
      toastError("Failed to load menu items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [restaurantID]);

  const handleAddItem = () => {
    setIsAddItemModalOpen(true);
  };

  // Handle form submission for adding new item
  const handleAddSubmit = async (menuItemData) => {
    try {
      const response = await fetch(restaurantAPI.createMenuItems, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: menuItemData.name,
          restaurantID: menuItemData.restaurantID,
          description: menuItemData.description,
          category: menuItemData.category,
          estPreperationTime: menuItemData.estPreperationTime,
          sizes: menuItemData.sizes,
          image: menuItemData.image,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error response:", errorData);
        toastError(errorData.message || "Failed to add menu item");
        throw new Error("Failed to add menu item");
      }

      const newItem = await response.json();
      console.log("Menu item added successfully:", newItem);
      success("Menu item added successfully!");

      // Append new item to menuItems
      setMenuItems((prev) => [
        ...prev,
        {
          _id: newItem._id,
          id: newItem._id,
          name: newItem.name,
          category: newItem.category
            ? { _id: newItem.category, name: menuItemData.categoryName || "N/A" }
            : null,
          description: newItem.description,
          estPreperationTime: newItem.estPreperationTime,
          image: newItem.image,
          restaurantID: newItem.restaurantID,
          sizes: newItem.sizes || [],
          availability: newItem.availability,
        },
      ]);
      setIsAddItemModalOpen(false);
    } catch (err) {
      console.error("Error adding menu item:", err.message);
      toastError("An error occurred while adding the menu item");
    }
  };

  // Handle edit submission
  const handleEditSubmit = async (updatedData) => {
    try {
      // Placeholder for API call (implement when backend supports PATCH/PUT)
      console.log("Updating menu item:", updatedData);
      setMenuItems((prev) =>
        prev.map((item) =>
          item._id === updatedData.id
            ? {
                ...item,
                name: updatedData.name,
                category: updatedData.category
                  ? { _id: updatedData.category }
                  : null,
                description: updatedData.description,
                estPreperationTime: updatedData.estPreperationTime,
                image: updatedData.image,
                sizes: updatedData.sizes,
                availability: updatedData.isAvailable,
              }
            : item
        )
      );
      success("Menu item updated successfully!");
    } catch (err) {
      console.error("Error updating menu item:", err.message);
      toastError("Failed to update menu item");
    }
  };

  // Handle delete
  const handleDelete = async (itemId) => {
    try {
      // Placeholder for API call (implement when backend supports DELETE)
      console.log("Deleting menu item:", itemId);
      setMenuItems((prev) => prev.filter((item) => item._id !== itemId));
      success("Menu item deleted successfully!");
    } catch (err) {
      console.error("Error deleting menu item:", err.message);
      toastError("Failed to delete menu item");
    }
  };

  // Handle availability toggle
  const handleAvailabilityToggle = async (itemId, newAvailability) => {
    try {
      // Placeholder for API call (implement when backend supports PATCH)
      console.log("Toggling availability for item:", itemId, newAvailability);
      setMenuItems((prev) =>
        prev.map((item) =>
          item._id === itemId
            ? { ...item, availability: newAvailability }
            : item
        )
      );
      success(
        `Menu item set to ${newAvailability ? "available" : "unavailable"}`
      );
    } catch (err) {
      console.error("Error toggling availability:", err.message);
      toastError("Failed to toggle availability");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6 flex flex-col md:flex-col lg:grid lg:grid-cols-3 gap-4 items-center">
        <div className="hidden lg:block"></div>
        <div className="flex justify-center w-full">
          <div className="search flex flex-row items-center border border-accent rounded-full w-full max-w-md pl-4 bg-base-100">
            <IoSearchSharp />
            <input
              type="text"
              placeholder="Search for categories or menu items"
              className="search input border-0 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center lg:justify-end w-full lg:w-auto">
          <button
            className="btn btn-accent btn-sm flex items-center gap-2 w-2/5 md:w-2/5 lg:w-auto"
            onClick={handleAddItem}
          >
            <IoAdd size={20} />
            Add Item
          </button>
        </div>
      </div>
      <MenuTable
        searchQuery={searchQuery}
        menuItems={menuItems}
        isLoading={isLoading}
        error={error}
        onEdit={handleEditSubmit}
        onDelete={handleDelete}
        onToggleAvailability={handleAvailabilityToggle}
        restaurantID={restaurantID}
      />
      <MenuItemForm
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        mode="add"
        onSubmit={handleAddSubmit}
        restaurantID={restaurantID}
      />
    </div>
  );
}

export default MyMenus;
