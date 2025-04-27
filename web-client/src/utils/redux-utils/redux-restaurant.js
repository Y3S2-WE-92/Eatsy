import { useSelector } from "react-redux";

export const useRestaurant = () => {
    const restaurant = useSelector((state) => state.restaurant.loginRestaurant);
    return restaurant;
}