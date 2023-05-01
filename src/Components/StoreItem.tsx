import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext";
import {Product} from "./Items";
import React from "react";

export function CheckoutItem({id, name, price, imageUrl}: Product) {
    const {getExpensiveItem} = useShoppingCart()
    const {incrementItem} = useShoppingCart()
    return (
        <Card className="product-card">
            <Card.Img className="product-card_image"
                variant="top"
                src={`https://raw.githubusercontent.com/Sofiedige/node/main/public${imageUrl}`}
                height="180px"
                style={{objectFit: "cover"}}
            />

            <Card.Body className={` ${getExpensiveItem(id) ? "expensive_item" : ""}`}>
                    <span className="product-card__name">{name}</span>
                    <span className="product-card__price">{price} kr.</span>

                <Button
                    className="product-card__button"
                    onClick={() => incrementItem(id)}
                    variant="success"
                >
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    );
}

