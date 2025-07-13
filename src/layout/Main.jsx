import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext"; 
import "./Main.css";

function Main() {
    const { userName } = useContext(GlobalContext); 

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Main;
