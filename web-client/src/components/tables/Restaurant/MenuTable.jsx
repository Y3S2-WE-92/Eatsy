import React, { useState, useEffect } from "react";
import AvailabilityToggleButton from "../../Buttons/Restaurant/AvailabilityToggleButton";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import MenuItemForm from "../../Forms/Restaurant/MenuItemForm";

function MenuTable({ searchQuery, restaurantID = "your-restaurant-id" }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data with menu categories
  const mockMenuItems = [
    {
      id: 1,
      category: "Appetizers",
      name: "Spring Rolls",
      image:
        "https://images.unsplash.com/photo-1669340781012-ae89fbac9fc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sizes: [
        { size: "Small", price: 799 },
        { size: "Large", price: 1199 },
      ],
      estPreparationTime: 10,
      description:
        "Crispy rolls filled with vegetables and served with sweet chili sauce.",
      isAvailable: true,
      restaurantID: "restaurant-1",
    },
    {
      id: 2,
      category: "Appetizers",
      name: "Garlic Bread",
      image:
        "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sizes: [{ size: "Regular", price: 600 }],
      estPreparationTime: 25,
      description: "Toasted bread topped with garlic butter and herbs.",
      isAvailable: false,
      restaurantID: "restaurant-1",
    },
    {
      id: 3,
      category: "Main Course",
      name: "Grilled Salmon",
      image:
        "https://plus.unsplash.com/premium_photo-1723478417559-2349252a3dda?q=80&w=3166&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sizes: [
        { size: "Regular", price: 2599 },
        { size: "Large", price: 3599 },
      ],
      estPreparationTime: 15,
      description:
        "Fresh salmon fillet grilled to perfection, served with lemon herb sauce.",
      isAvailable: true,
      restaurantID: "restaurant-1",
    },
    {
      id: 4,
      category: "Main Course",
      name: "Margherita Pizza",
      image:
        "https://images.unsplash.com/photo-1665765374373-b3776bdd9dd6?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sizes: [
        { size: "Small", price: 1499 },
        { size: "Large", price: 2199 },
      ],
      estPreparationTime: 20,
      description:
        "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
      isAvailable: true,
      restaurantID: "restaurant-1",
    },
    {
      id: 5,
      category: "Desserts",
      name: "Chocolate Lava Cake",
      image:
        "https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sizes: [{ size: "Regular", price: 999 }],
      estPreparationTime: 30,
      description:
        "Warm chocolate cake with a gooey center, served with vanilla ice cream.",
      isAvailable: false,
      restaurantID: "restaurant-1",
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    // Replace with actual API call to your menu microservice
    setMenuItems(mockMenuItems);
  }, []); // Empty dependency array since mockMenuItems is static

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle availability toggle (replace with actual API call)
  const handleAvailabilityToggle = async (itemId, newAvailability) => {
    // Update local state
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isAvailable: newAvailability } : item
      )
    );
    // Replace with your API call to update availability
    // await fetch(`/api/menu/${itemId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ isAvailable: newAvailability }),
    // });
  };

  // Handle edit button click
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // Handle form submission for edit
  const handleEditSubmit = async (updatedData) => {
    try {
      console.log("Updated menu item:", updatedData);
      // Update local state (replace with API call)
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedData.id ? { ...updatedData } : item
        )
      );
      // Replace with API call to update menu item
      // await fetch(`/api/menu/${updatedData.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData),
      // });
      setIsEditModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };
  // Handle delete button click
  const handleDeleteClick = async (itemId, itemName) => {
    if(window.confirm(`Are you sure you want to delete ${itemName}?`)) {
        try {
            setMenuItems((prevItems) =>
              prevItems.filter((item) => item.id !== itemId)
            );
            // Replace with API call
            // await fetch(`/api/menu/${itemId}`, {
            //   method: 'DELETE',
            //   headers: { 'Content-Type': 'application/json' },
            // });
            console.log(`Deleted menu item with id: ${itemId}`);
          } catch (error) {
            console.error("Error deleting menu item:", error);
          }
    }
  };

  return (
    <div className="overflow-x-auto">
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
            <tr key={item.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.category}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="avatar">
                  <div className="rounded-xl h-25 w-27">
                    <img src={item.image} alt={`${item.name} image`} />
                  </div>
                </div>
              </td>
              <td>
                {item.sizes.map((size, idx) => (
                  <div key={idx}>{size.size}</div>
                ))}
              </td>
              <td>
                {item.sizes.map((size, idx) => (
                  <div key={idx}>{formatCurrency(size.price, "LKR")}</div>
                ))}
              </td>
              <td>{item.estPreparationTime} mins</td>
              <td className="whitespace-normal break-words max-w-xs">
                {item.description}
              </td>
              <td className="relative w-50 flex items-center mx-2">
                <AvailabilityToggleButton
                  isAvailable={item.isAvailable}
                  onToggle={(newAvailability) =>
                    handleAvailabilityToggle(item.id, newAvailability)
                  }
                />
              </td>
              <th>
                <button
                  className="btn btn-ghost btn-xs text-sm "
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
              </th>
              <th>
                <button 
                className="btn btn-ghost btn-xs text-sm "
                onClick={() => handleDeleteClick(item.id, item.name)}
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

      {/* Edit Menu Item Modal */}
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
          restaurantID={selectedItem.restaurantID || restaurantID}
        />
      )}
    </div>
  );
}

export default MenuTable;
