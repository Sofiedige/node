import { useState, FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import itemsJSON from './Data/ProductList.json'
import './App.css'
import {GalleryList } from './Components/ProductImage';
import items from "./Data/ProductList.json"
import "bootstrap/dist/css/bootstrap.min.css"
import {Col, Row} from "react-bootstrap";
import {CheckoutItem} from "./Components/StoreItem";


function App() {
    return <><h1> Juicy Jamboree </h1>
        <Row lg={3} md={2} xs={1} className="g-3">
            {items.map(item =>(
                    <Col key={item.id}> <CheckoutItem{...item}/> </Col>
                ))}
        </Row>
    </>

}

export default App
