import React from "react";
import { AvailabilityToggleButton } from "../../components";
import { styles } from "../../styles/styles";
import { OrderRequests } from "../../components";
import Summary from "../../components/Cards/Restaurant/Summary";
import RecentOrders from "../../components/Cards/Restaurant/RecentOrders";
import TopOrders from "../../components/Cards/Restaurant/TopOrders";

function Home() {
  return (
    <div
      className={`${styles.paddingX} py-8 relative flex flex-col-2 justify-center gap-4`}
    >
      <AvailabilityToggleButton />
      <div>
        <OrderRequests />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Summary />
        </div>
        <div className="flex flex-row gap-4">
          <RecentOrders />
          <TopOrders/>
        </div>
      </div>
    </div>
  );
}

export default Home;
