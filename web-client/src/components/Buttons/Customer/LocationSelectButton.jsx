import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { getCustomerLocations } from "../../../utils/fetch-utils/customer/fetch-user";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../../../redux/customer/customerSlice";

function LocationSelectButton() {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);

  // Handle location selection
  const handleLocationSelect = (location) => {

    setLocation(location);
    console.log("Location before dispatch:", location);
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
