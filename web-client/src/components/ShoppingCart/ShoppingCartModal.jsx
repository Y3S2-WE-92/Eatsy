import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Counter from "./Counter";
import { formatCurrency } from "../../utils/format-utils/CurrencyUtil";
import LocationSelectButton from "../Buttons/Customer/LocationSelectButton";
import { useDispatch } from "react-redux";
import { orderAPI } from "../../services";
import axios from "axios";
import { useToast } from "../../utils/alert-utils/ToastUtil";
import { removeCart } from "../../redux/customer/cartSlice";
import WaitingForRestaurantModal from "../Modals/Customer/WaitingForRestaurantModal";
import {
  useCustomer,
  useCustomerSelectedLocation,
} from "../../utils/redux-utils/redux-customer";

function ShoppingCartModal({ cart, isOpen, onClose }) {
  const dispatch = useDispatch();
  const customer = useCustomer();
  const selectedLocation = useCustomerSelectedLocation();
  const toast = useToast();

  const [items, setItems] = useState(cart.items);
  const [isWaitingForRestaurant, setIsWaitingForRestaurant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveItem = (itemID, selectedSize) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.itemID === itemID && item.selectedSize === selectedSize)
      )
    );
  };

  useEffect(() => {
    setItems(cart.items);
  }, [cart.items]);

  const handleQuantityChange = (itemID, selectedSize, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.itemID === itemID && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + cart.deliveryFee; // Add Delivery fee
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");

    if (!customer?.id || !token) {
      toast.error("Customer information is missing");
      return;
    }
    if (!selectedLocation) {
      toast.error("Please select a delivery location");
      return;
    }

    const orderPayload = {
      restaurantID: cart.restaurantID,
      restaurantCost: calculateSubtotal(),
      deliveryCost: 0,
      deliveryLocation: {
        location: {
          type: "Point",
          coordinates: selectedLocation?.deliveryAddress?.location
            ?.coordinates || [0, 0],
        },
        address:
          selectedLocation?.deliveryAddress?.address ||
          selectedLocation.name ||
          "",
      },
      items: items.map((item) => ({
        itemID: item.itemID,
        name: item.name,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post(orderAPI.placeOrder, orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201 || response.status === 200) {
        console.log("Order placed successfully", response.data);
        toast.success("Order placed successfully");
        dispatch(removeCart({ restaurantID: cart.restaurantID }));
        setIsWaitingForRestaurant(true);
        setIsLoading(false);
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Error placing order:", error);
      setIsLoading(false);
    }
  };

  const handleWaitingForRestaurantModalClose = () => {
    setIsWaitingForRestaurant(false);
    onClose();
  };

  return (
    <>
      <dialog
        id="shopping-cart-modal"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div className="modal-box min-w-10/12 max-w-5xl">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <h2 className="card-title text-2xl truncate">
                {cart.restaurantName}
              </h2>
              <button className="btn" onClick={onClose}>
                <IoClose />
              </button>
            </div>
            <div className="overflow-x-auto overflow-y-auto rounded-box border border-base-content/5 bg-base-100 mt-4 max-h-96">
              <table className="table text-end">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-center">Item</th>
                    <th className="text-center">Size</th>
                    <th className="text-center">Quantity</th>
                    <th>Unit Price</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={`${item.itemID}-${item.selectedSize}`}>
                      <td>
                        <button
                          className="btn btn-error btn-xs btn-circle text-lg"
                          onClick={() =>
                            handleRemoveItem(item.itemID, item.selectedSize)
                          }
                        >
                          <IoClose />
                        </button>
                      </td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.selectedSize}</td>
                      <td className="text-center">
                        <Counter
                          existingQty={item.quantity}
                          onQuantityChange={(newQty) =>
                            handleQuantityChange(
                              item.itemID,
                              item.selectedSize,
                              newQty
                            )
                          }
                        />
                      </td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-end">
                  <tr>
                    <td colSpan={5}>Subtotal</td>
                    <td>{formatCurrency(calculateSubtotal())}</td>
                  </tr>
                  <tr>
                    <td colSpan={5}>Delivery Fee</td>
                    <td>+ {formatCurrency(cart.deliveryFee)}</td>
                  </tr>
                  <tr>
                    <td colSpan={5}>Total</td>
                    <td className="font-bold text-lg">
                      {formatCurrency(calculateTotal())}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="modal-action">
              <div className="flex flex-row gap-8 items-center justify-end mb-4 md:mb-0">
                <div className="flex flex-row gap-4">
                  <label className="label hidden md:flex">Delivery to </label>
                  <LocationSelectButton dropdownDirection="top" />
                </div>
                <div className="flex flex-col items-end">
                  <p>Total Amount</p>
                  <p className="font-bold text-xl">
                    {formatCurrency(calculateTotal())}
                  </p>
                </div>
                <button className="btn btn-primary" onClick={handlePlaceOrder} disabled={isLoading}>
                  {isLoading ? (
                    <span className="loading loading-dots loading-lg text-warning"></span>
                  ) : (
                    <span>Place Order</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {isWaitingForRestaurant && (
        <WaitingForRestaurantModal
          isOpen={isWaitingForRestaurant}
          onClose={handleWaitingForRestaurantModalClose}
        />
      )}
    </>
  );
}

export default ShoppingCartModal;
