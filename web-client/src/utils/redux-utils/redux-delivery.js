import { useSelector } from "react-redux";

export const useDeliveryPerson = () => {
    const deliveryPerson = useSelector((state) => state.delivery.loginDelivery);
    return deliveryPerson;
}