import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "../components/Card";
import TransactionList from "../components/TransactionList";
import EmptyIcon from "../assets/empty.png"
import "./Home.css";

function Home() {
  const { transactions, income } = useContext(GlobalContext);
  const [filter, setFilter] = useState("All");

  const expenses = transactions
    .filter(txn => txn.amount < 0)
    .reduce((total, txn) => total + Math.abs(txn.amount), 0);

  const dynamicIncome = transactions
    .filter(txn => txn.amount > 0)
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalBalance = income + dynamicIncome - expenses;

  const filteredTransactions = transactions.filter((txn) => {
    if (filter === "Income") return txn.amount > 0;
    if (filter === "Expense") return txn.amount < 0;
    return true;
  });

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>

      <div className="cards">
        <Card
          title="Total Balance"
          amount={`₹${totalBalance}`}
          note={dynamicIncome > 0 && totalBalance > income ? `+ ₹${dynamicIncome} Gain` : ""}
        />
        <Card title="Income" amount={`₹${income}`} />
        <Card title="Expenses" amount={`₹${expenses}`} />
      </div>

      <div className="transactions-section-header">
        <h3>Recent Transactions</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "Income" ? "active" : ""}`}
            onClick={() => setFilter("Income")}
          >
            Income
          </button>
          <button
            className={`filter-btn ${filter === "Expense" ? "active" : ""}`}
            onClick={() => setFilter("Expense")}
          >
            Expense
          </button>
        </div>
      </div>

      <div className="transactions-section">
        {filteredTransactions.length > 0 ? (
          <TransactionList transactions={filteredTransactions.slice().reverse()} />
        ) : (
          <div className="no-transactions">
            <img src={EmptyIcon}alt="No transactions" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
