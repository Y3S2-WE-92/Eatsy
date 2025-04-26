import React from "react";
import { DeliveryMap } from "../../components";
import { orderDetails } from "../../constants";

function Home() {
  return (
    <>
      <div>Home</div>
      <DeliveryMap mode="delivery" orderData={orderDetails}/>
    </>
  );
}

export default Home;
