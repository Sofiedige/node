import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import { CheckoutItem } from "./StoreItem";

export interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    imageUrl: string;
}

export default function Items() {
    const [searchInput, setSearchInput] = useState("");
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/Sofiedige/node/main/src/Data/ProductList.json"
                );
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));

    return (
        <aside className="block col-2">
            <input
                className="bar"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
            <h2>Products</h2>
            <Row lg={3} md={2} xs={1} className="g-3" style={{ justifyContent: 'flex-start' }}>
                {filteredItems.map(item => (
                    <Col key={item.id}>
                        <CheckoutItem {...item} />
                    </Col>
                ))}
            </Row>
        </aside>
    );
}
