import {CartItemModel, useShoppingCart} from "../context/ShoppingCartContext";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

type CartItemProps = {
    id: string;
    quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeItem, incrementItem, decrementItem, storeItems } = useShoppingCart();
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const item = storeItems.find((i: CartItemModel) => i.id === id);
    if (item == null) return null;

    return (
        <div className={`cart-item ${isVisible ? "slide-in" : ""}`}>
            <div className="me-auto">
                <div>
                    <img className = "itemPics"
                         src = {`https://raw.githubusercontent.com/Sofiedige/node/main/public${item.imageUrl}`}
                         alt={item.name} width="50" height="40"
                    />

                    {item.name}{" "}
                    <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        {item.price} kr.
          </span>
                </div>
            </div>
            {item.price * quantity} kr.
            <div>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ gap: ".5rem" }}
                >
                    {quantity > 1 ? (
                        <Button onClick={() => decrementItem(id)} variant="success">
                            -
                        </Button>
                    ) : (
                        <Button variant="secondary">-</Button>
                    )}

                    <div>
                        <span className="fs-3">{quantity}</span> in cart
                    </div>

                    <Button onClick={() => incrementItem(id)} variant="success">
                        +
                    </Button>
                </div>
                <Button onClick={() => removeItem(id)} variant="secondary" size="sm">
                    Remove
                </Button>
            </div>
        </div>
    );
}
