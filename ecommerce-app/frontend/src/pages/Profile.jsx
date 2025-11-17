import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOrders } from "../redux/orderSlice";

function Profile() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);

  useEffect(() => {
    // Load orders from localStorage on component mount
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    dispatch(loadOrders(savedOrders));
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>My Profile</h2>
      <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>User Information</h3>
        <p><b>Name:</b> John Doe (Demo User)</p>
        <p><b>Email:</b> john.doe@example.com</p>
        <p><b>Phone:</b> +91 9876543210</p>
        <p><b>Member Since:</b> January 2024</p>
      </div>

      <h3>Recent Orders ({orders.length}):</h3>
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <p>No orders yet. Start shopping to see your orders here!</p>
        </div>
      ) : (
        orders.slice(-3).reverse().map(order => (
          <div key={order.id} style={{
            border: "1px solid #ddd", 
            padding: "15px", 
            marginBottom: "15px", 
            borderRadius: "8px",
            backgroundColor: "white"
          }}>
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Status:</b> <span style={{color: order.status === 'DELIVERED' ? 'green' : 'orange'}}>{order.status}</span></p>
            <p><b>Placed At:</b> {new Date(order.placedAt).toLocaleString()}</p>
            <p><b>Total:</b> ₹ {Math.round(order.total)}</p>
            <p><b>Items:</b> {order.products?.length || 0} item(s)</p>
            <p><b>Address:</b> {order.address}</p>
          </div>
        ))
      )}
      
      {orders.length > 3 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          <a href="/orders" style={{ color: "#306143", textDecoration: "none" }}>View All Orders →</a>
        </p>
      )}
    </div>
  );
}

export default Profile;