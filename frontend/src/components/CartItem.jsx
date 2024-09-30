import React from "react";
import "./CartItem.css";
import formatCurrency from "./formatCurrency";

const CartItem = ({
  id,
  imageUrl,
  title,
  price,
  quantity,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <section className="cart-item">
      <img src={imageUrl} alt="Product" className="cart-item-image" />
      <div className="cart-item-content">
        <span className="content-title-price">
          <h3 className="cart-item-title">{title}</h3>
          <h3 className="cart-item-price">{formatCurrency(price, "EUR")}</h3>
        </span>
        <p className="quantity">Quantity: {quantity}</p>
        <button
          type="button"
          className="button__remove-item"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onUpdateQuantity(id, parseInt(e.target.value))}
        />
      </div>
    </section>
  );
};

export default CartItem;
