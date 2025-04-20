import React from "react";
import { Link } from "react-router-dom";

function CloseButton({link}) {
  return (
    <Link to={link} className="btn border border-error btn-ghost rounded-full hover:btn-error">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </Link>
  );
}

export default CloseButton;
