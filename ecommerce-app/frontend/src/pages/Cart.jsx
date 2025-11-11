import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const grandTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { products: [product] } });
  };

  const handleCheckoutAll = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    navigate("/checkout", { state: { products: cartItems } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.imageUrl} alt={item.title} />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>₹ {item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                  <button className="buy-now-btn" onClick={() => handleBuyNow(item)}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>

          <h3>Grand Total: ₹ {Math.round(grandTotal)}</h3>
          <button className="checkout-all-btn" onClick={handleCheckoutAll}>Checkout All</button>
          <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
}

export default Cart;
