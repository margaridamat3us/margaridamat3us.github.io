import React from "react";
import { FaShoppingBag } from "react-icons/fa";

import "./CartButton.css";

const CartButton = ({ toggleCartVisibility, cartItemCount }) => {
  return (
    <button
      type="button"
      className="cart-toggle"
      onClick={toggleCartVisibility}
    >
      <FaShoppingBag />
      {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
    </button>
  );
};

export default CartButton;
