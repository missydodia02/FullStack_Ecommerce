import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBell, FaUser, FaShopify, FaChevronDown } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";
import "../styles/header.css";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.items.length);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleHomeClick = () => {
    if (location.pathname !== "/") navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo-section">
        <FaShopify className="appicon" />
        <div className="logo-text">
          <h1 className="logo">ShopKart</h1>
          <p className="tagline">Your one-stop shop for everything you love!</p>
        </div>
      </div>

      <nav className="nav-icons">
        <Link to="/" onClick={handleHomeClick} className="nav-icon">
          <BiSolidHome
            className={`icon ${location.pathname === "/" ? "active" : ""}`}
            title="Home"
          />
        </Link>

        <Link to="/cart" className="nav-icon cart-link">
          <FaShoppingCart className="icon" title="Cart" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <Link to="/notifications" className="nav-icon">
          <FaBell className="icon" title="Notifications" />
        </Link>

        <div className="profile-dropdown" ref={dropdownRef}>
          <button 
            className="profile-btn" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUser className="icon" />
            <FaChevronDown className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile" onClick={() => setShowDropdown(false)}>
                My Profile
              </Link>
              <Link to="/orders" onClick={() => setShowDropdown(false)}>
                My Orders
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;