import {useState, FormEvent} from 'react'
import reactLogo from './assets/react.svg'
import itemsJSON from './Data/ProductList.json'
import './App.css'
import items from "./Data/ProductList.json"
import "bootstrap/dist/css/bootstrap.min.css"
import {Col, Container, Row} from "react-bootstrap";
import {CheckoutItem} from "./Components/StoreItem";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import Header from "./Components/Header";
import Items from "./Components/Items";
import Basket from "./Components/Basket";
import SearchBar from "./Components/SearchBar";
import Billing from "./Components/Billing";
import {Route, Routes} from 'react-router-dom'
import Home from "./Pages/Home"
import {Checkout} from "./Pages/Checkout"




function App() {
    return (
        <Container>
            <Routes>
                <Route path = "/" element={<Home/>} />
                <Route path = "/Checkout" element={<Checkout/>} />
            </Routes>
        </Container>

    )
}

export default App
