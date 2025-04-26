import React from "react";
import { AvailabilityToggleButton } from "../../components";
import { styles } from "../../styles/styles";
import { OrderRequests } from "../../components";

function Home() {
  return (
    <div className={`${styles.paddingX} py-8 relative flex flex-col`}>
      <AvailabilityToggleButton />

      <div className="flex flex-1">
        <OrderRequests />
      </div>
    </div>
  );
}

export default Home;
