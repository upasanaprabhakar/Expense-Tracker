import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    const [income, setIncome] = useState(() => {
        const saved = localStorage.getItem("income");
        return saved ? JSON.parse(saved) : 0;
    });

    const [userName, setUserName] = useState(() => {
        const saved = localStorage.getItem("userName");
        return saved ? saved : "";
    });

    const addTransaction = (txn) => {
        setTransactions((prev) => [...prev, txn]);
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((txn) => txn.id !== id));
    };

    const editIncome = (newIncome) => {
        setIncome(parseFloat(newIncome) || 0);
    };

    const editUserName = (newName) => {
        setUserName(newName);
    };

    const resetAll = () => {
        setTransactions([]);
        setIncome(0);
        setUserName("");
        localStorage.removeItem("transactions");
        localStorage.removeItem("income");
        localStorage.removeItem("userName");
    };

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem("income", JSON.stringify(income));
    }, [income]);

    useEffect(() => {
        localStorage.setItem("userName", userName);
    }, [userName]);

    return (
        <GlobalContext.Provider
            value={{
                transactions,
                income,
                userName,
                addTransaction,
                editIncome,
                editUserName,
                deleteTransaction,
                resetAll
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
