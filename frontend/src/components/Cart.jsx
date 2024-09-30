import React from "react";
import CartItem from "./CartItem";
import formatCurrency from "./formatCurrency";
import "./Cart.css";

const Cart = ({
  cartItems,
  removeFromCart,
  updateQuantity,
  isCartVisible,
  toggleCartVisibility,
  handleViewCart,
}) => {
  if (!isCartVisible) return null;

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const total = calculateTotal();

  return (
    <div className="cart">
      <button
        className="cart-close-button"
        onClick={() => {
          toggleCartVisibility();
        }}
      >
        &times;
      </button>

      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item._id}
            id={item._id}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ))
      )}
      <div className="cart-total">
        <h3>Total: {formatCurrency(total, "EUR")}</h3>
      </div>
      <button className="view-cart" onClick={handleViewCart}>
        View Cart
      </button>
    </div>
  );
};

export default Cart;
