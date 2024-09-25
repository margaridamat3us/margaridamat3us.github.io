import React, { useState, useEffect, useRef } from "react";
import { IoBagAdd } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import formatCurrency from "./formatCurrency";
import "./ProductsList.css";

const ProductsPage = ({
  addToCart,
  searchTerm,
  sortOrder,
  onSortOrderChange,
  products,
}) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const productRefs = useRef({});
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("productId");
    if (productId && productRefs.current[productId]) {
      productRefs.current[productId].scrollIntoView({ behavior: "smooth" });
    }
  }, [location.search, products]);

  const filteredAndSortedProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      } else if (sortOrder === "id") {
        return a._id.localeCompare(b._id);
      }
      return 0;
    });

  const handleSortChange = (e) => {
    onSortOrderChange(e.target.value);
  };

  return (
    <section className="n-products" id="box-products">
      <div className="center-text">
        <h2>Products</h2>
      </div>
      <div className="sort-select">
        <label htmlFor="sortOrder">Sort by:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="id">DEFAULT</option>
          <option value="asc">ASCENDENT</option>
          <option value="desc">DESCENDENT</option>
        </select>
      </div>
      <div className="n-content">
        {filteredAndSortedProducts.map((product) => (
          <div
            className="row"
            key={product._id}
            ref={(el) => (productRefs.current[product._id] = el)}
          >
            <div className="row-img">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="product-image product-image-default"
              />
              <img
                src={product.hoverImageUrl}
                alt={`${product.title} hover`}
                className="product-image product-image-hover"
              />
            </div>
            <h3>{product.title}</h3>
            <div className="row-right">
              <h6>{formatCurrency(product.price, "EUR")}</h6>
            </div>
            <div className="row-in">
              <div className="row-left">
                <button onClick={() => addToCart(product)} className="add-to">
                  Add to Cart
                  <IoBagAdd className="add-to-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
