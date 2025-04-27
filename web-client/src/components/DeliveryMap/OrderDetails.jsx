import React from 'react';

const OrderDetails = ({ orderDetails, fetchAndDrawRoute, handleCallCustomer, estimatedDuration, handleAssignOrder, handleUpdateStatus }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 1000,
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        width: '350px',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <img
          src="https://images.unsplash.com/photo-1656416571067-5d3d9fa8fd0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual customer image URL
          alt="Customer"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            marginRight: '15px',
            border: '2px solid #fff',
          }}
        />
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{orderDetails.customerName}</h3>
      </div>
      <p style={{ margin: '10px 0' }}><strong>Address:</strong> {orderDetails.deliveryAddress}</p>
      <p style={{ margin: '10px 0' }}><strong>Total:</strong> {orderDetails.totalAmount}</p>
      {estimatedDuration && (
        <p style={{ margin: '10px 0' }}>
          <strong>Estimated Delivery Time:</strong> {estimatedDuration} minutes
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        <button
          onClick={handleCallCustomer}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Call
        </button>
        <button
          onClick={fetchAndDrawRoute}
          style={{
            padding: '10px 15px',
            backgroundColor: '#3887be',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Get Direction
        </button>
        <button
          onClick={handleAssignOrder}
          style={{
            padding: '10px 15px',
            backgroundColor: '#FF4500',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Assign Order
        </button>
        {orderDetails?.status === "assigned" && (
          <button
            onClick={() => handleUpdateStatus("delivered")}
            style={{
              padding: '10px 15px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
