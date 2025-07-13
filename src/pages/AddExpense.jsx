import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./AddExpense.css";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const { addTransaction } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const txn = {
      id: Date.now(),
      title: note || category,
      amount: type === "Income" ? parseFloat(amount) : -parseFloat(amount),
      category,
      date,
    };

    addTransaction(txn);

    setAmount("");
    setType("");
    setCategory("");
    setNote("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Add Expense</h2>

      <div className="add-expense-wrapper">
        <form className="add-expense-form" onSubmit={handleSubmit}>

          <div className="amount-box">
            <span className="currency">₹</span>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>


          <div className="dropdown-wrapper">
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="" disabled>Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>


          <div className="dropdown-wrapper">
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Select Category</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Grocery">Grocery</option>
              <option value="Income">Income</option>
              <option value="Others">Others</option>

            </select>
          </div>


          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />


          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
