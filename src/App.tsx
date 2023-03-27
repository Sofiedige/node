import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './Pages/Home';
import React, {useEffect, useState} from "react";

export default function App() {
    const [page, setPage] = useState("home")
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

    function navigate(newPage: String, e: React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault()
        history.pushState({}, "", '?page=${newPage}')
        dispatchEvent(new PopStateEvent("popstate"))
    }
    const [navigating, setNavigating] = useState(true);
    const pageClasses = `page ${navigating ? 'navigating' : 'navigated'}`;

    return (
        <Home/>
    )
}
