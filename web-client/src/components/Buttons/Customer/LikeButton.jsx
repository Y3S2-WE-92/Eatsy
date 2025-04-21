import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function LikeButton() {
  return (
    <label className="swap">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="sr-only"/>

      <FaHeart className="swap-on fill-current text-3xl text-primary"/>

      <FaRegHeart className="swap-off fill-current text-3xl" />
    </label>
  );
}

export default LikeButton;
