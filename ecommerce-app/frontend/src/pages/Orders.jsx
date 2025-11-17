import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOrders } from "../redux/orderSlice";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    dispatch(loadOrders(savedOrders));
  }, [dispatch]);

  if (!orders.length) return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>My Orders</h2>
      <p>No orders yet!</p>
    </div>
  );

  return (
    <div className="orders-container" style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>My Orders ({orders.length})</h2>
      {orders.slice().reverse().map(order => (
        <div key={order.id} style={{
          border: "1px solid #ddd",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: "white"
        }}>
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Status:</b> <span style={{color: order.status === 'DELIVERED' ? 'green' : 'orange'}}>{order.status}</span></p>
          <p><b>Placed At:</b> {new Date(order.placedAt).toLocaleString()}</p>
          <p><b>Delivery Address:</b> {order.address}</p>
          <p><b>Promo Code:</b> {order.promoCode || "None"}</p>
          <p><b>Total:</b> ₹ {Math.round(order.total)}</p>
          <p><b>Products:</b></p>
          <ul>
            {order.products.map(p => (
              <li key={p.id}>{p.title} x {p.quantity || 1} = ₹ {Math.round(p.price * 88 * (p.quantity || 1))}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;