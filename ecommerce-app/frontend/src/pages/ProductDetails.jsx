import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchProductById } from "../services/api";
import "../styles/productDetails.css";
import { FaShippingFast, FaMoneyBillWave, FaExchangeAlt, FaLock } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductById(id)
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.title} added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { products: [{ ...product, quantity: 1 }] } });
  };

  return (
    <div className="product-details">
      <img src={product.imageUrl} alt={product.title} className="product-image" />
      <div className="details">
        <h1>{product.title}</h1>
        <p className="category">Category: {product.category}</p>
        <div className="product-detail-rating">
          {'⭐'.repeat(Math.round(product.rating.rate))} &nbsp;
          <span style={{ color: '#888', fontWeight: 'normal', fontSize: "16px" }}>
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>

        <p><b>Description:</b></p>
        <p className="description">{product.description}</p>
        <p className="price">₹ {product.price}</p>

        <div className="product-features">
          <div className="feature"><FaShippingFast className="feature-icon" /><p>Free Delivery</p></div>
          <div className="feature"><FaMoneyBillWave className="feature-icon" /><p>Pay on Delivery</p></div>
          <div className="feature"><FaExchangeAlt className="feature-icon" /><p>10 Days Replacement</p></div>
          <div className="feature"><FaLock className="feature-icon" /><p>Secure Transaction</p></div>
        </div>

        <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
        <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetails;
