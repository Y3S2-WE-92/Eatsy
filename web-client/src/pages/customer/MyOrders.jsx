import React from "react";
import { PageTitle } from "../../components";
import { styles } from "../../styles/styles";

function MyOrders() {
  return (
    <div className={`${styles.paddingX} flex flex-col`}>
      <PageTitle title="My Orders" backLink="/customer" />
      <div className="card bg-base-300">
        <div className="card-body"></div>
      </div>
    </div>
  );
}

export default MyOrders;
