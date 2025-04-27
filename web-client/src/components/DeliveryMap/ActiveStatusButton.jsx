import React from "react";

const ActiveStatusButton = ({ isActive, toggleActiveStatus }) => {

  return (
    <button
      onClick={toggleActiveStatus}
      className={`${
        isActive ? "btn-success border-success" : "btn-error border-error"
      } btn btn-soft btn-lg border p-6 px-8 absolute rounded-full top-4 right-4 z-50`}
    >
      <div className="relative me-4">
        <div
          className={`${
            isActive ? "bg-success animate-pulse" : "bg-primary animate-bounce"
          } w-3 h-3 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        />
        {isActive && (
          <div
            className={`bg-success animate-ping w-4 h-4 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          />
        )}
      </div>

      {isActive ? "I AM ACTIVE" : "NOT ACTIVE"}
    </button>
  );
};

export default ActiveStatusButton;
