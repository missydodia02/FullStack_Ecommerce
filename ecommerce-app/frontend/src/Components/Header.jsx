import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBell, FaUser, FaShopify } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";
import "../styles/header.css";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.items.length);

  const handleHomeClick = () => {
    if (location.pathname !== "/") navigate("/");
  };

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

        <Link to="/profile" className="nav-icon">
          <FaUser className="icon" title="Profile" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
