import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { getCustomerLocations } from "../../../utils/fetch-utils/customer/fetch-user";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../../../redux/customer/customerSlice";
import { useCustomerSelectedLocation } from "../../../utils/redux-utils/redux-customer";
import NewLocationModal from "../../Modals/Customer/NewLocationModal";
import { IoMdAdd } from "react-icons/io";

function LocationSelectButton({ dropdownDirection = "bottom" }) {
  const dispatch = useDispatch();
  const selectedLocation = useCustomerSelectedLocation();
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(selectedLocation || null);
  const [isNewLocationModalOpen, setIsNewLocationModalOpen] = useState(false);

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

  useEffect(() => {
    setLocation(selectedLocation || null);
  }, [selectedLocation]);

  const handleModalOpen = () => {
    setIsNewLocationModalOpen(true);
  };

  const handleModalClose = () => {
    setIsNewLocationModalOpen(false);
  };

  return (
    <>
      <div className={`dropdown dropdown-${dropdownDirection}`}>
        <div tabIndex={0} className="btn btn-outline rounded-full bg-base-100">
          <FaLocationArrow />
          <span className="hidden lg:inline-flex text-sm truncate">
            {location?.name || "Select Delivery Location"}
          </span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-300 my-2 rounded-box w-full min-w-48 max-w-sm"
        >
          {locations.length > 0 ? (
            locations.map((location) => (
              <li key={location._id}>
                <div onClick={() => handleLocationSelect(location)}>
                  {location.name}
                </div>
              </li>
            ))
          ) : (
            <li>
              <div onClick={() => handleLocationSelect(null)}>
                No Locations Available
              </div>
            </li>
          )}
          <hr className="my-2 border-base-100"/>
          <li>
            <div onClick={handleModalOpen}>
              <IoMdAdd /> Add New Location
            </div>
          </li>
        </ul>
      </div>

      {isNewLocationModalOpen && (
        <NewLocationModal
          isOpen={isNewLocationModalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default LocationSelectButton;
