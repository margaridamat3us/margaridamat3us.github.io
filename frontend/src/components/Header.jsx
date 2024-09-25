import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CartButton from "./CartButton";
import { FaSearch, FaBars } from "react-icons/fa";
import "./Header.css";

const Header = ({
  toggleCartVisibility,
  onSearch,
  cartItemCount,
  searchResults,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchItemClick = (productId) => {
    setIsSearchVisible(false);
    onSearch("");
    navigate(`/Shop?productId=${productId}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // fecha o menu quando mudo de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // fecha menu quando clicko
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <header>
      <Link to="/" className="logo">
        tom @ workspace
      </Link>
      <nav className={`nav-list ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li className="nav-shop">
            <Link to="/Shop" onClick={handleLinkClick} className="menu-link">
              shop
            </Link>
          </li>
          <li>
            <Link to="/Contact" onClick={handleLinkClick} className="menu-link">
              contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="nav-right">
        <button
          type="button"
          className="search-toggle"
          onClick={toggleSearchVisibility}
        >
          <FaSearch />
        </button>
        {isSearchVisible && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => onSearch(e.target.value)}
              className="search-input"
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((product) => (
                  <div
                    className="search-result-item"
                    key={product._id}
                    onClick={() => handleSearchItemClick(product._id)}
                  >
                    <img src={product.imageUrl} alt={product.title} />
                    <span>{product.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <CartButton
          toggleCartVisibility={toggleCartVisibility}
          cartItemCount={cartItemCount}
        />
        <button type="button" className="menu-toggle" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
