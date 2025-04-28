import React from "react";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";

export default function Summary() {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-title">Completed Orders Today</div>
        <div className="stat-value">245</div>
        <div className="stat-desc">{new Date().toLocaleDateString('default', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        
      </div>

      <div className="stat">
        <div className="stat-title">Total Orders This Month</div>
        <div className="stat-value">5,672</div>
        <div className="stat-desc">{new Date().toLocaleString('default', { month: 'long' })} 2025</div>
      </div>

      <div className="stat">
        <div className="stat-title">{new Date().toLocaleDateString('default', { month: 'long' })} Revenue</div>
        <div className="stat-value">{formatCurrency(127450)}</div>
        <div className="stat-desc">↗︎ $10.7% more than last month</div>
      </div>
    </div>
  );
}