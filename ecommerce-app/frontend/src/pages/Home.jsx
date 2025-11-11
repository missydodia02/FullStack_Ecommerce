import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchProducts } from "../services/api";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setFiltered(data);
        const uniqueCats = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCats);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let temp = products;
    if (selectedCategory) temp = temp.filter(p => p.category === selectedCategory);
    if (search.trim()) temp = temp.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    setFiltered(temp);
  }, [search, selectedCategory, products]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    alert(`${product.title} added to cart! 🛒`);
  };

  const handleBuyNow = (product, e) => {
    e.preventDefault();
    navigate("/checkout", { state: { products: [{ ...product, quantity: 1 }] } });
  };

  return (
    <div className="home-container">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="product-list">
        {filtered.map(p => (
          <Link to={`/product/${p.id}`} className="product-card" key={p.id}>
            <img src={p.imageUrl} alt={p.title} />
            <h3>{p.title}</h3>
            <p>₹ {p.price}</p>
            <button className="add-to-cart-btn" onClick={e => handleAddToCart(p, e)}>Add to Cart</button>
            <button className="buy-now-btn" onClick={e => handleBuyNow(p, e)}>Buy Now</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
