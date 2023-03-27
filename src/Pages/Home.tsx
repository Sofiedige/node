import Header from "../Components/Header";
import Items from "../Components/Items";
import Basket from "../Components/Basket";
import {ShoppingCartProvider} from "../context/ShoppingCartContext";
import React, {useEffect, useState} from "react";


export default function Home() {

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
        page === "home" &&
        <ShoppingCartProvider>
            <div>
                <Header/>
                <div className="row">
                    <Items/>
                    <Basket/>
                </div>
            </div>
        </ShoppingCartProvider>
    );
}
