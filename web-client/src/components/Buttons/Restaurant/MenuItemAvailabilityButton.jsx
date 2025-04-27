import React, { useState } from "react";
import { updateMenuItemAvailability } from "../../../utils/update-utils/restaurant/update-menuItem";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

function MenuItemAvailabilityButton({ menuItemID, initialAvailability }) {
  const toast = useToast();
  const [checked, setChecked] = useState(initialAvailability);

  const handleToggle = async () => {
    setChecked((prev) => !prev);
    const response = await updateMenuItemAvailability(menuItemID);

    if (response) {
      toast.success("Menu item availability updated!");
    } else {
      toast.error("Failed to update menu item availability.");
    }
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleToggle}
      className="toggle toggle-lg border-accent bg-accent/50 checked:border-success checked:bg-success checked:text-accent-content"
    />
  );
}

export default MenuItemAvailabilityButton;
