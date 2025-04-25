import React, { useState, useEffect } from 'react';
import AvailabilityToggleButton from '../../Buttons/Restaurant/AvailabilityToggleButton';
//import { styles } from '../../../styles/styles';
import {formatCurrency} from '../../../utils/format-utils/CurrencyUtil'

function MenuTable({searchQuery}) {
  const [menuItems, setMenuItems] = useState([]);

  // Mock data with menu categories
  const mockMenuItems = [
    {
      id: 1,
      category: 'Appetizers',
      name: 'Spring Rolls',
      image: "https://images.unsplash.com/photo-1669340781012-ae89fbac9fc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sizes: [
        { size: 'Small', price: 799 },
        { size: 'Large', price: 1199 },
      ],
      estimatedPrepTime: '10 mins',
      description: 'Crispy rolls filled with vegetables and served with sweet chili sauce.',
      isAvailable: true,
    },
    {
      id: 2,
      category: 'Appetizers',
      name: 'Garlic Bread',
      image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sizes: [
        { size: 'Regular', price: 600 },
      ],
      estimatedPrepTime: '25 mins',
      description: 'Toasted bread topped with garlic butter and herbs.',
      isAvailable: false,
    },
    {
      id: 3,
      category: 'Main Course',
      name: 'Grilled Salmon',
      image: 'https://plus.unsplash.com/premium_photo-1723478417559-2349252a3dda?q=80&w=3166&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sizes: [
        { size: 'Regular', price: 2599 },
        { size: 'Large', price: 3599 },
      ],
      estimatedPrepTime: '15 mins',
      description: 'Fresh salmon fillet grilled to perfection, served with lemon herb sauce.',
      isAvailable: true,
    },
    {
      id: 4,
      category: 'Main Course',
      name: 'Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1665765374373-b3776bdd9dd6?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sizes: [
        { size: 'Small', price: 1499 },
        { size: 'Large', price: 2199 },
      ],
      estimatedPrepTime: '20 mins',
      description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil.',
      isAvailable: true,
    },
    {
      id: 5,
      category: 'Desserts',
      name: 'Chocolate Lava Cake',
      image: 'https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sizes: [
        { size: 'Regular', price: 999 },
      ],
      estimatedPrepTime: '30 mins',
      description: 'Warm chocolate cake with a gooey center, served with vanilla ice cream.',
      isAvailable: false,
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    // Replace with actual API call to your menu microservice
    setMenuItems(mockMenuItems);
  }, []); // Empty dependency array since mockMenuItems is static

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle availability toggle (replace with actual API call)
  const handleAvailabilityToggle = async (itemId, newAvailability) => {
    // Update local state
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isAvailable: newAvailability } : item
      )
    );
    // Replace with your API call to update availability
    // await fetch(`/api/menu/${itemId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ isAvailable: newAvailability }),
    // });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols text-sm">
        <thead>
          <tr>
          
            <th>Menu Item</th>
            <th>Image</th>
            <th>Size</th>
            <th>Price</th>
            <th>Estimated Prep Time</th>
            <th>Description</th>
            <th className='w-50'>Availability</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredMenuItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.category}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="avatar">
                  <div className="rounded-xl h-25 w-27">
                    <img src={item.image} alt={`${item.name} image`} />
                  </div>
                </div>
              </td>
              <td>
                {item.sizes.map((size, idx) => (
                  <div key={idx}>{size.size}</div>
                ))}
              </td>
              <td>
                {item.sizes.map((size, idx) => (
                  <div key={idx}>{formatCurrency(size.price, 'LKR')}</div>
                ))}
              </td>
              <td>{item.estimatedPrepTime}</td>
              <td className='whitespace-normal break-words max-w-xs'>{item.description}</td>
              <td className="relative w-50 flex items-center mx-2">
                <AvailabilityToggleButton
                  isAvailable={item.isAvailable}
                  onToggle={(newAvailability) =>
                    handleAvailabilityToggle(item.id, newAvailability)
                  }
                />
              </td>
              <th>
                <button className="btn btn-ghost btn-xs text-sm ">Edit</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-sm ">Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            
            <th>Menu Item</th>
            <th>Image</th>
            <th>Size</th>
            <th>Price</th>
            <th>Estimated Prep Time</th>
            <th>Description</th>
            <th>Availability</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default MenuTable;