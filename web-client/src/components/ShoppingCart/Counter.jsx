import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function Counter({existingQty=0}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(existingQty);
  }, [existingQty]);

  const handleMinusClick = () => {
    setCount(count - 1);
  };

  const handlePlusClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-row items-center gap-2 w-full justify-center">
      <button className="btn btn-primary btn-circle btn-xs" onClick={handleMinusClick} disabled={count === 0}>
        <FaMinus />
      </button>
      <input
        className="input input-bordered w-20 text-center input-sm"
        value={count}
        readOnly
      />
      <button className="btn btn-primary btn-circle btn-xs" onClick={handlePlusClick}>
        <FaPlus />
      </button>
    </div>
  );
}

export default Counter;
