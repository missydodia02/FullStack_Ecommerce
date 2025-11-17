import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { placeOrder } from "../redux/orderSlice";
import { placeOrder as placeOrderAPI } from "../services/api";
import "../styles/checkout.css";

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
    console.log("Place Order button clicked!");
    console.log("Address:", address);
    console.log("Products:", products);
    
    if (!address.trim()) {
      alert("Please enter delivery address!");
      return;
    }

    const finalTotal = totalBeforeDiscount - discount;

    const orderData = {
      id: new Date().getTime(),
      products,
      total: finalTotal,
      address,
      promoCode: promoCode.toUpperCase() || null,
      status: "PENDING",
      placedAt: new Date().toISOString()
    };

    console.log("Order Data:", orderData);

    try {
      // Backend order format
      const backendOrderData = {
        items: products.map(p => ({
          productId: p.id,
          title: p.title,
          quantity: p.quantity || 1,
          price: p.price
        })),
        totalAmount: finalTotal,
        address: address,
        promoCode: promoCode.toUpperCase() || null
      };

      // Save to backend database
      await placeOrderAPI(backendOrderData);
      console.log("Saved to database");
      
      // Save to localStorage for frontend
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      if (Array.isArray(existingOrders)) {
        existingOrders.push(orderData);
      } else {
        localStorage.setItem("orders", JSON.stringify([orderData]));
        return;
      }
      localStorage.setItem("orders", JSON.stringify(existingOrders));
      
      // Remove items from cart
      products.forEach(p => dispatch(removeFromCart(p.id)));
      
      alert("✅ Order Placed Successfully! Saved to Database!");
      navigate("/profile");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

return (
  <div className="checkout-container">
    <h2>Checkout</h2>

    <h3>Delivery Address</h3>
    <textarea
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Enter delivery address"
      rows={4}
      className="address-input"
    />

    <h3>Promo Code</h3>
    <div className="promo-section">
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Enter promo code"
        className="promo-input"
      />
      <button className="apply-btn" onClick={applyPromo}>Apply</button>
    </div>

    <h3>Products:</h3>
    <div className="products-list">
      {products.map((p) => (
        <div key={p.id} className="product-item">
          {p.title} x {p.quantity} = ₹ {Math.round(p.price * 88 * p.quantity)}
        </div>
      ))}
    </div>

    <div className="total-section">
      <h3>Total: ₹ {Math.round(totalBeforeDiscount)}</h3>
      {discount > 0 && <h4>Discount: -₹ {Math.round(discount)}</h4>}
      <h3>Final Total: ₹ {Math.round(totalBeforeDiscount - discount)}</h3>
    </div>

    <button className="place-order-btn" onClick={handlePlaceOrder}>
      Place Order
    </button>
  </div>
);
}

export default Checkout;