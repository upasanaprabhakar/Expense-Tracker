import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ResetIcon from "../assets/reset.png";
import "./Profile.css";

function Profile() {
    const {
        userName,
        income,
        editUserName,
        editIncome,
        resetAll,
    } = useContext(GlobalContext);

    const [name, setName] = useState(userName || "");
    const [newIncome, setNewIncome] = useState(income || "");

    useEffect(() => {
        setName(userName || "");
        setNewIncome(income || "");
    }, [userName, income]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editUserName(name);
        editIncome(newIncome);
        alert("Profile updated!");
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all data?")) {
            resetAll();
        }
    };

    return (
        <div className="edit-profile-page">
            <div className="profile-header">
                <h2 className="edit-profile-heading">Profile</h2>
                <button className="reset-btn" onClick={handleReset} title="Reset All">
                    <img src={ResetIcon} alt="Reset" className="reset-icon" />
                </button>
            </div>

            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="income">Monthly Income</label>
                    <input
                        type="number"
                        id="income"
                        placeholder="Enter income"
                        value={newIncome}
                        onChange={(e) => setNewIncome(e.target.value)}
                    />
                </div>

                <button type="submit" className="save-btn">Save Changes</button>
            </form>
        </div>
    );
}

export default Profile;
