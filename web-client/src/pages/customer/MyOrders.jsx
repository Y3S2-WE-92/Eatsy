import React, { useState, useEffect } from "react";
import { PageTitle } from "../../components";
import { styles } from "../../styles/styles";
import { ShoppingCartButton } from "../../components";
import { getCustomerMyOrders } from "../../utils/fetch-utils/customer/fetch-order";
import { OrderAccordionItem } from "../../components";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const response = await getCustomerMyOrders();
      setMyOrders(response);
    } catch (error) {
      console.error("Failed to fetch my orders:", error.message);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className={`${styles.paddingX} flex flex-col mb-12`}>
      <ShoppingCartButton />
      <PageTitle title="My Orders" backLink="/customer" />
      <div className="join join-vertical bg-base-100">
        {myOrders.length > 0 ? (
          myOrders.map((order, index) => (
          <div key={order._id}>
            <OrderAccordionItem order={order} isFirstItem={index === 0}/>
          </div>
        ))) : (
          <p className="text-center">No orders found</p>
        )
        }
      </div>
    </div>
  );
}

export default MyOrders;
