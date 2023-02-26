import React from 'react'
import {Col, Row} from "react-bootstrap";
import items from "../Data/ProductList.json";
import {CheckoutItem} from "./StoreItem";

export default function Items(){
    return(
        <aside className= "block col-2">
            <h2> Products </h2>
            <>
                <Row lg={3} md={2} xs={1} className="g-3">
                    {items.map(item => (
                        <Col key={item.id}> <CheckoutItem{...item}/> </Col>
                    ))}
                </Row>
            </>
        </aside>
    )
}