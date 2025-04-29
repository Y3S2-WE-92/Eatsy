import React, { useState, useEffect } from "react";
import axios from 'axios';
import { paymentAPI } from "../../../services";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";

export default function Summary() {
  const [paybacks, setPaybacks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      fetchPaybacksForReceiver();
    }
  }, []);

  const fetchPaybacksForReceiver = async () => {
    try {
      const response = await axios.get(`${paymentAPI.PaymentAPIGetPaybackByReceiverId}restaurant/${user.id}`);
      if (response?.data) {
        setPaybacks(response.data);
      }
    } catch (error) {
      console.error("Error fetching paybacks:", error);
    }
  };

  const totalEarnings = paybacks.reduce((sum, p) => sum + p.amountReceived, 0);

  const completedOrdersToday = paybacks.filter(p => new Date(p.date).toLocaleDateString() === new Date().toLocaleDateString()).length;

  const totalOrdersThisMonth = paybacks.filter(p => new Date(p.date).getMonth() === new Date().getMonth()).length;

  const revenueThisMonth = totalEarnings;

  const compareToLastMonth = () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastMonthPaybacks = paybacks.filter(p => new Date(p.date).getMonth() === lastMonth.getMonth());
    const lastMonthEarnings = lastMonthPaybacks.reduce((sum, p) => sum + p.amountReceived, 0);

    const diff = revenueThisMonth - lastMonthEarnings;

    return {
      percent: lastMonthEarnings ? Math.abs((diff / lastMonthEarnings) * 100).toFixed(1) : 0,
      trend: diff >= 0 ? '↗︎' : '↘︎'
    };
  };

  const { percent, trend } = compareToLastMonth();

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-300">
      <div className="stat">
        <div className="stat-title">Completed Orders Today</div>
        <div className="stat-value">{completedOrdersToday}</div>
        <div className="stat-desc">{new Date().toLocaleDateString('default', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Orders This Month</div>
        <div className="stat-value">{totalOrdersThisMonth}</div>
        <div className="stat-desc">{new Date().toLocaleString('default', { month: 'long' })} 2025</div>
      </div>

      <div className="stat">
        <div className="stat-title">{new Date().toLocaleDateString('default', { month: 'long' })} Revenue</div>
        <div className="stat-value">{formatCurrency(revenueThisMonth)}</div>
        <div className="stat-desc">{trend} {percent}% more than last month</div>
      </div>
    </div>
  );
}
