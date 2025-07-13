import React from "react";
import "./Card.css";

function Card({ title, amount }) {
  return (
    <div className="card">
      <h4 className="card-title">{title}</h4>
      <p className="card-amount">{amount}</p>
    </div>
  );
}

export default Card; 
