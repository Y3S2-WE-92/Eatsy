import React, { useState } from "react";

function AvailabilityToggleButton() {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };
  return (
    <div className="absolute top-0 right-0 p-4 z-10">
      <div className="flex flex-row gap-4 items-center bg-base-200 p-2 pl-6 border border-accent rounded-full">
        <p
          className={`font-bold text-sm badge badge-soft ${
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
