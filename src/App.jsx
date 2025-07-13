import React from "react";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";

import Main from "./layout/Main";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/add",
                element: <AddExpense />
            },
            {
                path: "/transactions",
                element: <Transactions />
            },
            {
                path: "/profile",
                element: <Profile />
            },
        ],
    },

])

function App() {
    return <RouterProvider router={router} />;
}

export default App
