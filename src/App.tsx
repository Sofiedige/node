import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './Pages/Home';
import React, { useEffect, useState } from "react";
import { Checkout } from "./Pages/Checkout";
import { Verification } from "./Pages/Verification";

export function navigate(event: { preventDefault: () => void; }, newPage: string) {
    event.preventDefault(); // prevent standard behavior
    history.pushState({}, "", `?page=${newPage}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function App() {
    const [myPage, setPage] = useState("home");

    useEffect(() => {
        function popstateHandler() {
            const url = new URLSearchParams(window.location.search)
            const urlPage = url.get("page")
            setPage(urlPage || "home")
        }

        window.addEventListener("popstate", popstateHandler)
        popstateHandler()

        return () => {
            window.removeEventListener("popstate", popstateHandler)
        }
    }, []);

    const homeClasses = `page ${myPage === "home" ? 'navigated' : 'navigating'}`;
    const checkoutClasses = `page ${myPage === "checkout" ? 'navigated' : 'navigating'}`;
    const verificationClasses = `page ${myPage === "continue" ? 'navigated' : 'navigating'}`;

    return (
        <div className="app">
            <div className={homeClasses}>
                {myPage === "home" && <Home />}
            </div>
            <div className={checkoutClasses}>
                {myPage === "checkout" && <Checkout />}
            </div>
            <div className={verificationClasses}>
                {myPage === "continue" && <Verification />}
            </div>
        </div>
    )
}
