import React, { useState, useContext } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import TransactionList from "../components/TransactionList";
import { GlobalContext } from "../context/GlobalContext";
import "./Transactions.css";

function Transactions() {
    const [activeTab, setActiveTab] = useState("All");
    const { transactions } = useContext(GlobalContext);

    const filteredTransactions = transactions.filter((txn) => {
        if (activeTab === "All") return true;
        if (activeTab === "Income") return txn.amount > 0;
        if (activeTab === "Expenses") return txn.amount < 0;
        return false;
    });


    const chartDataMap = {};
    filteredTransactions.forEach((txn) => {
        if (!chartDataMap[txn.date]) {
            chartDataMap[txn.date] = { date: txn.date, income: 0, expense: 0 };
        }
        if (txn.amount > 0) chartDataMap[txn.date].income += txn.amount;
        else chartDataMap[txn.date].expense += Math.abs(txn.amount);
    });
    
    const chartData = Object.values(chartDataMap).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const totalAmount = filteredTransactions.reduce(
        (sum, txn) => sum + Math.abs(txn.amount),
        0
    );

    const allDates = filteredTransactions.map((txn) => new Date(txn.date));
    const minDate = allDates.length ? new Date(Math.min(...allDates)) : null;
    const maxDate = allDates.length ? new Date(Math.max(...allDates)) : null;

    const formattedRange = minDate && maxDate
        ? `${minDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })} – ${maxDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })}`
        : "No Transactions";

    const grouped = filteredTransactions.reduce((acc, txn) => {
        if (!acc[txn.date]) acc[txn.date] = [];
        acc[txn.date].push(txn);
        return acc;
    }, {});

    const sortedGroupedEntries = Object.entries(grouped).sort(
        ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );

    return (
        <div className="transactions-page">
            <h2 className="transactions-heading">Transactions</h2>


            <div className="tabs">
                <button onClick={() => setActiveTab("All")}>All</button>
                <button onClick={() => setActiveTab("Income")}>Income</button>
                <button onClick={() => setActiveTab("Expenses")}>Expenses</button>
            </div>

            <div className="chart-container">
                <p className="chart-range">{formattedRange}</p>
                <h4 className="chart-total">₹{totalAmount.toLocaleString("en-IN")}</h4>

                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => `₹${value}`} />
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Bar dataKey="income" fill="#00C49F" radius={[6, 6, 0, 0]} barSize={30} />
                        <Bar dataKey="expense" fill="#FF6565" radius={[6, 6, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>


            {sortedGroupedEntries.map(([date, txns]) => (
                <div key={date} className="grouped-date-section">
                    <p className="group-date">
                        {new Date(date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <TransactionList transactions={txns} />
                </div>
            ))}
        </div>
    );
}

export default Transactions;
