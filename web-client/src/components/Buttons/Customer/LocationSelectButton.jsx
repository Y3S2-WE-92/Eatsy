import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { getCustomerLocations } from "../../../utils/fetch-utils/customer/fetch-user";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLocation } from "../../../redux/customer/customerSlice";

function LocationSelectButton() {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState([]);
  // Retrieve selectedLocation from Redux store
  const selectedLocation = useSelector((state) => state.customer.loginCustomer?.selectedLocation);
  const [location, setLocation] = useState(selectedLocation || null);

  // Handle location selection
  const handleLocationSelect = (location) => {
    setLocation(location);
    dispatch(setSelectedLocation(location));
  };

  const fetchCustomerLocations = async () => {
    try {
      const locations = await getCustomerLocations();
      setLocations(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchCustomerLocations();
  }, []);

  // Update local state if selectedLocation changes in Redux store
  useEffect(() => {
    setLocation(selectedLocation || null);
  }, [selectedLocation]);

  return (
    <div className="dropdown dropdown-start">
      <div tabIndex={0} className="btn btn-outline rounded-full bg-base-100">
        <FaLocationArrow />
        <span className="hidden lg:inline-flex text-sm truncate">
          {location?.name || "Select Delivery Location"}
        </span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-300 mt-2 rounded-box w-full max-w-sm"
      >
        {locations.map((location) => (
          <li key={location._id}>
            <div onClick={() => handleLocationSelect(location)}>
              {location.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationSelectButton;