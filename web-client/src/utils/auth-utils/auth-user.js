import { useDispatch } from "react-redux";
import { logoutCustomer } from "../../redux/customer/customerSlice";
import { logoutRestaurant } from "../../redux/restaurant/restaurantSlice";
import { logoutDelivery } from "../../redux/delivery/deliverySlice";
import { clearCart } from "../../redux/customer/cartSlice";

export const useCustomerLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutCustomer());
    dispatch(clearCart());
  };

  return logout;
};

export const useRestaurantLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutRestaurant());
  }; 

  return logout;
}

export const useDeliveryLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutDelivery());
  };

  return logout;
}
