import React, { useEffect, useState } from "react";
import formatCurrency from "./formatCurrency";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import CartItem from "./CartItem";

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const CartPage = ({
  cartItems,
  removeFromCart,
  updateQuantity,
  toggleCartVisibility,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    toggleCartVisibility();
  }, [toggleCartVisibility]);

  const handleSubmitOrder = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      const order = {
        items: orderItems,
        total: calculateTotal(orderItems), // Calcula o total da encomenda
        status: "created",
      };

      // Envia a ordem para o backend usando fetch
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Erro ao finalizar a encomenda");
      } else {
        setMessage("Encomenda finalizada com sucesso!");
        removeFromCart([]);
        navigate("/order-submitted");
      }

      // Limpa o carrinho após a encomenda ser finalizada
    } catch (error) {
      console.error("Erro ao finalizar a encomenda:", error);
      setMessage("Erro ao finalizar a encomenda: " + error.message);
    }
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
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
      </div>
      <div className="cart-summary">
        <h2>Total: {formatCurrency(calculateTotal(cartItems), "EUR")}</h2>

        <button className="submit-order" onClick={handleSubmitOrder}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
