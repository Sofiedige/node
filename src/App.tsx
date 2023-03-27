import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './Pages/Home';
import React, {useEffect, useState} from "react";
import {Checkout} from "./Pages/Checkout";


export function navigate(event: { preventDefault: () => void; }, newPage: string){
    event.preventDefault(); // prevent standard behavior
    history.pushState({}, "", `?page=${newPage}`);
    dispatchEvent(new PopStateEvent("popstate"));
}

export default function App() {
    const [myPage, setPage] = useState("home")
    useEffect(() => {
        function popstateHandler (){
            const url = new URLSearchParams(window.location.search)
            const urlPage = url.get("page")
            setPage(urlPage || "home")
        }
        addEventListener("popstate", popstateHandler)
        popstateHandler()

        return () => {
            removeEventListener("popstate", popstateHandler)
        }
    }, []);
    const [navigating, setNavigating] = useState(true);

    useEffect(() => {
        setNavigating(false);
    }, [navigating]);


    const pageClasses = `page ${navigating ? 'navigating' : 'navigated'}`;

    return (
        <div className="App">
            {(myPage === "home" && <Home/>)}
            {(myPage === "checkout" && <Checkout/>)}
        </div>
    )
}
