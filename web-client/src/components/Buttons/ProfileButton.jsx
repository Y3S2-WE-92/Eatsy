import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCustomerLogout,
  useRestaurantLogout,
  useDeliveryLogout,
} from "../../utils/auth-utils/auth-user";

function ProfileButton({ role }) {
  const customerLogout = useCustomerLogout();
  const restaurantLogout = useRestaurantLogout();
  const deliveryLogout = useDeliveryLogout();
  const navigate = useNavigate();

  const RoleLogouts = {
    customer: customerLogout,
    restaurant: restaurantLogout,
    delivery: deliveryLogout,
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (RoleLogouts[role]) {
      RoleLogouts[role]();
    }
    navigate("/");
  };

  const setRoleAvatarImage = () => {
    switch (role) {
      case "customer":
        return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D";
      case "restaurant":
        return "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww";
      case "delivery":
        return "https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D";
      default:
        return "/images/avatar-customer.png";
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={setRoleAvatarImage()} />
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
        {role === "customer" && (
          <li>
            <Link to="/customer/my-cards">My Cards</Link>
          </li>
        )}
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
