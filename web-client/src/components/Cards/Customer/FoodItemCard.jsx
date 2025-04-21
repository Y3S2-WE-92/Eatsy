import React from "react";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import Counter from "../../ShoppingCart/Counter";

function FoodItemCard({ item }) {
  return (
    <div
      key={item.id}
      className="card min-w-56 max-w-56 bg-base-100 border border-accent/30"
    >
      <figure>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="card-title">{item.name}</div>
        <p>{formatCurrency(item.price)}</p>

        <div className="card-footer mt-3">
          <Counter />
        </div>
      </div>
    </div>
  );
}

export default FoodItemCard;
