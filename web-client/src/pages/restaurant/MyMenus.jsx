import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import MenuTable from "../../components/Tables/Restaurant/MenuTable";
import MenuItemForm from "../../components/Forms/Restaurant/MenuItemForm";
import { useRestaurant } from "../../utils/redux-utils/redux-restaurant";
import { getMyMenuItems } from "../../utils/fetch-utils/restaurant/fetch-restaurant";

function MyMenus() {
  const restaurant = useRestaurant();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const menuItems = await getMyMenuItems();
      setMenuItems(menuItems);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => {
    setIsAddItemModalOpen(true);
  };

  useEffect(() => {
    fetchMyMenuItems();
  }, [restaurant.id]);

  return (
    <div className="max-w-7xl mx-auto p-4 pb-12">
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
            className="btn btn-success btn-sm rounded-full px-4 flex items-center gap-2 w-2/5 md:w-2/5 lg:w-auto"
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
        refreshTable={fetchMyMenuItems}
      />
      <MenuItemForm
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        mode="add"
        refreshTable={fetchMyMenuItems}
      />
    </div>
  );
}

export default MyMenus;
