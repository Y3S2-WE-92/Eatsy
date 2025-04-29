import React from "react";
import { DeliveryMap } from "../../components";
import ClientMapView from "../../components/ClientMapView/ClientMapView";
import {orders} from "../../constants/index"

function Home() {
  return (
    <>
      <DeliveryMap mode="delivery"/>
       {/* <ClientMapView  orderData={ orders[0] } /> */}
    </>
  );
}

export default Home;
