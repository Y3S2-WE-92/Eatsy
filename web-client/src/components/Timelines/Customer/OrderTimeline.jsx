import React from "react";
import { MdOutlinePending, MdDone, MdBlock, MdOutlinePaid, MdDoneAll, MdOutlineAssignmentInd, MdOutlineShoppingBag, MdDeliveryDining } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";

function OrderTimeline({ currentStatus = "pending" }) {
  // Corrected logic for firstStep
  const firstStep = ["pending", "accepted", "rejected"].includes(currentStatus)
    ? currentStatus
    : "accepted"; // if beyond pending/accepted/rejected, first is accepted

  const steps = [
    firstStep,
    "paid",
    "preparing",
    "ready",
    "assigned",
    "pickup",
    "delivered",
  ];

  const formatStatusNames = (status) => {
    if (status === "pending") {
      return { icon: <MdOutlinePending />, name: "Pending" };
    } else if (status === "accepted") {
      return { icon: <MdDone />, name: "Accepted" };
    } else if (status === "rejected") {
      return { icon: <MdBlock />, name: "Rejected" };
    } else if (status === "paid") {
      return { icon: <MdOutlinePaid />, name: "Paid" };
    } else if (status === "preparing") {
      return { icon: <PiCookingPotBold />, name: "Preparing" };
    } else if (status === "ready") {
      return { icon: <MdDoneAll />, name: "Ready" };
    } else if (status === "assigned") {
      return { icon: <MdOutlineAssignmentInd />, name: "Assigned" };
    } else if (status === "pickup") {
      return { icon: <MdOutlineShoppingBag />, name: "Pickup" };
    } else if (status === "delivered") {
      return { icon: <MdDeliveryDining />, name: "Delivered" };
    } else {
      return { icon: <MdBlock />, name: status };
    }
  };

  return (
    <ul className="steps steps-vertical lg:steps-horizontal">
      {steps.map((step, index) => {
        const { icon, name } = formatStatusNames(step);
        const stepClass = 
          step === "rejected" ? "step step-primary" : 
          steps.indexOf(currentStatus) >= index ? "step step-success" : "step";

        return (
          <li key={index} className={stepClass}>
            <span className="step-icon text-xl">{icon}</span>
            {name}
          </li>
        );
      })}
    </ul>
  );
}

export default OrderTimeline;
