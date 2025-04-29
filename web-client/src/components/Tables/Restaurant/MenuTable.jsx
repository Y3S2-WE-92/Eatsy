import React, { useState } from "react";
import MenuItemAvailabilityButton from "../../Buttons/Restaurant/MenuItemAvailabilityButton";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import MenuItemForm from "../../Forms/Restaurant/MenuItemForm";
import { deleteMyMenuItem } from "../../../utils/delete-utils/restaurant/delete-menuItem";
import { useToast } from "../../../utils/alert-utils/ToastUtil";
import { formatMinutesTime } from "../../../utils/format-utils/TimeFormatUtil";

function MenuTable({
  searchQuery = "",
  menuItems = [],
  isLoading = false,
  error = null,
  refreshTable = () => {},
}) {
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Open form in edit mode
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        const response = await deleteMyMenuItem(id);

        if (response.status === 200) {
          toast.success("Menu item deleted successfully!");
          refreshTable();
        }
      } catch (error) {
        console.error("Error deleting menu item:", error);
        toast.error("Couldn't delete menu item");
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
                    <div key={size._id || idx}>
                      {formatCurrency(size.price, "LKR")}
                    </div>
                  ))}
                </td>
                <td>
                  {item.estPreperationTime
                    ? `${formatMinutesTime(item.estPreperationTime)}`
                    : "N/A"}
                </td>
                <td className="whitespace-normal break-words max-w-xs">
                  {item.description || "N/A"}
                </td>
                <td>
                  <MenuItemAvailabilityButton
                    initialAvailability={item.availability}
                    menuItemID={item._id}
                  />
                </td>
                <td>
                  <div className="flex flex-row gap-2">
                    <button
                      className="btn btn-outline btn-sm text-sm"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline btn-error btn-sm text-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
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
          refreshTable={refreshTable}
        />
      )}
    </div>
  );
}

export default MenuTable;
