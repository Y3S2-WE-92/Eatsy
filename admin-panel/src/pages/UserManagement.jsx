import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userAPI } from '../../../admin-panel/src/services';
import { useToast } from '../../../admin-panel/src/utils/alert-utils/ToastUtil';

function UserManagement() {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDeliveryPersons();
  }, []);

  const fetchDeliveryPersons = async () => {
    try {
      const res = await axios.get(userAPI.GetAllDeliveryPersons);
      if (res) setDeliveryPersons(res.data);
    } catch (err) {
      console.error("Failed to fetch delivery personnel", err);
    }
  };

  const verifyDelivery = async (id) => {
    try {
      await axios.put(userAPI.VerifyDeliveryPerson(id, user.id));
      fetchRestaurants();
      toast.success("Delivery Person verified successfully!");
    } catch (err) {
      console.error("Verification failed", err);
      toast.error("Failed to verify delivery person!");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Delivery Management</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveryPersons.map((p) => (
              <tr key={p._id}>
                <td><div className="avatar">
                  <div className="w-24 rounded-full"><img alt="User avatar" src={p.profileImage} /></div></div></td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.vehicleNo || 'N/A'}</td>
                <td>
                  <span className={`badge ${p.verifiedBy ? 'badge-success' : 'badge-warning'}`}>
                    {p.verifiedBy ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${p.availability ? 'badge-success' : 'badge-ghost'}`}>
                    {p.availability ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="space-x-2">
                  {p.verifiedBy == null && (
                    <button className="btn btn-xs btn-success" onClick={() => verifyDelivery(p._id)}>
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

export default UserManagement;
