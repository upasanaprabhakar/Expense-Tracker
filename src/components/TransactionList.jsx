import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./TransactionList.css";

import FoodIcon from "../assets/categories/food.svg";
import GroceryIcon from "../assets/categories/grocery.svg";
import ShoppingIcon from "../assets/categories/shopping.png";
import EntertainmentIcon from "../assets/categories/entertainment.svg";
import BillsIcon from "../assets/categories/bills.svg";
import TravelIcon from "../assets/categories/travel.svg";
import HealthIcon from "../assets/categories/health.svg";
import IncomeIcon from "../assets/categories/income.png";
import OtherIcon from "../assets/categories/other.svg";
import DeleteIcon from "../assets/delete.svg";

const categoryIcons = {
  Food: FoodIcon,
  Grocery: GroceryIcon,
  Shopping: ShoppingIcon,
  Entertainment: EntertainmentIcon,
  Bills: BillsIcon,
  Travel: TravelIcon,
  Health: HealthIcon,
  Income: IncomeIcon,
  Others: OtherIcon,
};

function TransactionList({ transactions }) {
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <div className="transaction-list">
      {transactions.map((item) => {
        const icon = categoryIcons[item.category];
        return (
          <div key={item.id} className="transaction-item">
            <div className="left">
              <img src={icon} alt={item.category} className="category-icon" />
              <div>
                <h4>{item.title}</h4>
                <small>
                  {item.category} •{" "}
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </small>
              </div>
            </div>
            <div className="right-section">
              <div className={`amount ${item.amount < 0 ? "expense" : "income"}`}>
                ₹{Math.abs(item.amount)}
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteTransaction(item.id)}
              >
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionList;
