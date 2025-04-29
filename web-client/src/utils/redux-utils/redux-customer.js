import {useSelector} from "react-redux";

export const useCustomer = () => {
    const customer = useSelector((state) => state.customer.loginCustomer);
    return customer;
}

export const useCustomerSelectedLocation = () => {
    const selectedLocation = useSelector((state) => state.customer.loginCustomer?.selectedLocation);
    return selectedLocation;
}

