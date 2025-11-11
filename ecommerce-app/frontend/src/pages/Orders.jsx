import React from "react";
import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector(state => state.orders.orders); // Redux state se fetch

  if (!orders.length) return <p>No orders yet!</p>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Placed At:</b> {order.placedAt ? new Date(order.placedAt).toLocaleString() : "N/A"}</p>
          <p><b>Delivery Address:</b> {order.address || "N/A"}</p>
          <p><b>Promo Code:</b> {order.promoCode || "N/A"}</p>
          <p><b>Total:</b> ₹ {order.total}</p>
          <p><b>Products:</b></p>
          <ul>
            {order.products.map(p => (
              <li key={p.id}>{p.title} x {p.quantity || 1}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;
