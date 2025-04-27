import { useDispatch } from "react-redux";
import { logoutCustomer } from "../../redux/customer/customerSlice";
import { logoutRestaurant } from "../../redux/restaurant/restaurantSlice";
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
