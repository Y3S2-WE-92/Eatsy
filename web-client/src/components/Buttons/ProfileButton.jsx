import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerLogout, useRestaurantLogout, useDeliveryLogout } from "../../utils/auth-utils/auth-user";

function ProfileButton() {
  const customerLogout = useCustomerLogout();
  const restaurantLogout = useRestaurantLogout();
  const deliveryLogout = useDeliveryLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    customerLogout();
    restaurantLogout();
    deliveryLogout();

    navigate("/");
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <Link to={"/customer/my-cards"}>My cards</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
