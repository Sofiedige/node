import React, { useState } from 'react'
import { Col, Row } from "react-bootstrap";
import items from "../Data/ProductList.json";
import { CheckoutItem } from "./StoreItem";


export default function Items() {
    const [searchInput, setSearchInput] = useState("");

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));

    return (
        <aside className= "block col-2">
            <input
                className={"bar"}
                text-align={"center"}
                type="text"
                placeholder={"Search..."}
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
            <h2> Products </h2>
            <>
                <div style={{display: 'flex', justifyContent: 'center'}}>

                </div>
                <Row lg={3} md={2} xs={1} className="g-3">
                    {filteredItems
                        .filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
                        .map(item => (
                            <Col key={item.id}>
                                <CheckoutItem {...item} />
                            </Col>
                        ))}
                </Row>
            </>
        </aside>
    )
}
