import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function Counter({ existingQty = 0, onQuantityChange }) {
  const [count, setCount] = useState(existingQty);

  useEffect(() => {
    setCount(existingQty);
  }, [existingQty]);

  const handleMinusClick = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange?.(newCount);
    }
  };

  const handlePlusClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange?.(newCount);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      const numericValue = Number(value);
      setCount(numericValue);
      onQuantityChange?.(numericValue);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2 w-full justify-center">
      <button
        className="btn btn-primary btn-circle btn-xs"
        onClick={handleMinusClick}
        disabled={count === 0}
      >
        <FaMinus />
      </button>
      <input
        className="input input-bordered w-10 md:w-20 text-center input-sm"
        type="text"
        value={count}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-primary btn-circle btn-xs"
        onClick={handlePlusClick}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default Counter;
