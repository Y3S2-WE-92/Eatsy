import React, { useState } from "react";
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import MenuTable from "../../components/tables/Restaurant/MenuTable";
import MenuItemForm from "../../components/Forms/Restaurant/MenuItemForm";

function MyMenus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const handleAddItem = () => {
    setIsAddItemModalOpen(true);
  }

  // Handle form submission for adding new item
  const handleAddSubmit = (newItem) => {
    console.log('New menu item:', newItem);
    // Replace with API call to add new menu item
    // await fetch('/api/menu', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newItem),
    // });
    setIsAddItemModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search Bar and add item button */}
      <div className="mb-6 flex flex-col md:flex-col lg:grid lg:grid-cols-3 gap-4 items-center">
        <div className="hidden lg:block"></div>
        <div className="flex justify-center w-full">
          <div className="search flex flex-row items-center border border-accent rounded-full w-full max-w-md pl-4 bg-base-100">
            <IoSearchSharp />
            <input
              type="text"
              placeholder="Search for categories or menu items"
              className="search input border-0 rounded-full "
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
      {/* Menu Table */}
      <MenuTable searchQuery={searchQuery} />
      {/* Add Menu Item Modal */}
      <MenuItemForm
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        mode="add"
        onSubmit={handleAddSubmit}
        restaurantID={"restaurantID"} // Replace with actual restaurant ID
      />
    </div>
  );
}

export default MyMenus;
