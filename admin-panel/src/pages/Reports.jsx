import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { paymentAPI } from '../../../admin-panel/src/services';
import { useToast } from '../utils/alert-utils/ToastUtil';

function Reports() {
  const [paybacks, setPaybacks] = useState([]);
  const [commissionSetting, setCommissionSetting] = useState({ restaurantCommissionPercentage: 0, deliveryCommissionPercentage: 0 });
  const [restaurantRate, setRestaurantRate] = useState(0);
  const [deliveryRate, setDeliveryRate] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const toast = useToast();

  useEffect(() => {
    fetchPaybacks();
    fetchCommission();
  }, []);

  const fetchPaybacks = async () => {
    const response = await axios.get(paymentAPI.GetAllPaybacks);
    if (response) setPaybacks(response.data);
  };

  const fetchCommission = async () => {
    const response = await axios.get(paymentAPI.GetCommissionSetting);
    if (response) {
      setCommissionSetting(response.data);
      setRestaurantRate(response.data.restaurantCommissionPercentage);
      setDeliveryRate(response.data.deliveryCommissionPercentage);
    }
  };

  const updateCommission = async () => {
    const response = await axios.put(paymentAPI.UpdateCommissionSetting, {
      restaurantCommissionPercentage: restaurantRate,
      deliveryCommissionPercentage: deliveryRate
    });
    if (response) {
      toast.success('Commission updated successfully');
      fetchCommission();
    }
  };

  const totalPaybacks = paybacks.reduce((acc, curr) => acc + curr.amountReceived, 0);
  const totalRevenue = paybacks.reduce((acc, curr) => acc + curr.platformCommission, 0);

  const restaurantProfit = paybacks
    .filter(p => p.receiverType === 'restaurant')
    .reduce((acc, p) => acc + p.platformCommission, 0);

  const deliveryProfit = paybacks
    .filter(p => p.receiverType === 'delivery')
    .reduce((acc, p) => acc + p.platformCommission, 0);

  const filteredPaybacks = filterType === "all" 
    ? paybacks 
    : paybacks.filter(p => p.receiverType === filterType);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Revenue</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat">
          <div className="stat-title">Total Paybacks</div>
          <div className="stat-value text-primary">Rs. {totalPaybacks.toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Platform Revenue</div>
          <div className="stat-value text-success">Rs. {totalRevenue.toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Paybacks Count</div>
          <div className="stat-value text-info">{paybacks.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Profit from Restaurants</div>
          <div className="stat-value text-secondary">Rs. {restaurantProfit.toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Profit from Delivery</div>
          <div className="stat-value text-accent">Rs. {deliveryProfit.toFixed(2)}</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md p-4 max-w-xl">
        <h3 className="text-lg font-semibold mb-4">Commission Settings</h3>
        <div className="form-control mb-2">
          <label className="label">Restaurant Commission (%)</label>
          <input
            type="number"
            value={restaurantRate}
            onChange={(e) => setRestaurantRate(Number(e.target.value))}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">Delivery Commission (%)</label>
          <input
            type="number"
            value={deliveryRate}
            onChange={(e) => setDeliveryRate(Number(e.target.value))}
            className="input input-bordered"
          />
        </div>
        <button onClick={updateCommission} className="btn btn-primary mt-2">Update Commission</button>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Paybacks Table</h3>

        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">Filter by Receiver Type</label>
          <select
            className="select select-bordered"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="restaurant">Restaurant</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Ref No</th>
                <th>Receiver Type</th>
                <th>Amount Received</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPaybacks.map((pb, i) => (
                <tr key={pb._id}>
                  <td>{i + 1}</td>
                  <td>{pb.refNo}</td>
                  <td>{pb.receiverType == "restaurant" ? "Restaurant": "Delivery"}</td>
                  <td>Rs. {pb.amountReceived.toFixed(2)}</td>
                  <td>Rs. {pb.platformCommission.toFixed(2)}</td>
                  <td>{pb.status == "completed"? <div className="badge badge-outline badge-success">Completed</div> : <div className="badge badge-outline badge-warning">Pending</div>}</td>
                  <td>{new Date(pb.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
