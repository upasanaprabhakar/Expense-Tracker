import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";  

import DashIcon from "../assets/dashboard.svg";
import AddIcon from "../assets/add.svg";
import TransactionIcon from "../assets/transaction.svg";
import LogoIcon from "../assets/logo.png";
import ProfileIcon from "../assets/profile.svg";

import "./Navbar.css";

function Navbar() {
    const { userName } = useContext(GlobalContext);

    return (
        <div className="sidebar">
            <img src={LogoIcon} alt="TrackIt Logo" className="logo-img" />
            <h3 className="welcome-text">Welcome, {userName || "User"}</h3> 

            <nav className="nav-links">
                <NavLink to="/" className="link">
                    <img src={DashIcon} alt="Dashboard" className="icon" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/transactions" className="link">
                    <img src={TransactionIcon} alt="Transactions" className="icon" />
                    <span>Transactions</span>
                </NavLink>

                <NavLink to="/add" className="link">
                    <img src={AddIcon} alt="Add Expense" className="icon" />
                    <span>Add Expense</span>
                </NavLink>

                <div className="edit-profile-link">
                    <NavLink to="/profile" className="link">
                        <img src={ProfileIcon} alt="Edit Profile" className="icon edit-icon" />
                        <span>Profile</span>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
