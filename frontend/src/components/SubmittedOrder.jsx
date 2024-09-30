import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubmittedOrder.css"; // Estilização opcional

const SubmittedOrder = () => {
  const navigate = useNavigate();

  const handleGoBackToShop = () => {
    navigate("/Shop");
  };

  return (
    <div className="order-submitted-page">
      <h1>Order Submitted</h1>
      <p>*º. Hope to see you soon .º*</p>
      <button onClick={handleGoBackToShop}>Go Back</button>
    </div>
  );
};

export default SubmittedOrder;
