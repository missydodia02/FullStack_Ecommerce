



import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { placeOrder as placeOrderAPI } from "../services/api";
import { removeFromCart } from "../redux/cartSlice";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = location.state?.products || [];
  const [address, setAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalBeforeDiscount = products.reduce(
    (acc, item) => acc + item.price * 88 * item.quantity,
    0
  );

  const promoCodes = {
    SAVE10: 10,
    SAVE20: 20,
    FLAT100: 100
  };

  const applyPromo = () => {
    const code = promoCode.toUpperCase();
    if (!code) return alert("Enter a promo code!");

    if (promoCodes[code]) {
      let discountAmount = promoCodes[code] < 100 ? (totalBeforeDiscount * promoCodes[code]) / 100 : promoCodes[code];
      setDiscount(discountAmount);
      alert(`Promo code applied! You saved ₹${Math.round(discountAmount)}`);
    } else {
      alert("Invalid promo code!");
      setDiscount(0);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please enter delivery address!");

    const finalTotal = totalBeforeDiscount - discount;

    const orderData = {
      userId: 1, // Replace with logged-in user ID
      products,
      total: finalTotal,
      address,
      promoCode: promoCode.toUpperCase(),
      status: "Pending",
      placedAt: new Date().toISOString()
    };

    try {
      await placeOrderAPI(orderData);
      products.forEach(p => dispatch(removeFromCart(p.id)));
      alert("✅ Order Placed Successfully!");
      navigate("/"); // Redirect to home page after order
    } catch (err) {
      console.log(err);
      alert("❌ Failed to place order. Try again!");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Checkout</h2>
      <h3>Delivery Address</h3>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter delivery address"
        rows={4}
        style={{ width: "100%" }}
      />

      <h3>Promo Code</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          style={{ flex: 1 }}
        />
        <button onClick={applyPromo}>Apply</button>
      </div>

      <h3>Products:</h3>
      {products.map((p) => (
        <div key={p.id}>
          {p.title} x {p.quantity} = ₹ {Math.round(p.price * 88 * p.quantity)}
        </div>
      ))}

      <h3>Total: ₹ {Math.round(totalBeforeDiscount)}</h3>
      {discount > 0 && <h4>Discount: -₹ {Math.round(discount)}</h4>}
      <h3>Final Total: ₹ {Math.round(totalBeforeDiscount - discount)}</h3>

      <button onClick={handlePlaceOrder} style={{ marginTop: "20px" }}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { placeOrder } from "../redux/orderSlice"; // ✅ Redux action
// import { removeFromCart } from "../redux/cartSlice";
// import { placeOrder as placeOrderAPI } from "../services/api";

// function Checkout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const products = location.state?.products || [];
//   const [address, setAddress] = useState("");
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   const totalBeforeDiscount = products.reduce(
//     (acc, item) => acc + item.price * 88 * item.quantity,
//     0
//   );

//   const promoCodes = { SAVE10: 10, SAVE20: 20, FLAT100: 100 };

//   const applyPromo = () => {
//     const code = promoCode.toUpperCase();
//     if (!code) return alert("Enter a promo code!");
//     if (promoCodes[code]) {
//       let discountAmount = promoCodes[code] < 100 ? (totalBeforeDiscount * promoCodes[code]) / 100 : promoCodes[code];
//       setDiscount(discountAmount);
//       alert(`Promo code applied! You saved ₹${Math.round(discountAmount)}`);
//     } else {
//       alert("Invalid promo code!");
//       setDiscount(0);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!address) return alert("Please enter delivery address!");

//     const finalTotal = totalBeforeDiscount - discount;

//     const orderData = {
//       id: new Date().getTime(), // ✅ unique order ID
//       userId: 1,
//       products,
//       total: finalTotal,
//       address,
//       promoCode: promoCode.toUpperCase(),
//       status: "Pending",
//       placedAt: new Date().toISOString(),
//     };

//     try {
//       // ✅ Backend API call
//       await placeOrderAPI(orderData);

//       // ✅ Update Redux store & localStorage
//       dispatch(placeOrder(orderData));

//       // ✅ Remove products from cart
//       products.forEach(p => dispatch(removeFromCart(p.id)));

//       alert("✅ Order Placed Successfully!");
//       navigate("/profile"); // ✅ Go to profile to see latest orders
//     } catch (err) {
//       console.log(err);
//       alert("❌ Failed to place order. Try again!");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "auto" }}>
//       <h2>Checkout</h2>

//       <h3>Delivery Address</h3>
//       <textarea
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         placeholder="Enter delivery address"
//         rows={4}
//         style={{ width: "100%" }}
//       />

//       <h3>Promo Code</h3>
//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <input
//           type="text"
//           value={promoCode}
//           onChange={(e) => setPromoCode(e.target.value)}
//           placeholder="Enter promo code"
//           style={{ flex: 1 }}
//         />
//         <button onClick={applyPromo}>Apply</button>
//       </div>

//       <h3>Products:</h3>
//       {products.map(p => (
//         <div key={p.id}>
//           {p.title} x {p.quantity} = ₹ {Math.round(p.price * 88 * p.quantity)}
//         </div>
//       ))}

//       <h3>Total: ₹ {Math.round(totalBeforeDiscount)}</h3>
//       {discount > 0 && <h4>Discount: -₹ {Math.round(discount)}</h4>}
//       <h3>Final Total: ₹ {Math.round(totalBeforeDiscount - discount)}</h3>

//       <button onClick={handlePlaceOrder} style={{ marginTop: "20px" }}>
//         Place Order
//       </button>
//     </div>
//   );
// }

// export default Checkout;
