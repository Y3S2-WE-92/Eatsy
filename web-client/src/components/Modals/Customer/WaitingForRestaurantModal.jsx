import { useEffect, useState } from "react";
import {
  connectCustomerSocket,
  listenOrderStatusUpdate,
  disconnectCustomerSocket,
} from "../../../sockets/customer.socket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WaitingForRestaurantModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const customerID = useSelector((state) => state.customer.loginCustomer?.id);
  const [message, setMessage] = useState(
    "Waiting for restaurant confirmation..."
  );
  const [subtitle, setSubtitle] = useState("Don't exit or refresh the page");
  const [styles, setStyles] = useState("");
  const [spinnerStyle, setSpinnerStyle] = useState("text-warning");

  useEffect(() => {
    connectCustomerSocket(customerID);

    listenOrderStatusUpdate((data = {status: "accepted"}) => {
      if (data.status === "accepted") {
        setStyles("text-success");
        setSpinnerStyle("text-success");
        setMessage("Restaurant accepted your order!");
        setSubtitle("Redirecting to payment gateway...");

        setTimeout(() => {
          onClose();
          const TotalAmount = data.restaurantCost + data.deliveryCost;
          navigate("/customer/checkout/" + data.refNo + "/" + TotalAmount);
        }, 3000);
      } else if (data.status === "rejected") {
        setSpinnerStyle("text-error");
        setStyles("text-error");
        setMessage("Sorry! Restaurant rejected your order");
        setSubtitle("Please try another restaurant");

        setTimeout(() => {
          onClose();
          navigate("/customer/");
        }, 5000);
      }
    });

    return () => {
      disconnectCustomerSocket();
    };
  }, [customerID]);

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box max-w-5xl flex flex-col items-center gap-4 py-8">
        <span className={`loading loading-spinner loading-xl ${spinnerStyle}`}></span>
        <div className="flex flex-col items-center">
        <h1 className={`text-xl font-bold ${styles}`}>{message}</h1>
        <small className="text-base-content/80">{subtitle}</small>
        </div>
      </div>
    </dialog>
  );
}

export default WaitingForRestaurantModal;
