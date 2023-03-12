import {useState, FormEvent} from 'react'
import reactLogo from './assets/react.svg'
import itemsJSON from './Data/ProductList.json'
import './App.css'
import items from "./Data/ProductList.json"
import "bootstrap/dist/css/bootstrap.min.css"
import {Col, Row} from "react-bootstrap";
import {CheckoutItem} from "./Components/StoreItem";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import Header from "./Components/Header";
import Items from "./Components/Items";
import Basket from "./Components/Basket";
import SearchBar from "./Components/SearchBar";
import Billing from "./Components/Billing";




function App() {
    return (

        <ShoppingCartProvider>
            <div><Header></Header>
            <SearchBar></SearchBar>
                <div className="row">
                    <Items></Items>
                    <Basket></Basket>
                </div>
            </div>
            <Billing></Billing>

        </ShoppingCartProvider>


    )
}

export default App
