import React, { useState, useEffect } from "react";
import { useRestaurant } from "../../../utils/redux-utils/redux-restaurant";
import { updateMyRestaurantAvailability } from "../../../utils/update-utils/restaurant/update-restaurant";
import { getMyAvailability } from "../../../utils/fetch-utils/restaurant/fetch-restaurant";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

function AvailabilityToggleButton() {
  const restaurant = useRestaurant();
  const toast = useToast();
  const [checked, setChecked] = useState(false);

  const fetchAvailability = async () => {
    const { availability } = await getMyAvailability();

    if (availability) {
      setChecked(availability);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleToggle = async () => {
    const newAvailability = !checked;
    setChecked(newAvailability);

    const response = await updateMyRestaurantAvailability();
    if (response) {
      toast.success("Availability updated!");
      fetchAvailability();
    } else {
      toast.error("Failed to update availability.");
      fetchAvailability();
    }
  };

  return (
    <div className="absolute top-0 right-0 p-4 z-50">
      <div className="flex flex-row gap-4 items-center bg-base-200 p-2 md:pl-6 border border-accent rounded-full">
        <p
          className={`font-bold text-sm badge badge-soft hidden md:flex ${
            checked ? "badge-success" : "badge-error"
          }`}
        >
          {checked ? "Available" : "Not Available"}
        </p>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="toggle toggle-lg border-accent bg-accent/50 checked:border-success checked:bg-success checked:text-accent-content"
        />
      </div>
    </div>
  );
}

export default AvailabilityToggleButton;
