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
    const[count,setCount]=useState("")
    return <>

        <h1><img className={"billedestyle"}
    src={"logo.png"}
    alt={"logo"}
        /> </h1>

<input className={"bar"} type="text" placeholder={"Search..."}onChange={e=>setCount(e.target.value)}/>

        <Row lg={3} md={2} xs={1} className="g-3">
            {items.map(item =>(
                    <Col key={item.id}> <CheckoutItem{...item}/> </Col>
                ))}
        </Row>

    </>
}

export default App
