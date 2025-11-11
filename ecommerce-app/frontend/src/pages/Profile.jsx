// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { loadOrdersFromLocalStorage } from "../redux/orderSlice";

// function Profile() {
//   const dispatch = useDispatch();
  
//   // select the orders array from Redux slice
//   const orders = useSelector(state => state.orders.orders);

//   useEffect(() => {
//     dispatch(loadOrdersFromLocalStorage());
//   }, [dispatch]);

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto" }}>
//       <h2>Profile</h2>
//       <p>Welcome, User! (Mock Data)</p>

//       <h3>Your Orders:</h3>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         orders.map(order => (
//           <div key={order.id} style={{border:"1px solid #ccc", padding:"10px", marginBottom:"10px"}}>
//             <p><b>Order ID:</b> {order.id}</p>
//             <p><b>Address:</b> {order.address}</p>
//             <p><b>Promo Code:</b> {order.promoCode || "-"}</p>
//             <p><b>Status:</b> {order.status}</p>
//             <p><b>Placed At:</b> {order.placedAt ? new Date(order.placedAt).toLocaleString() : "-"}</p>
//             <p><b>Products:</b></p>
//             <ul>
//               {order.products.map(p => (
//                 <li key={p.id}>{p.title} x {p.quantity} = ₹ {Math.round(p.price * 88 * p.quantity)}</li>
//               ))}
//             </ul>
//             <p><b>Total:</b> ₹ {Math.round(order.total)}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Profile;


