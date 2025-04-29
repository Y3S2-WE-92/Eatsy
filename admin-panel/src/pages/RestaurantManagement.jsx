import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { paymentAPI, orderAPI, userAPI } from '../../../admin-panel/src/services';
import { useToast } from '../../../admin-panel/src/utils/alert-utils/ToastUtil';

function RestaurantManagement() {
  const [restaurants, setRestaurants] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const toast = useToast();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(userAPI.GetAllRestaurants);
      if (res) setRestaurants(res.data);
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
    }
  };

  const verifyRestaurant = async (id) => {
    try {
      await axios.put(userAPI.VerifyRestaurant(id, user.id));
      fetchRestaurants();
      toast.success("Restaurant verified successfully!");
    } catch (err) {
      console.error("Verification failed", err);
      toast.error("Failed to verify restaurant!");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Restaurant Management</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Owner</th>
              <th>Location</th>
              <th>Status</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => (
              <tr key={r._id}>
                <td><div className="avatar">
                  <div className="w-24 rounded-full"><img alt="User avatar" src={r.profileImage} /></div></div></td>
                <td>{r.name}</td>
                <td>{r.owner}</td>
                <td>{r.address}</td>
                <td>
                  <span className={`badge ${r.verifiedBy ? 'badge-success' : 'badge-warning'}`}>
                    {r.verifiedBy ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${r.availability ? 'badge-success badge-soft' : 'badge-ghost'}`}>
                    {r.availability ? 'Open' : 'Closed'}
                  </span>
                </td>
                <td className="space-x-2">
                  {r.verifiedBy == null && (
                    <button className="btn btn-xs btn-success" onClick={() => verifyRestaurant(r._id)}>
                      Verify
                    </button>
                  )}
                  <button className="btn btn-xs btn-outline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestaurantManagement;
